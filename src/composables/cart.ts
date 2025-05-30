import type { CartItem, Item } from "@/types/item";
import { readonly, ref } from "vue";

const cart = ref<Map<string, CartItem>>(new Map());
const total = ref(0);
const isScanning = ref(true);

function useCart() {
	function addToCart(item: Item) {
		const existingItem = cart.value.get(item.id);
		if (existingItem) {
			existingItem.quantity++;
		} else {
			const newItem: CartItem = { ...item, quantity: 1 };
			cart.value.set(item.id, newItem);
		}
		calculateTotal();
	}

	function updateItemQuantity(itemId: string, quantity: number) {
		const existingItem = cart.value.get(itemId);
		if (existingItem) {
			existingItem.quantity = quantity;
		}
	}

	function removeFromCart(itemId: string) {
		cart.value.delete(itemId);
		calculateTotal();
	}

	function calculateTotal() {
		const cartItems = Array.from(cart.value.values());
		total.value = cartItems.reduce((sum, item) => sum + item.price, 0);
	}

	return {
		cart: readonly(cart),
		total: readonly(total),
		isScanning,
		addToCart,
		removeFromCart,
		updateItemQuantity,
	};
}

export { useCart };
