import { ChangeEvent } from "react";
import { iItem } from "./item/item";

export default function InfoPanel(props: { item: iItem, onChange: (item: iItem) => unknown, onClose: () => unknown }) {

    function titleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        props.onChange(props.item);
    }
    function descriptionChange(e: ChangeEvent<HTMLTextAreaElement>) {
        props.onChange(props.item);
    }
    function tagsChange(e: ChangeEvent<HTMLTextAreaElement>) {
        props.onChange(props.item);
    }

    if (!props.item) return <></>
    return <div className="info-panel">
        <div className="info-panel__header">
            <textarea onChange={titleChange} className="info-panel__title textarea-label" >{props.item.title}</textarea>
            <button onClick={props.onClose} className="info-panel__close">X</button>
        </div>
        <div className="info-panel__description">{props.item.description}</div>
    </div>
}