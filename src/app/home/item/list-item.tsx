'use client';
import { useState } from 'react';

export default function Item(props: { item: iItem; onChange: (item: iItem) => unknown }) {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);

    function titleClicked() {
        setExpanded(e => !e);
    }

    let body;
    if (expanded) {
        body = <div className='list-item__body'>
            <div className='list-item__description'>
                {props.item.description}
            </div>
            <button className='button'>Edit</button>
        </div>;
    }

    return (
        <div className='list-item'>
            <div onClick={titleClicked} className='list-item__title clickable-text'>{props.item.title}</div>
            {body}
        </div>
    )
}

export interface iItem {
    id: string; title: string; description: string; tags?: string[];
}