'use client';
import { ChangeEvent } from 'react';

export default function Item(props: { id: string; title?: string; description?: string; onChange: (item: iItem) => unknown }) {
    let title = props.title ?? '';
    let description = props.description ?? '';

    function titleChange(e: ChangeEvent<HTMLInputElement>) {
        title = e.currentTarget.value;
        props.onChange({ id: props.id, title, description });
    }
    function descriptionChange(e: ChangeEvent<HTMLTextAreaElement>) {
        description = e.currentTarget.value;
        props.onChange({ id: props.id, title, description });
    }

    return (
        <div className='item'>
            <input onChange={titleChange} className='item__title input' placeholder='Title' type='text' value={title}></input>
            <textarea onChange={descriptionChange} value={description} className='item__description input' placeholder='Description'></textarea>
        </div>
    )
}

export interface iItem {
    id: string; title: string; description: string;
}