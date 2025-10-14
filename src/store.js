import { create } from 'zustand'

const sampleItems = [
  { id: 'b1', name: 'Wagyu A5 Striploin 200g', price: 1290, category: 'Beef', stock: 8, img: '🥩' },
  { id: 'b2', name: 'Ribeye Premium 250g', price: 899, category: 'Beef', stock: 12, img: '🥩' },
  { id: 'p1', name: 'Pork Belly 200g', price: 169, category: 'Pork', stock: 24, img: '🥓' },
  { id: 'd1', name: 'Signature Cocktail', price: 199, category: 'Drink', stock: 40, img: '🍸' },
  { id: 's1', name: 'Cheesecake Slice', price: 129, category: 'Dessert', stock: 16, img: '🍰' },
]

const genOrderNo = () => {
  const n = Math.floor(100000 + Math.random() * 900000).toString()
  return `ORD-${n}`
}

const TH_STATUS = {
  queued: 'กำลังรอคิว',
  preparing: 'กำลังทำ',
  done: 'สำเร็จ',
  cancelled: 'ยกเลิก',
}

export const usePOSStore = create((set, get) => ({
  // Product & Cart
  items: sampleItems,
  filter: 'All',
  cart: [],
  ordersToday: 0,
  revenueToday: 0,

  // === NEW: Order list of today ===
  orders: [], // { id, orderNo, zone, table, method, items[], total, status, createdAt, updatedAt }

  // Sales History for charts
  salesHistory: [
    { day: 'Mon', sales: 4200 },
    { day: 'Tue', sales: 5800 },
    { day: 'Wed', sales: 3900 },
    { day: 'Thu', sales: 6500 },
    { day: 'Fri', sales: 7200 },
    { day: 'Sat', sales: 9100 },
    { day: 'Sun', sales: 8400 },
  ],

  // Store Information
  storeInfo: {
    name: 'OXYFINE Meat & More',
    address: '975 อำเภอเมืองขอนแก่น ขอนแก่น 40000',
    phone: '085-853-2006',
    email: 'info@oxyfine.com',
    taxId: '0123456789012'
  },

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
      { name: 'Silver', percent: 10 },
      { name: 'Gold', percent: 15 },
      { name: 'Platinum', percent: 20 },
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

  /**
   * ✅ NEW: ยืนยันการชำระเงิน + สร้างออเดอร์เข้าสู่บอร์ดสถานะ
   * params: { method, zone, table }
   */
  confirmPayment: ({ method = 'cash', zone = '-', table = '-' } = {}) => {
    const cartSnapshot = JSON.parse(JSON.stringify(get().cart))
    const total = cartSnapshot.reduce((s, c) => s + c.price * c.qty, 0)

    // อัปเดตสต็อก
    const items = get().items.map(i => {
      const inCart = cartSnapshot.find(c => c.id === i.id)
      if (!inCart) return i
      return { ...i, stock: Math.max(0, i.stock - inCart.qty) }
    })

    const nowIso = new Date().toISOString()
    const order = {
      id: crypto.randomUUID(),
      orderNo: genOrderNo(),
      zone,
      table,
      method,
      items: cartSnapshot, // [{id,name,price,qty,...}]
      total,
      status: 'queued', // เริ่มต้น = รอคิว
      createdAt: nowIso,
      updatedAt: nowIso,
    }

    set({
      items,
      cart: [],
      revenueToday: get().revenueToday + total,
      ordersToday: get().ordersToday + 1,
      orders: [order, ...get().orders] // push ด้านหน้าเพื่อให้รายการใหม่อยู่บนสุด
    })

    return order
  },

  // === NEW: เปลี่ยนสถานะออเดอร์ (queued|preparing|done|cancelled)
  updateOrderStatus: (orderId, nextStatus) => {
    const valid = ['queued', 'preparing', 'done', 'cancelled']
    if (!valid.includes(nextStatus)) return
    set({
      orders: get().orders.map(o =>
        o.id === orderId ? { ...o, status: nextStatus, updatedAt: new Date().toISOString() } : o
      )
    })
  },

  // === Store Info Actions ===
  updateStoreInfo: (info) => set({ storeInfo: info }),

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
