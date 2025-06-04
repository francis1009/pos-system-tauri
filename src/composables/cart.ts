import type { CartItem, Item } from "@/types/item";
import { readonly, ref } from "vue";

const cart = ref<Map<number, CartItem>>(new Map());
const previousCart = ref<Map<number, CartItem>>(new Map());
const prevTransactionId = ref<number | null>(null);
const total = ref(0);
const isScanning = ref(true);
const selectedItemId = ref<number | null>(null);

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
			id: Date.now(),
			name: "OPEN ITEM",
			barcode: "",
			price: 0,
			quantity: 1,
		};
		addToCart(openItem);
		selectItem(openItem.id);
	}

	function updateItemQuantity(itemId: number, quantity: number) {
		const existingItem = cart.value.get(itemId);
		if (existingItem) {
			existingItem.quantity = quantity;
		}
		calculateTotal();
	}

	function removeFromCart(itemId: number) {
		cart.value.delete(itemId);
		calculateTotal();
		if (selectedItemId.value === itemId) selectedItemId.value = null;
	}

	function storePreviousCart(transactionId: number) {
		previousCart.value = new Map(cart.value);
		prevTransactionId.value = transactionId;
	}

	function clearCart() {
		cart.value.clear();
		total.value = 0;
		selectedItemId.value = null;
	}

	function calculateTotal() {
		const cartItems = Array.from(cart.value.values());
		total.value = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
	}

	function selectItem(itemId: number) {
		selectedItemId.value = selectedItemId.value === itemId ? null : itemId;
	}

	function editItemInCart(item: Item) {
		const existingItem = cart.value.get(item.id);
		if (existingItem) {
			const quantity = existingItem.quantity;
			const updateItem: CartItem = { ...item, quantity };
			cart.value.set(item.id, updateItem);
			calculateTotal();
		}
	}

	function getSelectedItem() {
		if (!selectedItemId.value) return;
		return cart.value.get(selectedItemId.value);
	}

	function updateItemNameOrPrice(itemName: string, itemPrice: number) {
		if (!selectedItemId.value) return;
		const existingItem = cart.value.get(selectedItemId.value);
		if (existingItem) {
			existingItem.name = itemName;
			existingItem.price = itemPrice;
		}
		calculateTotal();
	}

	return {
		cart: readonly(cart),
		previousCart: readonly(previousCart),
		prevTransactionId: readonly(prevTransactionId),
		total: readonly(total),
		isScanning,
		selectedItemId,
		addToCart,
		addOpenItemToCart,
		removeFromCart,
		clearCart,
		updateItemQuantity,
		updateItemNameOrPrice,
		selectItem,
		editItemInCart,
		getSelectedItem,
		storePreviousCart,
	};
}

export { useCart };
