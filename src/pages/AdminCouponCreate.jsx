import React, { useState } from "react";
import { Gift, Save, Calendar, Percent } from "lucide-react";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.code || !form.value) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    console.log("✅ Coupon Created:", form);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-amber-200 p-8">
        <h1 className="text-3xl font-bold text-amber-700 mb-6 flex items-center gap-2 justify-center">
          <Gift size={32} /> สร้างคูปองใหม่
        </h1>

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

          {/* เงื่อนไขการแจกคูปอง */}
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
    </div>
  );
}
