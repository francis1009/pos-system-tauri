interface Item {
	id: string;
	barcode: string;
	name: string;
	price: number;
}

interface CartItem extends Item {
	quantity: number;
}

export type { Item, CartItem };
