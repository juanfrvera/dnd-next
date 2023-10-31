import { iItem } from "../home/item/item";

export class ItemService {
    private static _items: Array<iItem>;

    public static async create(data: iItem) {
        if (!this._items) this._items = [data];
        else this._items = [data, ...this._items];

        localStorage.setItem('items', JSON.stringify(this._items));

        return data;
    }

    public static async getList() {
        const localString = localStorage.getItem('items');
        if (localString) this._items = JSON.parse(localString);
        else this._items = [];

        return this._items;
    }
}