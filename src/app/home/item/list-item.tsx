'use client';
import { DragEvent } from 'react';

export default function ListItem(props: {
    item: iItem;
    onClick: (item: iItem) => unknown, onDragEnd: (item: iItem, e: DragEvent) => unknown
}) {
    function bodyClicked() {
        props.onClick(props.item);
    }
    function dragEnded(e: DragEvent<HTMLDivElement>) {
        props.onDragEnd(props.item, e);
    }

    let body;

    return (
        <div onClick={bodyClicked} className='list-item' draggable="true" onDragEnd={dragEnded}>
            <div className='list-item__header clickable-text'>{props.item.title}</div>
            <div className='list-item__body'>{body}</div>
        </div>
    )
}

export interface iItem {
    id: string; title: string; description: string; tags?: string[];
}