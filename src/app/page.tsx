'use client';
import { useEffect, useState } from "react";
import Item, { iItem } from "./home/item/item";
import { ItemService } from "./service/item.service";
import ListItem from "./home/item/list-item";

export default function Home() {
  const [createdItem, setCreatedItem] = useState<iItem | null>(null);
  const [items, setItems] = useState<Array<iItem>>();

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

  const renderedItems = items ? items.map(i => <li key={i.id}><ListItem item={i} onChange={listItemChanged}></ListItem></li>) : null;

  return (
    <main className='home'>
      <div className="home__body">
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
    </main>
  )
}
