import { create } from 'zustand'

const sampleItems = [
  { id: 'b1', name: 'Wagyu A5 Striploin 200g', price: 1290, category: 'Beef', stock: 8, img: '🥩' },
  { id: 'b2', name: 'Ribeye Premium 250g', price: 899, category: 'Beef', stock: 12, img: '🥩' },
  { id: 'p1', name: 'Pork Belly 200g', price: 169, category: 'Pork', stock: 24, img: '🥓' },
  { id: 'd1', name: 'Signature Cocktail', price: 199, category: 'Drink', stock: 40, img: '🍸' },
  { id: 's1', name: 'Cheesecake Slice', price: 129, category: 'Dessert', stock: 16, img: '🍰' },
]

export const usePOSStore = create((set, get) => ({
  items: sampleItems,
  filter: 'All',
  cart: [],
  ordersToday: 0,
  revenueToday: 0,

  setFilter: (f) => set({ filter: f }),

  addToCart: (item) => {
    const cart = [...get().cart]
    const idx = cart.findIndex((c) => c.id === item.id)
    if (idx >= 0) cart[idx].qty += 1
    else cart.push({ ...item, qty: 1 })
    set({ cart })
  },

  removeFromCart: (id) => set({ cart: get().cart.filter(c => c.id !== id) }),

  changeQty: (id, qty) => {
    const cart = get().cart.map(c => c.id === id ? { ...c, qty: Math.max(1, qty) } : c)
    set({ cart })
  },

  clearCart: () => set({ cart: [] }),

  confirmPayment: (method='cash') => {
    const total = get().cart.reduce((s, c) => s + c.price * c.qty, 0)
    // reduce stock
    const items = get().items.map(i => {
      const inCart = get().cart.find(c => c.id === i.id)
      if (!inCart) return i
      return { ...i, stock: Math.max(0, i.stock - inCart.qty) }
    })
    set({
      items,
      cart: [],
      revenueToday: get().revenueToday + total,
      ordersToday: get().ordersToday + 1
    })
    return { total, method, time: new Date().toISOString() }
  },

  updateStock: (id, newQty) => {
    set({
      items: get().items.map(i => i.id === id ? { ...i, stock: Math.max(0, parseInt(newQty)||0) } : i)
    })
  },

  addProduct: (prod) => {
    set({ items: [...get().items, { ...prod, id: crypto.randomUUID() }] })
  }
}))
