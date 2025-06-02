interface BaseItem {
	name: string;
	barcode: string;
	price: number;
}

interface Item extends BaseItem {
	id: number;
}

interface CartItem extends Item {
	quantity: number;
}

export type { Item, CartItem, BaseItem };
