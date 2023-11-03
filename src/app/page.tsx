'use client';
import { DragEvent, useEffect, useState } from "react";
import Item, { iItem, iSvgItem } from "./home/item/item";
import { ItemService } from "./service/item.service";
import ListItem from "./home/item/list-item";

export default function Home() {
  const [createdItem, setCreatedItem] = useState<iItem | null>(null);
  const [items, setItems] = useState<Array<iItem>>();
  const [svgItems, setSvgItems] = useState<Array<iSvgItem>>([]);

  useEffect(() => {
    ItemService.getList().then(setItems);
  }, []);

  function createdItemChanged(item: iItem) {
    setCreatedItem(item);
  }

  function getNewCreatedItem() {
    return { id: crypto.randomUUID(), title: '', description: '' };
  }

  function createClicked() {
    setCreatedItem(getNewCreatedItem());
  }

  async function saveClicked() {
    if (createdItem!.title || createdItem!.description) {
      const storedItem = await ItemService.create(createdItem!);
      setItems(array => {
        if (array) return [storedItem, ...array];
        return [storedItem];
      });
    }
    setCreatedItem(null);
  }

  function listItemChanged(item: iItem) {
    setItems(array => {
      const index = array!.findIndex(i => i.id === item.id);
      const finalArray = [...array!];
      finalArray[index] = item;
      return finalArray;
    })
  }

  function dragEndedOnListItem(item: iItem, e: DragEvent) {
    const svg = document.getElementById("svg");
    const svgRect = svg!.getBoundingClientRect();

    // Y starts at 0 at the top and ends on windowHeight at the bottom
    if (e.clientY >= svgRect.top && e.clientY <= svgRect.bottom && e.clientX >= svgRect.left && e.clientX <= svgRect.right) {
      addItemToSvg(item, e.clientX - svgRect.left, e.clientY - svgRect.top);
    }
  }

  function addItemToSvg(item: iItem, x: number, y: number) {
    const svgItem: iSvgItem = { item, position: { x, y } };
    setSvgItems(arr => [svgItem, ...arr]);
  }

  const renderedItems = items ?
    items.map(i => <li key={i.id}><ListItem item={i} onChange={listItemChanged} onDragEnd={dragEndedOnListItem}></ListItem></li>) : null;

  const renderedSvgItems = svgItems.map(s =>
    <g key={s.item.id} x={s.position.x} y={s.position.y} className="svg__item">
      <rect x={s.position.x} y={s.position.y} width={100} height={50} className="svg__item-rect">
      </rect>
      <text x={s.position.x + 50} y={s.position.y + 30} textAnchor="middle" className="svg__text">{s.item.title}</text>
    </g>);

  return (
    <main className='home'>
      <div className="home__body">
        <div className="home__list">
          {createdItem &&
            <div className="item-creator">
              <Item item={createdItem} onChange={createdItemChanged}></Item>
              <button onClick={saveClicked} className="item-creator__save-button button">Ok</button>
            </div>
          }

          {!createdItem && <button onClick={createClicked} className="button list-item home__create-button">Create</button>}

          {/* list */}
          {renderedItems && renderedItems.length > 0 && <ul className="list">{renderedItems}</ul>}

          {/* Loading list */}
          {!renderedItems && <p>Loading...</p>}

          {/* Empty State */}
          {renderedItems && !renderedItems.length && <p>Empty State</p>}
        </div>

        <svg id="svg" className="svg" width="100%" height="100%">{renderedSvgItems}</svg>
      </div>
    </main>
  )
}
