import { create } from 'zustand'

const sampleItems = [
  { id: 'b1', name: 'Wagyu A5 Striploin 200g', price: 1290, category: 'Beef', stock: 8, img: '🥩' },
  { id: 'b2', name: 'Ribeye Premium 250g', price: 899, category: 'Beef', stock: 12, img: '🥩' },
  { id: 'p1', name: 'Pork Belly 200g', price: 169, category: 'Pork', stock: 24, img: '🥓' },
  { id: 'd1', name: 'Signature Cocktail', price: 199, category: 'Drink', stock: 40, img: '🍸' },
  { id: 's1', name: 'Cheesecake Slice', price: 129, category: 'Dessert', stock: 16, img: '🍰' },
]

export const usePOSStore = create((set, get) => ({
  // Product & Cart
  items: sampleItems,
  filter: 'All',
  cart: [],
  ordersToday: 0,
  revenueToday: 0,

  // Store Information
  storeInfo: {
    name: 'OXYFINE Meat & More',
    address: '123 kku, Khonkaen 40000',
    phone: '02-123-4567',
    email: 'info@oxyfine.com',
    taxId: '0123456789012'
  },

  // Users Management
  users: [
    { id: 'u1', name: 'John Manager', role: 'Manager', pin: '1234', active: true },
    { id: 'u2', name: 'Sarah Cashier', role: 'Cashier', pin: '5678', active: true },
    { id: 'u3', name: 'Mike Admin', role: 'Admin', pin: '9999', active: false },
  ],

  // Categories
  categories: [
    { id: 'c1', name: 'Beef', itemCount: 2 },
    { id: 'c2', name: 'Pork', itemCount: 1 },
    { id: 'c3', name: 'Drink', itemCount: 1 },
    { id: 'c4', name: 'Dessert', itemCount: 1 },
  ],

  // Tax Settings
  taxSettings: {
    vatEnabled: true,
    vatRate: 7,
    serviceChargeEnabled: false,
    serviceChargeRate: 10,
    quickDiscounts: [
      { name: 'Member 10%', percent: 10 },
      { name: 'Senior 15%', percent: 15 },
      { name: 'Staff 20%', percent: 20 },
    ]
  },

  // Receipt Settings
  receiptSettings: {
    headerText: 'Welcome to OXYFINE\nPremium Meat & More',
    footerText: 'Thank you for your business!\nPlease come again',
    showLogo: true,
    showQRCode: true,
  },

  // === Product & Cart Actions ===
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
  },

  // === Store Info Actions ===
  updateStoreInfo: (info) => set({ storeInfo: info }),

  // === Users Actions ===
  addUser: (user) => {
    set({ users: [...get().users, { ...user, id: crypto.randomUUID() }] })
  },

  removeUser: (id) => {
    set({ users: get().users.filter(u => u.id !== id) })
  },

  updateUser: (id, updates) => {
    set({
      users: get().users.map(u => u.id === id ? { ...u, ...updates } : u)
    })
  },

  // === Categories Actions ===
  addCategory: (name) => {
    set({
      categories: [...get().categories, { id: crypto.randomUUID(), name, itemCount: 0 }]
    })
  },

  removeCategory: (id) => {
    set({ categories: get().categories.filter(c => c.id !== id) })
  },

  updateCategory: (id, name) => {
    set({
      categories: get().categories.map(c => c.id === id ? { ...c, name } : c)
    })
  },

  // === Tax Settings Actions ===
  updateTaxSettings: (settings) => set({ taxSettings: settings }),

  // === Receipt Settings Actions ===
  updateReceiptSettings: (settings) => set({ receiptSettings: settings }),
}))