import React, { useMemo, useState } from "react";
import { usePOSStore } from "../store";
import OrderItemCard from "../components/OrderItemCard";

const StatusBadge = ({ status }) => {
  const map = {
    queued: "bg-yellow-50 text-yellow-700 border-yellow-300",
    preparing: "bg-blue-50 text-blue-700 border-blue-300",
    done: "bg-emerald-50 text-emerald-700 border-emerald-300",
    cancelled: "bg-rose-50 text-rose-700 border-rose-300",
  };
  const label = {
    queued: "กำลังรอคิว",
    preparing: "กำลังทำ",
    done: "สำเร็จ",
    cancelled: "ยกเลิก",
  }[status] || status;
  return (
    <span className={`inline-block text-xs px-2 py-1 rounded-full border ${map[status]}`}>
      {label}
    </span>
  );
};

export default function NewOrder() {
  const {
    items, filter, setFilter, cart,
    addToCart, removeFromCart, changeQty, confirmPayment,
    orders, updateOrderStatus
  } = usePOSStore();

  const [showPay, setShowPay] = useState(false);
  const [showTableSelect, setShowTableSelect] = useState(false);
  const [method, setMethod] = useState("cash");
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);

  // NEW: filter สำหรับบอร์ดออเดอร์
  const [orderFilter, setOrderFilter] = useState("all"); // all|queued|preparing|done|cancelled
  const [search, setSearch] = useState("");

  const categories = ["All", ...Array.from(new Set(items.map((i) => i.category)))];
  const filtered = useMemo(
    () => (filter === "All" ? items : items.filter((i) => i.category === filter)),
    [items, filter]
  );
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);

  // Zones
const zones = {
  "บาร์": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  "ลานแคมป์ปิ้ง": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  "ร้านอาหาร": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
};



  // Coupon state
  const [showCoupon, setShowCoupon] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // ตัวอย่างคูปอง (สมมติจากหน้า Coupon)
const coupons = [
  { id: 1, title: "ลดราคาอาหาร 10%", code: "OXY12478", type: "percent", value: 10 },
  { id: 2, title: "สมาชิกใหม่ส่วนลด 50 บาท", code: "NEW50", type: "amount", value: 50 },
  { id: 3, title: "คูปองสะสมแต้มส่วนลด 20%", code: "LOYALTY20", type: "percent", value: 20 },
];

  // NEW: ออเดอร์ที่ฟิลเตอร์แล้ว
  const ordersFiltered = useMemo(() => {
    return orders
      .filter(o => orderFilter === "all" ? true : o.status === orderFilter)
      .filter(o => {
        if (!search.trim()) return true
        const t = search.trim().toLowerCase()
        return (
          o.orderNo.toLowerCase().includes(t) ||
          (o.zone || '').toLowerCase().includes(t) ||
          (o.table || '').toLowerCase().includes(t) ||
          o.items.some(it => it.name.toLowerCase().includes(t))
        )
      });
  }, [orders, orderFilter, search]);

  // NEW: นับจำนวนแต่ละสถานะไว้โชว์ Badge
  const countBy = (st) => orders.filter(o => o.status === st).length;

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* ----------- Top: Products + Cart ----------- */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left: Products */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🛒 New Order</h2>

          {/* Category Filter */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`btn whitespace-nowrap ${
                  filter === c ? "border-amber-500 text-amber-600 bg-amber-50 font-semibold" : ""
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Items */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
            {filtered.map((item) => (
              <OrderItemCard key={item.id} item={item} onAdd={addToCart} />
            ))}
          </div>
        </div>

       {/* Right: Cart */}
<div className="w-full md:w-96">
  <div className="card p-5 sticky top-[90px]">
    <div className="font-bold text-lg mb-3 text-slate-800">🧾 Current Order</div>

    {/* Selected Table */}
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <span className="text-slate-600 font-medium">Type</span>
        <button
          onClick={() => setShowTableSelect(true)}
          className="btn text-sm px-3 py-1 border border-amber-400 text-amber-600 hover:bg-amber-50"
        >
          {selectedTable
  ? `${selectedZone} - โต๊ะ ${selectedTable}`
  : "Select Table"}

        </button>
      </div>
    </div>

    {/* Cart List */}
    <div className="space-y-2 max-h-[50vh] overflow-auto pr-1">
      {cart.length === 0 && (
        <div className="text-slate-400 text-sm text-center py-8 bg-slate-50 rounded-xl">
          No items yet. Start adding products! 🛍️
        </div>
      )}
      {cart.map((c) => (
        <div
          key={c.id}
          className="flex items-center justify-between gap-2 border-b border-slate-200 pb-3"
        >
          <div className="flex-1">
            <div className="font-medium text-slate-800">{c.name}</div>
            <div className="text-xs text-amber-600 font-semibold">
              ฿{c.price.toLocaleString()} × {c.qty}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => changeQty(c.id, c.qty - 1)}
              className="btn px-2 py-1 text-sm"
              disabled={c.qty <= 1}
            >
              −
            </button>
            <input
              type="number"
              min="1"
              value={c.qty}
              onChange={(e) => changeQty(c.id, parseInt(e.target.value) || 1)}
              className="input w-14 text-center py-1 text-sm"
            />
            <button
              onClick={() => changeQty(c.id, c.qty + 1)}
              className="btn px-2 py-1 text-sm"
            >
              +
            </button>
            <button
              onClick={() => removeFromCart(c.id)}
              className="btn px-2 py-1 text-sm text-red-600 hover:bg-red-50"
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* ✅ Coupon Button & Summary */}
    {cart.length > 0 && (
      <div className="mt-4 pt-4 border-t-2 border-slate-300 space-y-3">
        {/* ปุ่มเลือกคูปอง */}
        <div className="flex justify-between items-center">
          <span className="text-slate-600 font-medium">🎟️ Coupon</span>
          <button
            onClick={() => setShowCoupon(true)}
            className="btn text-sm px-3 py-1 border border-green-400 text-green-700 hover:bg-green-50"
          >
            {selectedCoupon ? selectedCoupon.title : "Select Coupon"}
          </button>
        </div>

        {/* สรุปยอด */}
        <div className="flex items-center justify-between">
          <div className="text-slate-600 font-medium">Total</div>
          <div className="text-amber-600 text-2xl font-bold">
            ฿
            {(
              total -
              (selectedCoupon?.type === "percent"
                ? total * (selectedCoupon.value / 100)
                : selectedCoupon?.type === "amount"
                ? selectedCoupon.value
                : 0)
            ).toLocaleString()}
          </div>
        </div>

        <button
          onClick={() => {
            if (!selectedTable)
              return alert("⚠️ กรุณาเลือกโซนและโต๊ะก่อนทำรายการชำระเงิน");
            setShowPay(true);
          }}
          className="btn-primary w-full text-lg py-3"
        >
          💳 Confirm Payment
        </button>
      </div>
    )}
  </div>
</div>
{/* ----------- Modal: Select Coupon ----------- */}
{showCoupon && (
  <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div className="bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 rounded-2xl p-6 w-full max-w-md shadow-2xl">
      <div className="font-bold text-2xl mb-4 text-amber-800 text-center">
        🎟️ เลือกคูปองส่วนลด
      </div>

      <div className="space-y-3 mb-6 max-h-[55vh] overflow-y-auto px-1">
        {coupons.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setSelectedCoupon(c);
              setShowCoupon(false);
            }}
            className={`w-full text-left border-2 rounded-xl p-4 transition-all duration-200 ${
              selectedCoupon?.id === c.id
                ? "border-amber-500 bg-amber-100 shadow-md"
                : "border-amber-200 bg-white hover:bg-amber-50 hover:shadow-sm"
            }`}
          >
            <div className="font-semibold text-slate-800 text-lg">{c.title}</div>
            <div className="text-sm text-slate-500 mt-1">
              รหัสคูปอง: <span className="font-mono text-slate-700">{c.code}</span>
            </div>
            {c.type === "percent" && (
              <div className="text-amber-700 text-sm font-semibold mt-2">
                🔸 ลด {c.value}% จากยอดทั้งหมด
              </div>
            )}
            {c.type === "amount" && (
              <div className="text-amber-700 text-sm font-semibold mt-2">
                🔸 ลด {c.value} บาท จากยอดทั้งหมด
              </div>
            )}
            {c.type === "free" && (
              <div className="text-amber-700 text-sm font-semibold mt-2">
                🔸 🎂 ของหวานฟรี 1 รายการ
              </div>
            )}
          </button>
        ))}
      </div>

      <button
        className="btn w-full border border-amber-400 text-amber-700 hover:bg-amber-50"
        onClick={() => setShowCoupon(false)}
      >
        ❌ ปิดหน้าต่าง
      </button>
    </div>
  </div>
)}
      </div>

      {/* ----------- NEW: Orders Board (Today) ----------- */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <h3 className="text-xl font-bold text-slate-800">📋 Orders Today</h3>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex gap-2 overflow-x-auto">
              {[
                { id: "all", label: "ทั้งหมด" },
                { id: "queued", label: `รอคิว (${countBy('queued')})` },
                { id: "preparing", label: `กำลังทำ (${countBy('preparing')})` },
                { id: "done", label: `สำเร็จ (${countBy('done')})` },
                { id: "cancelled", label: `ยกเลิก (${countBy('cancelled')})` },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setOrderFilter(t.id)}
                  className={`btn text-sm whitespace-nowrap ${orderFilter === t.id ? "border-amber-500 bg-amber-50 text-amber-600 font-semibold" : ""}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <input
              className="input min-w-[220px]"
              placeholder="ค้นหา: เลขออเดอร์ / เมนู / โซน / โต๊ะ"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* List */}
        {ordersFiltered.length === 0 ? (
          <div className="text-slate-400 text-sm text-center py-10 bg-slate-50 rounded-xl">
            ยังไม่มีออเดอร์ตามเงื่อนไข 🗂️
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {ordersFiltered.map(o => (
              <div key={o.id} className="border rounded-2xl p-4 bg-white shadow-sm hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-slate-800">
                    #{o.orderNo}
                  </div>
                  <StatusBadge status={o.status} />
                </div>
                <div className="text-sm text-slate-500 mt-1">
  {o.zone === "เดลิเวอรี่"
    ? "🚚 เดลิเวอรี่"
    : <>โซน: <span className="font-medium text-slate-700">{o.zone}</span> • โต๊ะ: <span className="font-medium text-slate-700">{o.table}</span></>}
</div>

                <div className="text-xs text-slate-400 mt-1">
                  {new Date(o.createdAt).toLocaleString()}
                </div>

                <div className="mt-3 bg-slate-50 rounded-xl p-3 max-h-40 overflow-auto">
                  {o.items.map((it) => (
                    <div key={it.id} className="flex items-center justify-between text-sm py-1">
                      <div className="truncate">
                        <span className="mr-1">{it.img}</span>
                        {it.name}
                      </div>
                      <div className="text-slate-600 font-medium">× {it.qty}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="text-slate-500">รวม</div>
                  <div className="text-amber-600 font-bold text-lg">฿{o.total.toLocaleString()}</div>
                </div>

                {/* Quick Actions: change status */}
                <div className="grid grid-cols-4 gap-2 mt-3">
                  <button
                    className={`btn text-xs ${o.status==='queued' ? 'border-yellow-400 bg-yellow-50 text-yellow-700' : ''}`}
                    onClick={()=>updateOrderStatus(o.id, 'queued')}
                  >
                    รอคิว
                  </button>
                  <button
                    className={`btn text-xs ${o.status==='preparing' ? 'border-blue-400 bg-blue-50 text-blue-700' : ''}`}
                    onClick={()=>updateOrderStatus(o.id, 'preparing')}
                  >
                    กำลังทำ
                  </button>
                  <button
                    className={`btn text-xs ${o.status==='done' ? 'border-emerald-400 bg-emerald-50 text-emerald-700' : ''}`}
                    onClick={()=>updateOrderStatus(o.id, 'done')}
                  >
                    สำเร็จ
                  </button>
                  <button
                    className={`btn text-xs ${o.status==='cancelled' ? 'border-rose-400 bg-rose-50 text-rose-700' : ''}`}
                    onClick={()=>updateOrderStatus(o.id, 'cancelled')}
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

        {/* ----------- Modal: Select Zone & Table ----------- */}
          {/* ----------- Modal: Select Zone & Table ----------- */}
{showTableSelect && (
  <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div className="card p-6 w-full max-w-md shadow-2xl">
      {/* ✅ Step 1: เลือกโซน */}
      {!selectedZone ? (
        <>
          <div className="font-bold text-xl mb-4 text-slate-800 text-center">
            เลือกประเภท
          </div>

          {/* 🔹 ปุ่มโซน (เพิ่มเดลิเวอรี่) */}
         <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
  {[
    { name: "บาร์", icon: "🍹" },
    { name: "ลานแคมป์ปิ้ง", icon: "🏕️" },
    { name: "ร้านอาหาร", icon: "🍽️" },
  ].map((z) => (
    <button
      key={z.name}
      onClick={() => setSelectedZone(z.name)}
      className={`flex flex-col items-center justify-center h-28 w-full rounded-2xl border-2 font-semibold text-lg transition-all duration-200 shadow-sm hover:shadow-md ${
        selectedZone === z.name
          ? "border-amber-500 bg-amber-100 text-amber-700 scale-105 shadow-md"
          : "border-slate-300 text-slate-700 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-300"
      }`}
    >
      <div className="text-3xl mb-1">{z.icon}</div>
      <span className="truncate">{z.name}</span>
    </button>
  ))}
</div>

          <button
            className="btn w-full"
            onClick={() => setShowTableSelect(false)}
          >
            ❌ Close
          </button>
        </>
      ) : (
        <>
          {/* ✅ Step 2: ถ้าเลือก “เดลิเวอรี่” */}
          {selectedZone === "เดลิเวอรี่" ? (
            <div className="text-center">
              <div className="font-bold text-xl mb-4 text-slate-800">
                🚚 ออเดอร์นี้เป็นแบบเดลิเวอรี่
              </div>
              <p className="text-slate-600 mb-6">
                ไม่จำเป็นต้องเลือกโต๊ะ ระบบจะบันทึกเป็นออเดอร์เดลิเวอรี่โดยอัตโนมัติ
              </p>

              <div className="flex gap-3 justify-center">
                <button
                  className="btn flex-1"
                  onClick={() => setSelectedZone(null)}
                >
                  ← Back
                </button>
                <button
                  className="btn-gold flex-1"
                  onClick={() => {
                    setSelectedTable("Delivery");
                    setShowTableSelect(false);
                  }}
                >
                  ✓ Confirm
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* ✅ Step 2: ถ้าเป็นโซนปกติ */}
              <div className="font-bold text-xl mb-4 text-slate-800 text-center">
                เลือกโต๊ะในโซน {selectedZone}
              </div>

              {/* 🔹 โต๊ะเรียงแถวละ 4 โต๊ะ */}
              <div className="grid grid-cols-4 gap-3 mb-6 text-center">
                {zones[selectedZone].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTable(t)}
                    className={`flex items-center justify-center aspect-square rounded-xl border text-base font-medium transition-all duration-200 ${
                      selectedTable === t
                        ? "border-amber-500 bg-amber-100 text-amber-700 shadow-md scale-105"
                        : "border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-amber-300"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  className="btn flex-1"
                  onClick={() => setSelectedZone(null)}
                >
                  ← Cancel
                </button>
                <button
                  className="btn-gold flex-1"
                  onClick={() => setShowTableSelect(false)}
                >
                  ✓ Confirm
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  </div>
)}



      {/* ----------- Modal: Payment ----------- */}
      {showPay && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="card p-6 w-full max-w-md shadow-2xl">
            <div className="font-bold text-xl mb-4 text-slate-800">💳 Payment Method</div>
            <div className="mb-4 p-4 bg-slate-50 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Type</span>
                <span className="font-semibold text-slate-700">
                  {selectedZone || "-"}
                </span>
              </div>
              
  <div className="flex justify-between items-center mt-1">
    <span className="text-slate-600">Table</span>
    <span className="font-semibold text-slate-700">
      {selectedTable || "-"}
    </span>
  </div>


              <div className="flex justify-between items-center mt-2">
                <span className="text-slate-600">Total Amount</span>
                <span className="text-2xl font-bold text-amber-600">
                  ฿{total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Payment Method Buttons */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { id: "cash", label: "Cash", icon: "💵" },
                { id: "qr", label: "QR Code", icon: "📱" },
                { id: "card", label: "Card", icon: "💳" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`btn flex-col py-4 ${
                    method === m.id
                      ? "border-red-500 bg-red-50 text-red-600 font-semibold shadow-md"
                      : ""
                  }`}
                >
                  <div className="text-2xl mb-1">{m.icon}</div>
                  <div className="text-xs">{m.label}</div>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button className="btn flex-1" onClick={() => setShowPay(false)}>
                Cancel
              </button>
              <button
                className="btn-gold flex-1"
                onClick={() => {
                  const order = confirmPayment({
                    method,
                    zone: selectedZone,
                    table: selectedTable,
                  });
                  setShowPay(false);
                  // reset โต๊ะถ้าอยากให้เลือกใหม่ในครั้งถัดไป:
                  // setSelectedZone(null); setSelectedTable(null);
                  alert(
                    `✅ Payment successful!\nOrder: ${order.orderNo}\nZone: ${order.zone}\nTable: ${order.table}\nMethod: ${order.method}\nTotal: ฿${order.total.toLocaleString()}`
                  );
                }}
              >
                ✓ Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
