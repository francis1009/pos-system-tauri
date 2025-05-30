interface Item {
	id: number;
	name: string;
	price: number;
}

interface CartItem extends Item {
	quantity: number;
}

export type { Item, CartItem };
