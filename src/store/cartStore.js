import { create } from 'zustand'

const useCartStore = create((set, get) => ({
  items: [],
  isOpen: false,

  toggleCart: () => set(s => ({ isOpen: !s.isOpen })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  addItem: (product) => {
    const items = get().items
    const existing = items.find(i => i._id === product._id)
    if (existing) {
      set({
        items: items.map(i =>
          i._id === product._id ? { ...i, qty: i.qty + 1 } : i
        ),
      })
    } else {
      set({ items: [...items, { ...product, qty: 1 }] })
    }
  },

  removeItem: (id) => set(s => ({ items: s.items.filter(i => i._id !== id) })),

  updateQty: (id, qty) => {
    if (qty <= 0) {
      set(s => ({ items: s.items.filter(i => i._id !== id) }))
    } else {
      set(s => ({
        items: s.items.map(i => (i._id === id ? { ...i, qty } : i)),
      }))
    }
  },

  clearCart: () => set({ items: [], isOpen: false }),

  get total() {
    return get().items.reduce((sum, i) => sum + i.price * i.qty, 0)
  },

  getTotal: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
  getCount: () => get().items.reduce((sum, i) => sum + i.qty, 0),
}))

export default useCartStore
