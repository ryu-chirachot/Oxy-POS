import { useState, useEffect } from 'react';
import { Line, Pie, Bar, Radar } from 'react-chartjs-2';
import 'chart.js/auto';
import { Calendar, TrendingUp, Users, Coffee } from 'lucide-react';

export default function AIAnalytics() {
  const [filter, setFilter] = useState('ทั้งหมด');
  const [timeRange, setTimeRange] = useState('7วัน');
  const [loading, setLoading] = useState(false);

  // ข้อมูลตัวอย่างสำหรับกราฟ
  const lineChartData = {
    labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.'],
    datasets: [
      {
        label: 'รายได้ (บาท)',
        data: [50000, 60000, 55000, 70000, 80000, 75000, 90000],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const pieChartData = {
    labels: ['อาหารไทย', 'อาหารอีสาน', 'อาหารจานเดียว', 'เครื่องดื่ม'],
    datasets: [
      {
        label: 'หมวดหมู่ยอดนิยม',
        data: [40, 30, 20, 10],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };
  const customerAnalysis = {
  demographics: {
    occupation: [
      { type: 'นักศึกษา', count: 50 },
      { type: 'วัยทำงาน', count: 70 },
      { type: 'กลุ่มปาร์ตี้', count: 30 },
      { type: 'ผู้สูงอายุ', count: 20 },
    ],
  },
};
  const barChartData = {
    labels: ['นักศึกษา', 'วัยทำงาน', 'กลุ่มปาร์ตี้'],
    datasets: [
      {
        label: 'จำนวนลูกค้า',
        data: [50, 70, 30],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  // คำแนะนำและแนวโน้ม
  const recommendations = [
    'เพิ่มโปรโมชั่นสำหรับอาหารไทย เนื่องจากเป็นหมวดหมู่ยอดนิยม',
    'จัดโปรโมชันสำหรับกลุ่มนักศึกษาในช่วงเปิดเทอม',
    'เพิ่มเมนูใหม่ในหมวดอาหารอีสานเพื่อดึงดูดลูกค้า',
  ];

  // เพิ่มข้อมูลการวิเคราะห์พฤติกรรมลูกค้า
  const customerBehaviorData = {
    labels: [
      'ความถี่การใช้บริการ',
      'ยอดใช้จ่ายต่อครั้ง',
      'การตอบรับโปรโมชั่น',
      'การแนะนำเพื่อน',
      'การรีวิว',
    ],
    datasets: [
      {
        label: 'พฤติกรรมลูกค้า',
        data: [8, 7, 9, 6, 8],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // เพิ่มการวิเคราะห์แนวโน้มตามช่วงเวลา
  const timeAnalysis = {
    morning: { peak: '10:00-11:00', popular: 'กาแฟ, ข้าวไข่เจียว' },
    noon: { peak: '12:00-13:00', popular: 'ข้าวผัด, ต้มยำ' },
    evening: { peak: '18:00-19:00', popular: 'สเต็ก, เบียร์' },
  };

  // เพิ่มการพยากรณ์ยอดขาย
  const salesForecast = {
    nextWeek: 125000,
    nextMonth: 580000,
    trend: 'เพิ่มขึ้น 15%',
    suggestions: [
      'เพิ่มสต็อกวัตถุดิบอาหารทะเลเนื่องจากแนวโน้มความต้องการสูงขึ้น',
      'เตรียมพนักงานเพิ่มในช่วงวันศุกร์-เสาร์',
      'วางแผนโปรโมชั่นช่วงกลางสัปดาห์เพื่อกระตุ้นยอดขาย',
    ],
  };

  // เพิ่มการวิเคราะห์ความพึงพอใจ
  const satisfactionData = {
    overall: 4.5,
    food: 4.7,
    service: 4.3,
    atmosphere: 4.6,
    improvements: [
      'ลดเวลารอของลูกค้าในช่วงพีค',
      'เพิ่มรายการอาหารสุขภาพ',
      'ปรับปรุงที่จอดรถ',
    ],
  };

  return (
  <div className="min-h-screen bg-gray-50 py-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* หัวข้อใหญ่ */}
    <div className="text-center mb-10">
      <h1 className="text-3xl font-bold mb-2">AI วิเคราะห์ข้อมูล</h1>
      <p className="text-gray-600 text-base">ดูข้อมูลเชิงลึกและแนวโน้มจาก AI</p>
    </div>

    {/* ฟิลเตอร์ */}
    <div className="mb-10 text-center space-x-4">
      <label className="text-base font-medium">ฟิลเตอร์ข้อมูล:</label>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="px-3 py-2 border rounded-lg text-sm"
      >
        <option value="ทั้งหมด">ทั้งหมด</option>
        <option value="รายได้">รายได้</option>
        <option value="หมวดหมู่ยอดนิยม">หมวดหมู่ยอดนิยม</option>
        <option value="กลุ่มลูกค้า">กลุ่มลูกค้า</option>
      </select>

      <label className="ml-4 text-base font-medium">ช่วงเวลา:</label>
      <select
        value={timeRange}
        onChange={(e) => setTimeRange(e.target.value)}
        className="px-3 py-2 border rounded-lg text-sm"
      >
        <option value="7วัน">7 วันล่าสุด</option>
        <option value="30วัน">30 วันล่าสุด</option>
        <option value="90วัน">90 วันล่าสุด</option>
      </select>
    </div>

    {/* กล่องใหญ่ */}
    <div className="bg-white rounded-lg shadow-lg p-8 space-y-10">

      {/* กราฟรายได้ */}
{(filter === 'ทั้งหมด' || filter === 'รายได้') && (
  <div>
    <h2 className="text-xl font-semibold mb-3 text-center">รายได้รายเดือน</h2>
    <div className="flex justify-center">
      <div className="w-[1000px] h-[300px]">
        <Line
          data={lineChartData}
          options={{
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } },
          }}
        />
      </div>
    </div>

    {/* 🔹 คำแนะนำเฉพาะส่วนรายได้ */}
    <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 className="font-semibold text-blue-700 mb-2">คำแนะนำด้านรายได้</h3>
      <ul className="list-disc pl-6 text-sm text-gray-700">
        <li>พิจารณาเพิ่มโปรโมชั่นช่วงกลางเดือนที่รายได้ต่ำกว่าค่าเฉลี่ย</li>
        <li>เพิ่มการประชาสัมพันธ์ในช่องทางออนไลน์เพื่อขยายฐานลูกค้า</li>
        <li>ติดตามแนวโน้มรายได้ตามวันและเวลาพีคเพื่อปรับตารางพนักงาน</li>
      </ul>
    </div>
  </div>
)}

{/* หมวดหมู่ยอดนิยม */}
{(filter === 'ทั้งหมด' || filter === 'หมวดหมู่ยอดนิยม') && (
  <div>
    <h2 className="text-xl font-semibold mb-3 text-center">หมวดหมู่ยอดนิยม</h2>
    <div className="flex justify-center">
      <div className="w-[400px] h-[400px]">
        <Pie
          data={pieChartData}
          options={{
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } },
          }}
        />
      </div>
    </div>

    {/* 🔹 คำแนะนำเฉพาะส่วนหมวดหมู่ยอดนิยม */}
    <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
      <h3 className="font-semibold text-green-700 mb-2">คำแนะนำด้านหมวดหมู่สินค้า</h3>
      <ul className="list-disc pl-6 text-sm text-gray-700">
        <li>เพิ่มเมนูใหม่ในหมวดอาหารอีสาน เนื่องจากยอดขายใกล้เคียงอันดับ 1</li>
        <li>จัดโปรโมชั่น Combo สำหรับหมวดอาหารไทยกับเครื่องดื่ม</li>
        <li>ใช้ AI แนะนำเมนูเสริมจากหมวดที่ลูกค้าซื้อบ่อย</li>
      </ul>
    </div>
  </div>
)}

{/* กลุ่มลูกค้า */}
{(filter === 'ทั้งหมด' || filter === 'กลุ่มลูกค้า') && (
  <div>
    <h2 className="text-xl font-semibold mb-3 text-center">การแบ่งกลุ่มลูกค้า</h2>
    <div className="flex justify-center">
      <div className="w-[800px] h-[350px]">
        <Bar
          data={{
            labels: customerAnalysis.demographics.occupation.map((o) => o.type),
            datasets: [
              {
                label: 'จำนวนลูกค้า',
                data: customerAnalysis.demographics.occupation.map((o) => o.count),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } },
          }}
        />
      </div>
    </div>

    {/* 🔹 คำแนะนำเฉพาะส่วนลูกค้า */}
    <div className="mt-4 bg-purple-50 border border-purple-200 rounded-lg p-4">
      <h3 className="font-semibold text-purple-700 mb-2">คำแนะนำด้านลูกค้า</h3>
      <ul className="list-disc pl-6 text-sm text-gray-700">
        <li>สร้างโปรแกรมสะสมแต้มสำหรับกลุ่มนักศึกษาเพื่อเพิ่มการกลับมาใช้ซ้ำ</li>
        <li>ออกโปรโมชั่นพิเศษช่วงเย็นดึงดูดกลุ่มวัยทำงาน</li>
        <li>พัฒนาช่องทางสั่งล่วงหน้าสำหรับกลุ่มปาร์ตี้</li>
      </ul>
    </div>
  </div>
)}

{/* Radar Chart */}
{(filter === 'ทั้งหมด' || filter === 'พฤติกรรมลูกค้า') && (
  <div>
    <h2 className="text-xl font-semibold mb-4 text-center">การวิเคราะห์พฤติกรรมลูกค้า</h2>
    <div className="flex justify-center">
      <div className="h-[400px] w-full max-w-lg">
        <Radar
          data={customerBehaviorData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } },
          }}
        />
      </div>
    </div>

    {/* 🔹 คำแนะนำเฉพาะพฤติกรรม */}
    <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <h3 className="font-semibold text-yellow-700 mb-2">คำแนะนำด้านพฤติกรรมลูกค้า</h3>
      <ul className="list-disc pl-6 text-sm text-gray-700">
        <li>ส่งคูปองส่วนลดให้ลูกค้าที่รีวิวน้อย เพื่อกระตุ้นการมีส่วนร่วม</li>
        <li>เพิ่มรางวัลแนะนำเพื่อนสำหรับลูกค้าที่มีคะแนน “การแนะนำเพื่อน” สูง</li>
        <li>ปรับปรุงระบบแจ้งเตือนโปรโมชั่นในแอป เพื่อให้การตอบรับสูงขึ้น</li>
      </ul>
    </div>
  </div>
)}

      {/* 🔹 คำแนะนำรวมจาก AI */}
<div className="mt-12 bg-gray-100 rounded-lg p-6 border border-gray-300">
  <h2 className="text-2xl font-bold mb-3 text-center text-gray-800">
    สรุปคำแนะนำรวมจาก AI
  </h2>
  <p className="text-gray-700 text-center mb-4 text-sm">
    ระบบ AI วิเคราะห์ข้อมูลจากทุกส่วนและแนะนำแนวทางรวมเพื่อเพิ่มรายได้และความพึงพอใจของลูกค้า
  </p>
  <ul className="list-disc pl-8 text-gray-800 text-sm space-y-1">
    <li>เพิ่มความหลากหลายของเมนูและเน้นหมวดที่ทำยอดสูง</li>
    <li>ปรับตารางพนักงานและสต็อกตามช่วงเวลาพีค</li>
    <li>เพิ่มโปรโมชั่นเฉพาะกลุ่มลูกค้าหลัก</li>
    <li>ใช้ระบบ AI ในการพยากรณ์ยอดขายและวางกลยุทธ์ระยะยาว</li>
  </ul>
</div>
        </div>
      </div>
    </div>
);
}