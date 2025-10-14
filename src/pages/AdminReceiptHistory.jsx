import React, { useState } from "react";
import {
  Search,
  FileText,
  Printer,
  CreditCard,
  Wallet,
  QrCode,
  X,
  TicketPercent,
} from "lucide-react";

export default function AdminReceiptHistory() {
  const [search, setSearch] = useState("");
  const [filterMethod, setFilterMethod] = useState("ทั้งหมด");
  const [showModal, setShowModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const [receipts] = useState([
    {
      id: "RC1001",
      orderId: "ORD1001",
      customer: "สมชาย",
      zone: "บาร์",
      table: "3",
      total: 480,
      method: "เงินสด",
      date: "12 ต.ค. 2568 18:45",
      coupon: null, // ❌ ไม่มีคูปอง
      items: [
        { name: "เบียร์ลีโอ", qty: 2, price: 80 },
        { name: "มันฝรั่งทอด", qty: 1, price: 120 },
        { name: "น้ำแข็ง", qty: 1, price: 50 },
      ],
    },
    {
      id: "RC1002",
      orderId: "ORD1002",
      customer: "จิต",
      zone: "ลานแคมป์ปิ้ง",
      table: "2",
      total: 920,
      method: "QR Code",
      date: "12 ต.ค. 2568 19:15",
      coupon: { code: "OXY12478", discountPercent: 10 },
      items: [
        { name: "หมูกระทะ", qty: 2, price: 350 },
        { name: "โค้กขวด", qty: 2, price: 80 },
        { name: "น้ำแข็ง", qty: 1, price: 60 },
      ],
    },
    {
      id: "RC1003",
      orderId: "ORD1003",
      customer: "อรุณ",
      zone: "ร้านอาหาร",
      table: "16",
      total: 1250,
      method: "บัตรเครดิต",
      date: "13 ต.ค. 2568 20:00",
      coupon: { code: "NEW50", discountAmount: 50 },
      items: [
        { name: "ปลากระพงทอดน้ำปลา", qty: 1, price: 450 },
        { name: "ต้มยำรวมมิตร", qty: 1, price: 300 },
        { name: "ข้าวสวย", qty: 2, price: 50 },
        { name: "ชาเย็น", qty: 2, price: 100 },
      ],
    },
  ]);

  const filtered = receipts.filter((r) => {
    const text = search.toLowerCase();
    const matchSearch =
      r.id.toLowerCase().includes(text) ||
      r.customer.toLowerCase().includes(text) ||
      r.zone.toLowerCase().includes(text) ||
      r.table.toLowerCase().includes(text) ||
      r.orderId.toLowerCase().includes(text);
    const matchMethod =
      filterMethod === "ทั้งหมด" ? true : r.method === filterMethod;
    return matchSearch && matchMethod;
  });

  const getPaymentIcon = (method) => {
    switch (method) {
      case "เงินสด":
        return <Wallet className="inline mr-1 text-green-600" size={16} />;
      case "QR Code":
        return <QrCode className="inline mr-1 text-blue-600" size={16} />;
      case "บัตรเครดิต":
        return <CreditCard className="inline mr-1 text-purple-600" size={16} />;
      default:
        return <FileText className="inline mr-1 text-gray-600" size={16} />;
    }
  };

  const openReceipt = (r) => {
    setSelectedReceipt(r);
    setShowModal(true);
  };

  // ✅ ฟังก์ชันคำนวณส่วนลดคูปอง
  const getDiscountValue = (receipt) => {
    const { coupon, total } = receipt;
    if (!coupon) return 0;
    if (coupon.discountPercent) return (total * coupon.discountPercent) / 100;
    if (coupon.discountAmount) return coupon.discountAmount;
    return 0;
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <FileText size={30} className="text-amber-500" />
        ประวัติใบเสร็จ
      </h1>

      {/* 🔍 Search + Filter */}
      <div className="card p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2 flex items-center gap-2">
          <Search size={18} className="text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหาใบเสร็จ / ชื่อลูกค้า / โซน / โต๊ะ"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <select
            value={filterMethod}
            onChange={(e) => setFilterMethod(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {["ทั้งหมด", "เงินสด", "QR Code", "บัตรเครดิต"].map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-3 text-right text-sm text-slate-500">
          พบทั้งหมด {filtered.length} รายการ
        </div>
      </div>

      {/* 📄 ตารางข้อมูล */}
      <div className="card p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left p-3">Receipt ID</th>
                <th className="text-left p-3">Order ID</th>
                <th className="text-left p-3">ลูกค้า</th>
                <th className="text-left p-3">โซน / โต๊ะ</th>
                <th className="text-left p-3">ยอดรวม</th>
                <th className="text-left p-3">วิธีชำระเงิน</th>
                <th className="text-left p-3">วันที่</th>
                <th className="text-right p-3">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-400">
                    ไม่พบข้อมูลที่ค้นหา
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b hover:bg-slate-50 cursor-pointer"
                    onClick={() => openReceipt(r)}
                  >
                    <td className="p-3 font-mono text-slate-700">{r.id}</td>
                    <td className="p-3 font-mono text-slate-700">{r.orderId}</td>
                    <td className="p-3">{r.customer}</td>
                    <td className="p-3">
                      {r.zone} / <span className="font-semibold">{r.table}</span>
                    </td>
                    <td className="p-3 font-semibold text-amber-700">
                        ฿
                        {(
                            r.total -
                            (r.coupon ? getDiscountValue(r) : 0)
                        ).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>

                    <td className="p-3">
                      {getPaymentIcon(r.method)}
                      {r.method}
                    </td>
                    <td className="p-3 whitespace-nowrap">{r.date}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openReceipt(r);
                        }}
                        className="btn text-xs px-3 border border-slate-300 hover:bg-slate-100 text-slate-700 flex items-center gap-1 ml-auto"
                      >
                        ดูใบเสร็จ
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🧾 Receipt Modal */}
      {showModal && selectedReceipt && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 relative text-[15px]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              <X size={22} />
            </button>

            {/* Header */}
            <div className="text-center border-b pb-4 mb-4">
              <h2 className="font-bold text-2xl text-slate-800">OXYFINE POS </h2>
              <p className="text-sm text-gray-600 leading-tight">
                123 ถนนมิตรภาพ ขอนแก่น <br /> โทร. 081-234-5678
              </p>
            </div>

            {/* Info */}
            <div className="text-gray-700 mb-4">
              <p>ใบเสร็จเลขที่: <span className="font-semibold">{selectedReceipt.id}</span></p>
              <p>คำสั่งซื้อ: <span className="font-semibold">{selectedReceipt.orderId}</span></p>
              <p>ลูกค้า: <span className="font-semibold">{selectedReceipt.customer}</span></p>
              <p>โซน: {selectedReceipt.zone} / โต๊ะ {selectedReceipt.table}</p>
              <p>วันที่: {selectedReceipt.date}</p>
            </div>

            {/* Items */}
            <table className="w-full text-sm mb-4">
              <thead className="border-b text-gray-600">
                <tr>
                  <th className="text-left">รายการ</th>
                  <th>จำนวน</th>
                  <th className="text-right">ราคา</th>
                </tr>
              </thead>
              <tbody>
                {selectedReceipt.items.map((item, i) => (
                  <tr key={i}>
                    <td className="py-1">{item.name}</td>
                    <td className="text-center">{item.qty}</td>
                    <td className="text-right">
                      ฿{(item.price * item.qty).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total Section */}
            <div className="border-t pt-3 text-[15px]">
              <div className="flex justify-between">
                <span>ยอดรวม</span>
                <span>฿{selectedReceipt.total.toLocaleString()}</span>
              </div>

              {/* ✅ ถ้ามีคูปอง */}
              {selectedReceipt.coupon && (
                <div className="flex justify-between text-green-700 font-medium mt-1">
                  <span className="flex items-center gap-1">
                    <TicketPercent size={16} /> คูปอง {selectedReceipt.coupon.code}
                  </span>
                  <span>
                    −฿{getDiscountValue(selectedReceipt).toLocaleString()}
                  </span>
                </div>
              )}

              {/* Final Total */}
              <div className="flex justify-between font-bold text-slate-800 border-t pt-3 mt-2 text-lg">
                <span>ยอดสุทธิ</span>
                <span>
                  ฿
                  {(
                    selectedReceipt.total -
                    getDiscountValue(selectedReceipt)
                  ).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="mt-2 text-sm text-gray-600 flex justify-between">
                <span>วิธีชำระเงิน</span>
                <span className="font-semibold">{selectedReceipt.method}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
