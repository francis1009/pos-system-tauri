interface Item {
	id: string;
	barcode: string;
	name: string;
	price: number;
}

interface CartItem extends Item {
	quantity: number;
}

interface CreateItem {
	name: string;
	barcode: string;
	price: number;
}

export type { Item, CartItem, CreateItem };
