'use client';
import { ChangeEvent } from 'react';

export default function Item(props: { item: iItem; onChange: (item: iItem) => unknown }) {
    let title = props.item?.title ?? '';
    let description = props.item?.description ?? '';
    let tags = props.item?.tags ? props.item.tags.join(', ') : '';

    function titleChange(e: ChangeEvent<HTMLInputElement>) {
        title = e.currentTarget.value;
        props.onChange({ id: props.item.id, title, description, tags: tags.split(', ') });
    }
    function descriptionChange(e: ChangeEvent<HTMLTextAreaElement>) {
        description = e.currentTarget.value;
        props.onChange({ id: props.item.id, title, description });
    }
    function tagsChange(e: ChangeEvent<HTMLInputElement>) {
        tags = e.currentTarget.value;
        props.onChange({ id: props.item.id, title, description, tags: tags.split(', ') });
    }

    return (
        <div className='item'>
            <input onChange={titleChange} className='item__title input' placeholder='Title' type='text' value={title}></input>
            <textarea onChange={descriptionChange} value={description} className='item__description input' placeholder='Description'></textarea>
            <input onChange={tagsChange} className='item__tags input' placeholder='Tags, separated by comma' type='text' value={tags}></input>
        </div>
    )
}

export interface iItem {
    id: string; title: string; description: string; tags?: string[];
}

export interface iSvgItem {
    item: iItem, position: { x: number; y: number; };
}