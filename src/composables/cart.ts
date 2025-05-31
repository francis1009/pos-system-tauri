import type { CartItem, Item } from "@/types/item";
import { readonly, ref } from "vue";

const cart = ref<Map<string, CartItem>>(new Map());
const total = ref(0);
const isScanning = ref(true);
const selectedItemId = ref<string | null>(null);

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

	function addOpenItemToCart() {
		const openItem: CartItem = {
			id: `open-${Date.now()}`,
			name: "OPEN ITEM",
			price: 0,
			quantity: 1,
		};
		addToCart(openItem);
		selectItem(openItem.id);
	}

	function updateItemQuantity(itemId: string, quantity: number) {
		const existingItem = cart.value.get(itemId);
		if (existingItem) {
			existingItem.quantity = quantity;
		}
		calculateTotal();
	}

	function removeFromCart(itemId: string) {
		cart.value.delete(itemId);
		calculateTotal();
	}

	function clearCart() {
		cart.value.clear();
		total.value = 0;
	}

	function calculateTotal() {
		const cartItems = Array.from(cart.value.values());
		total.value = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
	}

	function selectItem(itemId: string) {
		selectedItemId.value = selectedItemId.value === itemId ? null : itemId;
	}

	return {
		cart: readonly(cart),
		total: readonly(total),
		isScanning,
		selectedItemId,
		addToCart,
		addOpenItemToCart,
		removeFromCart,
		clearCart,
		updateItemQuantity,
		selectItem,
	};
}

export { useCart };
