import React, { useState } from "react";
import { Gift, Save, Calendar, Trash2 } from "lucide-react";

export default function CreateCouponPage() {
  const [form, setForm] = useState({
    title: "",
    code: "",
    type: "percent", // percent | amount
    value: "",
    expiry: "",
    condition: "none", // none | points | spending | birthday
    conditionValue: "",
  });

  // ✅ เก็บรายการคูปองทั้งหมด
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      title: "ส่วนลดสมาชิกใหม่ 10%",
      code: "NEW10",
      type: "percent",
      value: 10,
      expiry: "2025-12-31",
      condition: "none",
    },
    {
      id: 2,
      title: "สะสมแต้มครบ 200 ลด 50 บาท",
      code: "POINT200",
      type: "amount",
      value: 50,
      expiry: "2025-12-31",
      condition: "points",
      conditionValue: 200,
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.code || !form.value) {
      alert("⚠️ กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const newCoupon = {
      ...form,
      id: Date.now(),
    };

    setCoupons((prev) => [...prev, newCoupon]);
    alert(`🎁 สร้างคูปองใหม่สำเร็จ!\n\nชื่อ: ${form.title}\nโค้ด: ${form.code}`);

    setForm({
      title: "",
      code: "",
      type: "percent",
      value: "",
      expiry: "",
      condition: "none",
      conditionValue: "",
    });
  };

  // ✅ ฟังก์ชันลบคูปอง
  const deleteCoupon = (id) => {
    if (window.confirm("❌ ต้องการลบคูปองนี้หรือไม่?")) {
      setCoupons((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white flex flex-col items-center justify-start p-6">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-amber-200 p-8 mb-10">
        <h1 className="text-3xl font-bold text-amber-700 mb-6 flex items-center gap-2 justify-center">
          <Gift size={32} /> สร้างคูปองใหม่
        </h1>

        {/* ฟอร์มสร้างคูปอง */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ชื่อคูปอง */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              ชื่อคูปอง
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="เช่น ส่วนลดสมาชิกใหม่ 10%"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* รหัสคูปอง */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              รหัสคูปอง (Coupon Code)
            </label>
            <input
              type="text"
              name="code"
              value={form.code}
              onChange={handleChange}
              placeholder="เช่น NEW10, POINT200"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* ประเภทคูปอง */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                ประเภทส่วนลด
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400 bg-white"
              >
                <option value="percent">เปอร์เซ็นต์ (%)</option>
                <option value="amount">จำนวนเงิน (บาท)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                มูลค่าส่วนลด
              </label>
              <input
                type="number"
                name="value"
                value={form.value}
                onChange={handleChange}
                placeholder="เช่น 10 หรือ 50"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          {/* วันหมดอายุ */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              วันหมดอายุ
            </label>
            <div className="flex items-center gap-2">
              <Calendar className="text-amber-500" size={18} />
              <input
                type="date"
                name="expiry"
                value={form.expiry}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          {/* เงื่อนไขการได้รับคูปอง */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              เงื่อนไขการได้รับคูปอง
            </label>
            <select
              name="condition"
              value={form.condition}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400 bg-white"
            >
              <option value="none">แจกทั่วไป (ทุกคนได้รับ)</option>
              <option value="points">เมื่อสะสมแต้มครบ</option>
              <option value="spending">เมื่อมียอดซื้อถึง</option>
              <option value="birthday">ในวันเกิดลูกค้า</option>
            </select>
          </div>

          {/* ถ้ามีเงื่อนไข ให้ใส่ค่าที่ต้องถึง */}
          {form.condition !== "none" && form.condition !== "birthday" && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                ค่าที่ต้องถึง ({form.condition === "points" ? "แต้ม" : "บาท"})
              </label>
              <input
                type="number"
                name="conditionValue"
                value={form.conditionValue}
                onChange={handleChange}
                placeholder={
                  form.condition === "points" ? "เช่น 200 แต้ม" : "เช่น 1000 บาท"
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400"
              />
            </div>
          )}

          {/* ปุ่มบันทึก */}
          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <Save size={18} /> บันทึกคูปอง
          </button>
        </form>
      </div>

      {/* 🧾 แสดงคูปองที่มีอยู่ */}
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-xl border border-amber-200 p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          🎟️ คูปองที่มีอยู่ ({coupons.length})
        </h2>

        {coupons.length === 0 ? (
          <div className="text-center text-slate-400 py-10">
            ยังไม่มีคูปองในระบบ 😅
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {coupons.map((c) => (
              <div
                key={c.id}
                className="border-2 border-amber-200 rounded-xl p-4 bg-gradient-to-br from-amber-50 to-white hover:shadow-md transition relative"
              >
                <div className="font-semibold text-lg text-amber-700">
                  {c.title}
                </div>
                <div className="text-sm text-slate-600">
                  รหัส: <span className="font-mono">{c.code}</span>
                </div>
                <div className="text-sm text-slate-600">
                  ส่วนลด:{" "}
                  {c.type === "percent"
                    ? `${c.value}%`
                    : `${c.value.toLocaleString()} บาท`}
                </div>
                <div className="text-sm text-slate-600">
                  เงื่อนไข:{" "}
                  {c.condition === "none"
                    ? "แจกทั่วไป"
                    : c.condition === "points"
                    ? `สะสมครบ ${c.conditionValue} แต้ม`
                    : c.condition === "spending"
                    ? `ยอดซื้อถึง ${c.conditionValue} บาท`
                    : "วันเกิดลูกค้า"}
                </div>
                <div className="text-sm text-slate-500">
                  วันหมดอายุ: {c.expiry || "ไม่ระบุ"}
                </div>

                <button
                  onClick={() => deleteCoupon(c.id)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
