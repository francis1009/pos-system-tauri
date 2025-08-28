import type { CartItem, Item } from "@/types/item";
import { readonly, ref } from "vue";

const cart = ref<Map<number, CartItem>>(new Map());
const previousCart = ref<Map<number, CartItem>>(new Map());
const prevTransactionId = ref<number | null>(null);
const prevTotal = ref(0);
const total = ref(0);
const selectedItemId = ref<number | null>(null);
const selectedItem = ref<CartItem | undefined>(undefined);

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
		if (selectedItemId.value === itemId) {
			selectedItemId.value = null;
			selectedItem.value = undefined;
		}
	}

	function storePreviousCart(transactionId: number) {
		previousCart.value = new Map(cart.value);
		prevTransactionId.value = transactionId;
		prevTotal.value = total.value;
	}

	function clearCart() {
		cart.value.clear();
		total.value = 0;
		selectedItemId.value = null;
		selectedItem.value = undefined;
	}

	function calculateTotal() {
		const cartItems = Array.from(cart.value.values());
		total.value = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
	}

	function selectItem(itemId: number) {
		selectedItemId.value = selectedItemId.value === itemId ? null : itemId;
		if (selectedItemId.value) selectedItem.value = cart.value.get(selectedItemId.value);
		else selectedItem.value = undefined;
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

	return {
		cart: readonly(cart),
		previousCart: readonly(previousCart),
		prevTransactionId: readonly(prevTransactionId),
		prevTotal: readonly(prevTotal),
		total: readonly(total),
		selectedItemId,
		selectedItem: readonly(selectedItem),
		addToCart,
		addOpenItemToCart,
		removeFromCart,
		clearCart,
		updateItemQuantity,
		selectItem,
		editItemInCart,
		storePreviousCart,
	};
}

export { useCart };
