interface Item {
	id: string;
	name: string;
	price: number;
}

interface CartItem extends Item {
	quantity: number;
}

export type { Item, CartItem };
