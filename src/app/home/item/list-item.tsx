'use client';
import { useState, DragEvent } from 'react';
import Item from './item';

export default function ListItem(props: { item: iItem; onChange: (item: iItem) => unknown, onDragEnd: (item: iItem, e: DragEvent) => unknown }) {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);

    function titleClicked() {
        setExpanded(e => !e);
    }
    function editClicked() {
        setEditing(true);
    }
    function editOkClicked() {
        setEditing(false);
    }
    function dragEnded(e: DragEvent<HTMLDivElement>) {
        props.onDragEnd(props.item, e);
    }

    let body;

    if (expanded) {
        if (!editing) {
            body = <><div className='list-item__description'>
                {props.item.description}
            </div><button onClick={editClicked} className='button list-item__edit'>Edit</button></>
        } else {
            body = <>
                <Item {...props}></Item>
                <button onClick={editOkClicked} className='button list-item__save'>Ok</button>
            </>
        }
    }

    return (
        <div className='list-item' draggable="true" onDragEnd={dragEnded}>
            <div onClick={titleClicked} className='list-item__header clickable-text'>{props.item.title}</div>
            <div className='list-item__body'>{body}</div>
        </div>
    )
}

export interface iItem {
    id: string; title: string; description: string; tags?: string[];
}