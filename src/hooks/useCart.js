import useCartStore from '../store/cartStore'

export default function useCart() {
  const store = useCartStore()
  return {
    items: store.items,
    isOpen: store.isOpen,
    toggleCart: store.toggleCart,
    openCart: store.openCart,
    closeCart: store.closeCart,
    addItem: store.addItem,
    removeItem: store.removeItem,
    updateQty: store.updateQty,
    clearCart: store.clearCart,
    total: store.getTotal(),
    count: store.getCount(),
  }
}
