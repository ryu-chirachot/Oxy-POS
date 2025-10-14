import React, { useState } from "react";

export default function AdminReservations() {
  const [search, setSearch] = useState("");
  const [zoneFilter, setZoneFilter] = useState("ทั้งหมด");

  const [reservations, setReservations] = useState([
    { id: "BK1001", name: "สมชาย", zone: "บาร์", table: "3", people: 4, date: "12 ต.ค. 2568 18:30", status: "Pending", memberLevel: "Silver", phone: "081-234-5678" },
    { id: "BK1005", name: "นานา", zone: "บาร์", table: "6", people: 2, date: "12 ต.ค. 2568 19:00", status: "Pending", memberLevel: "Silver", phone: "089-555-7788" },
    { id: "BK1002", name: "จิต", zone: "ลานแคมป์ปิ้ง", table: "2", people: 2, date: "12 ต.ค. 2568 19:00", status: "Confirmed", memberLevel: "Platinum", phone: "086-777-9911" },
    { id: "BK1003", name: "อรุณ", zone: "ลานแคมป์ปิ้ง", table: "5", people: 6, date: "13 ต.ค. 2568 17:00", status: "Pending", memberLevel: "Gold", phone: "080-123-9999" },
    { id: "BK1004", name: "ธนา", zone: "ร้านอาหาร", table: "16", people: 3, date: "14 ต.ค. 2568 18:00", status: "Cancelled", memberLevel: "Platinum", phone: "082-456-1111" },
  ]);

  const updateStatus = (id, next) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: next } : r))
    );
  };

  // ✅ Filter ด้วย search + zone
  const filtered = reservations.filter((r) => {
    const text = search.toLowerCase();
    const matchSearch =
      r.id.toLowerCase().includes(text) ||
      r.name.toLowerCase().includes(text) ||
      r.zone.toLowerCase().includes(text) ||
      r.table.toLowerCase().includes(text);
    const matchZone = zoneFilter === "ทั้งหมด" ? true : r.zone === zoneFilter;
    return matchSearch && matchZone;
  });

  const statusColor = (status) =>
    ({
      Pending: "bg-yellow-100 text-yellow-700",
      Confirmed: "bg-green-100 text-green-700",
      Cancelled: "bg-red-100 text-red-700",
    }[status]);

  const memberBadge = (level) => {
    switch (level) {
      case "Platinum":
        return "text-blue-700 bg-blue-100";
      case "Gold":
        return "text-yellow-700 bg-yellow-100";
      case "Silver":
        return "text-gray-700 bg-gray-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">🍽️ Table Reservations</h1>

      {/* 🔍 แถบค้นหา + Dropdown โซน */}
      <div className="card p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔎 ค้นหา Booking ID / ชื่อ "
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div>
          <select
            value={zoneFilter}
            onChange={(e) => setZoneFilter(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            {["ทั้งหมด", "บาร์", "ลานแคมป์ปิ้ง", "ร้านอาหาร"].map((z) => (
              <option key={z} value={z}>{z}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-3 text-right text-sm text-slate-500">
          พบทั้งหมด {filtered.length} รายการ
        </div>
      </div>

      {/* ตารางข้อมูล */}
      <div className="card p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left p-3">Booking ID</th>
                <th className="text-left p-3">ชื่อลูกค้า</th>
                <th className="text-left p-3">โซน</th>
                <th className="text-left p-3">โต๊ะ</th>
                <th className="text-left p-3">จำนวนคน</th>
                <th className="text-left p-3">วันเวลา</th>
                <th className="text-left p-3">ระดับสมาชิก</th>
                <th className="text-left p-3">สถานะ</th>
                <th className="text-left p-3">เบอร์ติดต่อ</th> 
                <th className="text-right p-3">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-8 text-slate-400">
                    ไม่พบข้อมูลที่ค้นหา
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id + r.table} className="border-b hover:bg-slate-50">
                    <td className="p-3 font-mono text-slate-700">{r.id}</td>
                    <td className="p-3">{r.name}</td>
                    <td className="p-3">{r.zone}</td>
                    <td className="p-3">{r.table}</td>
                    <td className="p-3">{r.people}</td>
                    <td className="p-3 whitespace-nowrap">{r.date}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${memberBadge(r.memberLevel)}`}
                      >
                        {r.memberLevel}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor(r.status)}`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="p-3 font-medium text-slate-700">
                      <a className="text-black-600">
                        {r.phone}
                      </a>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex gap-1 justify-end">
                        <button
                          onClick={() => updateStatus(r.id, "Confirmed")}
                          className="btn text-xs px-3 bg-green-800 hover:bg-green-600 text-white border border-green-800 duration-200"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => updateStatus(r.id, "Cancelled")}
                          className="btn text-xs px-3 bg-red-800 hover:bg-red-600 text-white border border-red-800 transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
