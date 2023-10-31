'use client';
import { useState } from "react";
import Item, { iItem } from "./home/item/item";

export default function Home() {
  const [createdItem, setCreatedItem] = useState<iItem>(getNewCreatedItem());
  const [items, setItems] = useState<Array<iItem>>();

  function createdItemChanged(item: iItem) {
    setCreatedItem(item);
  }

  function getNewCreatedItem() {
    return { id: crypto.randomUUID(), title: '', description: '' };
  }

  function saveClicked() {
    setItems(array => {
      if (array) return [createdItem, ...array];
      return [createdItem];
    });
    setCreatedItem(getNewCreatedItem());
  }

  function listItemChanged(item: iItem) {
    setItems(array => {
      const index = array!.findIndex(i => i.id === item.id);
      const finalArray = [...array!];
      finalArray[index] = item;
      return finalArray;
    })
  }

  const renderedItems = items ? items.map(i => <li key={i.id}><Item {...i} onChange={listItemChanged}></Item></li>) : null;

  return (
    <main className='home'>
      <div className="item-creator">
        <Item {...createdItem} onChange={createdItemChanged}></Item>
        <button onClick={saveClicked} className="item-creator__save-button button">Save</button>
      </div>

      {renderedItems && renderedItems.length &&
        <ul className="list">{renderedItems}</ul>
      }
    </main>
  )
}
