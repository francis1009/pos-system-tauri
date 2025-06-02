interface Item {
	id: number;
	barcode: string;
	name: string;
	price: number;
}

interface CartItem extends Item {
	quantity: number;
}

interface BaseItem {
	name: string;
	barcode: string;
	price: number;
}

export type { Item, CartItem, BaseItem };
