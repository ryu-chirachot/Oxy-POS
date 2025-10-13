import { useState } from 'react';
import { Line, Pie, Bar, Radar } from 'react-chartjs-2';
import { DollarSign, Users, Clipboard, ChartBar, Award, Star } from 'lucide-react';
import 'chart.js/auto';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate(); // ใช้สำหรับเปลี่ยนหน้า

  const stats = [
    {
      title: 'รายได้วันนี้',
      value: '฿25,000',
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-100',
    },
    {
      title: 'ลูกค้าทั้งหมด',
      value: '120 คน',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'ออเดอร์ที่เสร็จสิ้น',
      value: '85 รายการ',
      icon: Clipboard,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100',
    },
  ];

  // ข้อมูลตัวอย่างสำหรับกราฟเส้น
  const lineChartData = {
    labels: ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์', 'อาทิตย์'],
    datasets: [
      {
        label: 'รายได้ (บาท)',
        data: [5000, 7000, 8000, 6000, 10000, 12000, 15000],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  // ข้อมูลตัวอย่างสำหรับ Pie Chart
  const pieChartData = {
    labels: ['อาหารไทย', 'อาหารอีสาน', 'อาหารจานเดียว', 'เครื่องดื่ม'],
    datasets: [
      {
        label: 'หมวดหมู่ยอดนิยม',
        data: [40, 30, 20, 10], // เปอร์เซ็นต์ของแต่ละหมวดหมู่
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  interface Customer {
    name: string;
    age: number;
    gender: string;
    lifestyle: string;
    orders: { menu: string; quantity: number }[]; // Add orders property
  }

  const sendPromotionMessage = (customer: Customer, promotion: string): void => {
    console.log(`ส่งข้อความถึง ${customer.name}: ${promotion}`);
  };

  // Define customers array with proper type
  const customers: Customer[] = []; // Replace with actual customer data

  const fridayBeerNight = customers.filter((c: Customer) => c.lifestyle === 'ปาร์ตี้');
  fridayBeerNight.forEach((customer: Customer) =>
    sendPromotionMessage(customer, 'ศุกร์หรรษา รับไปเลยการลดราคาอาหาร 5% !!')
  );

  // Segmentation Logic
  interface Segments {
    students: Customer[];
    workingWomen: Customer[];
    partyLovers: Customer[];
  }

  const segmentCustomers = (customers: Customer[]): Segments => {
    return {
      students: customers.filter((c) => c.age < 25),
      workingWomen: customers.filter((c) => c.gender === 'หญิง' && c.age >= 25),
      partyLovers: customers.filter((c) => c.lifestyle === 'ปาร์ตี้'),
    };
  };

  // Example Usage
  const segments = segmentCustomers(customers);

  const analyzeTopMenu = (orders: { menu: string; quantity: number }[]) => {
    const menuCount: Record<string, number> = {};
    orders.forEach((order) => {
      menuCount[order.menu] = (menuCount[order.menu] || 0) + order.quantity;
    });
    const sortedMenus = Object.entries(menuCount).sort((a, b) => b[1] - a[1]);
    return sortedMenus.slice(0, 3); // เมนูยอดนิยม 3 อันดับ
  };

  // Example Usage
  const topMenus = analyzeTopMenu(customers.flatMap((c) => c.orders));

  // Example data for Radar chart
  const customerBehaviorData = {
    labels: ['ความถี่การสั่งซื้อ', 'ความพึงพอใจ', 'การแนะนำ', 'การกลับมาซื้อซ้ำ'],
    datasets: [
      {
        label: 'พฤติกรรมลูกค้า',
        data: [80, 90, 70, 85],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // เพิ่มข้อมูลสำหรับการวิเคราะห์
  const aiAnalysis = {
    daily: {
      summary: 'วันนี้ยอดขายเพิ่มขึ้น 15% จากวันที่ผ่านมา',
      highlights: [
        'ช่วงกลางวันมีลูกค้าเข้าร้านมากที่สุด',
        'เมนูขายดี: ต้มยำกุ้ง, ข้าวผัดกุ้ง',
        'มีการจองโต๊ะล่วงหน้า 8 โต๊ะสำหรับช่วงเย็น',
      ],
      alerts: [
        'วัตถุดิบกุ้งเหลือน้อย ควรสั่งเพิ่ม',
        'พนักงานเสิร์ฟช่วงกลางวันไม่เพียงพอ',
      ],
    },
    weekly: {
      summary: 'สัปดาห์นี้รายได้สูงกว่าเป้า 10%',
      trends: [
        'ยอดสั่งอาหารออนไลน์เพิ่มขึ้น 25%',
        'ลูกค้ากลุ่มออฟฟิศเพิ่มขึ้น',
        'เมนูสุขภาพได้รับความนิยมมากขึ้น',
      ],
    },
    monthly: {
      summary: 'เดือนนี้มีแนวโน้มทำรายได้สูงสุดในรอบปี',
      insights: [
        'ลูกค้าประจำเพิ่มขึ้น 30%',
        'โปรโมชั่นบัตรสมาชิกได้ผลตอบรับดี',
        'ควรเพิ่มที่นั่งโซนนอกร้าน',
      ],
    },
  };

  // เพิ่มข้อมูลการวิเคราะห์ยอดขาย
  const salesAnalysis = {
    revenue: {
      daily: 25000,
      weekly: 175000,
      monthly: 750000,
      growth: {
        daily: 15,
        weekly: 10,
        monthly: 25,
      },
    },
    topProducts: [
      { name: 'ต้มยำกุ้ง', sales: 150, revenue: 45000, growth: 25 },
      { name: 'ผัดไทย', sales: 120, revenue: 30000, growth: 15 },
      { name: 'ส้มตำ', sales: 100, revenue: 20000, growth: 20 },
    ],
    peakHours: [
      { time: '11:00-13:00', orders: 85, revenue: 21250 },
      { time: '17:00-19:00', orders: 95, revenue: 23750 },
      { time: '19:00-21:00', orders: 75, revenue: 18750 },
    ],
    salesChannels: [
      { channel: 'หน้าร้าน', percentage: 60, growth: 5 },
      { channel: 'ออนไลน์', percentage: 30, growth: 35 },
      { channel: 'จัดเลี้ยง', percentage: 10, growth: 15 },
    ],
  };

  // เพิ่มข้อมูลการวิเคราะห์ลูกค้า
  const customerAnalysis = {
    demographics: {
      ageGroups: [
        { group: '18-24', count: 250, percentage: 25 },
        { group: '25-34', count: 400, percentage: 40 },
        { group: '35-44', count: 200, percentage: 20 },
        { group: '45+', count: 150, percentage: 15 },
      ],
      gender: {
        male: { count: 480, percentage: 48 },
        female: { count: 520, percentage: 52 },
      },
      occupation: [
        { type: 'นักศึกษา', count: 300, percentage: 30 },
        { type: 'พนักงานออฟฟิศ', count: 400, percentage: 40 },
        { type: 'เจ้าของธุรกิจ', count: 200, percentage: 20 },
        { type: 'อื่นๆ', count: 100, percentage: 10 },
      ],
    },
    loyalty: {
      membershipTiers: [
        { tier: 'ทั่วไป', count: 600, percentage: 60 },
        { tier: 'เงิน', count: 250, percentage: 25 },
        { tier: 'ทอง', count: 150, percentage: 15 },
      ],
      averageVisitsPerMonth: 2.5,
      repeatCustomerRate: 65,
      loyaltyPointsRedemption: 45,
    },
    behavior: {
      visitTimes: [
        { time: 'มื้อเช้า (8:00-11:00)', percentage: 15 },
        { time: 'มื้อกลางวัน (11:00-14:00)', percentage: 40 },
        { time: 'มื้อเย็น (17:00-21:00)', percentage: 35 },
        { time: 'อื่นๆ', percentage: 10 },
      ],
      averageSpend: 550,
      popularCategories: [
        { category: 'อาหารไทย', percentage: 45 },
        { category: 'อาหารอีสาน', percentage: 30 },
        { category: 'เครื่องดื่ม', percentage: 25 },
      ],
    },
  };

  // เพิ่มข้อมูลการวิเคราะห์ความพึงพอใจ
  const satisfactionAnalysis = {
    overall: {
      current: 4.5,
      previous: 4.3,
      change: 0.2,
      target: 4.8,
    },
    categories: [
      { name: 'คุณภาพอาหาร', score: 4.7, previous: 4.6, weight: 40 },
      { name: 'การบริการ', score: 4.3, previous: 4.1, weight: 30 },
      { name: 'บรรยากาศ', score: 4.4, previous: 4.3, weight: 20 },
      { name: 'ความคุ้มค่า', score: 4.2, previous: 4.0, weight: 10 },
    ],
    feedback: {
      positive: [
        { topic: 'รสชาติอาหาร', count: 150, percentage: 45 },
        { topic: 'การบริการ', count: 100, percentage: 30 },
        { topic: 'บรรยากาศ', count: 80, percentage: 25 },
      ],
      negative: [
        { topic: 'เวลารอ', count: 50, percentage: 40 },
        { topic: 'ที่จอดรถ', count: 40, percentage: 32 },
        { topic: 'ราคา', count: 35, percentage: 28 },
      ],
    },
    trends: {
      monthly: [4.2, 4.3, 4.4, 4.5, 4.5, 4.5],
      improvement: 'เพิ่มขึ้นต่อเนื่อง 6 เดือน',
    },
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="rounded-lg shadow-lg p-6 bg-white flex items-center gap-4"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bgColor}`}
                    >
                      <Icon size={24} className={stat.color} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{stat.title}</h3>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AI Analysis Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Daily Analysis */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="bg-green-100 p-2 rounded-full mr-2">
                    <DollarSign className="text-green-500" size={20} />
                  </span>
                  วันนี้
                </h2>
                <p className="text-gray-700 mb-4">{aiAnalysis.daily.summary}</p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">ไฮไลท์</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {aiAnalysis.daily.highlights.map((item, index) => (
                        <li key={index} className="text-gray-600">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 text-red-500">การแจ้งเตือน</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {aiAnalysis.daily.alerts.map((alert, index) => (
                        <li key={index} className="text-red-600">
                          {alert}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Weekly Analysis */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="bg-blue-100 p-2 rounded-full mr-2">
                    <ChartBar className="text-blue-500" size={20} />
                  </span>
                  สัปดาห์นี้
                </h2>
                <p className="text-gray-700 mb-4">{aiAnalysis.weekly.summary}</p>
                <div>
                  <h3 className="font-medium mb-2">แนวโน้ม</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {aiAnalysis.weekly.trends.map((trend, index) => (
                      <li key={index} className="text-gray-600">
                        {trend}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Monthly Analysis */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="bg-purple-100 p-2 rounded-full mr-2">
                    <Star className="text-purple-500" size={20} />
                  </span>
                  เดือนนี้
                </h2>
                <p className="text-gray-700 mb-4">{aiAnalysis.monthly.summary}</p>
                <div>
                  <h3 className="font-medium mb-2">ข้อมูลเชิงลึก</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {aiAnalysis.monthly.insights.map((insight, index) => (
                      <li key={index} className="text-gray-600">
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            

         
</div>
        );

      case 'sales':
        return (
          <div className="space-y-6">
            {/* รายได้และการเติบโต */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-center items-center mb-2">
                  <DollarSign className="text-green-500" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-4">รายได้วันนี้</h3>
                <p className="text-3xl font-bold text-green-600">
                  ฿{salesAnalysis.revenue.daily.toLocaleString()}
                </p>
                <p className="text-sm text-green-500">
                  ▲ {salesAnalysis.revenue.growth.daily}% จากเมื่อวาน
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-center items-center mb-2">
                  <ChartBar className="text-blue-500" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-4">รายได้สัปดาห์นี้</h3>
                <p className="text-3xl font-bold text-green-600">
                  ฿{salesAnalysis.revenue.weekly.toLocaleString()}
                </p>
                <p className="text-sm text-green-500">
                  ▲ {salesAnalysis.revenue.growth.weekly}% จากสัปดาห์ที่แล้ว
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-center items-center mb-2">
                  <Star className="text-purple-500" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-4">รายได้เดือนนี้</h3>
                <p className="text-3xl font-bold text-green-600">
                  ฿{salesAnalysis.revenue.monthly.toLocaleString()}
                </p>
                <p className="text-sm text-green-500">
                  ▲ {salesAnalysis.revenue.growth.monthly}% จากเดือนที่แล้ว
                </p>
              </div>
            </div>

            {/* กราฟแนวโน้มยอดขาย */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4">แนวโน้มยอดขาย</h2>
              <Line data={lineChartData} />
              <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">AI วิเคราะห์</h3>
                <ul className="list-disc pl-5 space-y-2 text-blue-700">
                  <li>พบการเติบโตต่อเนื่อง โดยเฉพาะช่วงวันศุกร์-อาทิตย์ (+40%)</li>
                  <li>ช่วงเวลา Peak มีประสิทธิภาพการขายสูงสุดที่ 95%</li>
                  <li>ยอดขายผ่านช่องทางออนไลน์เติบโตเร็วที่สุด (+35%)</li>
                </ul>
              </div>
            </div>

            {/* สินค้าขายดี */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4">สินค้าขายดี</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left">เมนู</th>
                      <th className="px-6 py-3 text-right">จำนวน</th>
                      <th className="px-6 py-3 text-right">รายได้</th>
                      <th className="px-6 py-3 text-right">การเติบโต</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesAnalysis.topProducts.map((product, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-6 py-4">{product.name}</td>
                        <td className="px-6 py-4 text-right">{product.sales}</td>
                        <td className="px-6 py-4 text-right">
                          ฿{product.revenue.toLocaleString()}
                        </td>
                        <td className={`px-6 py-4 text-right ${product.growth > 20 ? 'text-green-500' : product.growth > 10 ? 'text-yellow-500' : 'text-red-500'}`}>
                          +{product.growth}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'customers':
        return (
          <div className="space-y-6">
            {/* ภาพรวมลูกค้า */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">จำนวนลูกค้าทั้งหมด</h3>
                <p className="text-3xl font-bold text-blue-600">1,000</p>
                <p className="text-sm text-gray-500">เพิ่มขึ้น 15% จากเดือนที่แล้ว</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">ลูกค้าประจำ</h3>
                <p className="text-3xl font-bold text-green-600">65%</p>
                <p className="text-sm text-gray-500">อัตราการกลับมาใช้บริการซ้ำ</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">ค่าใช้จ่ายเฉลี่ย/คน</h3>
                <p className="text-3xl font-bold text-purple-600">฿550</p>
                <p className="text-sm text-gray-500">เพิ่มขึ้น 8% จากเดือนที่แล้ว</p>
              </div>
            </div>

            {/* การแบ่งกลุ่มลูกค้า */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">การแบ่งกลุ่มลูกค้า</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">ตามช่วงอายุ</h4>
                  <Pie
                    data={{
                      labels: customerAnalysis.demographics.ageGroups.map((g) => g.group),
                      datasets: [
                        {
                          data: customerAnalysis.demographics.ageGroups.map((g) => g.percentage),
                          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                        },
                      ],
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-medium mb-2">ตามอาชีพ</h4>
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
                  />
                </div>
              </div>
            </div>

            {/* พฤติกรรมลูกค้า */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">พฤติกรรมการใช้บริการ</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">ช่วงเวลาที่มาใช้บริการ</h4>
                  <Bar
                    data={{
                      labels: customerAnalysis.behavior.visitTimes.map((v) => v.time),
                      datasets: [
                        {
                          label: 'เปอร์เซ็นต์',
                          data: customerAnalysis.behavior.visitTimes.map((v) => v.percentage),
                          backgroundColor: '#36A2EB',
                        },
                      ],
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-medium mb-2">หมวดหมู่อาหารยอดนิยม</h4>
                  <Pie
                    data={{
                      labels: customerAnalysis.behavior.popularCategories.map((c) => c.category),
                      datasets: [
                        {
                          data: customerAnalysis.behavior.popularCategories.map((c) => c.percentage),
                          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                        },
                      ],
                    }}
                  />
                </div>
              </div>
            </div>

            {/* AI วิเคราะห์และคำแนะนำ */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">AI วิเคราะห์และคำแนะนำ</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>ลูกค้ากลุ่มวัยทำงานมีแนวโน้มเพิ่มขึ้นในช่วงวันธรรมดา</li>
                <li>ควรเพิ่มเมนูอาหารสุขภาพเพื่อดึงดูดกลุ่มลูกค้าใหม่</li>
                <li>จัดโปรโมชั่นสำหรับกลุ่มนักศึกษาในช่วงเปิดเทอม</li>
                <li>เพิ่มพนักงานในช่วงเวลา Peak (11:00-13:00 และ 17:00-19:00)</li>
              </ul>
            </div>
          </div>
        );

      case 'satisfaction':
        return (
          <div className="space-y-6">
            {/* คะแนนความพึงพอใจโดยรวม */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4 text-center">คะแนนความพึงพอใจโดยรวม</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5 justify-items-center items-center">
                <div className="text-center">
                  <div className="flex justify-center items-center mb-2">
                    <DollarSign className="text-blue-500" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">คะแนนรวม</h3>
                  <p className="text-4xl font-bold text-blue-600">
                    {satisfactionAnalysis.overall.current}
                  </p>
                  <p className="text-sm text-green-500">
                    ▲ {satisfactionAnalysis.overall.change} จากเดือนที่แล้ว
                  </p>
                </div>
                {satisfactionAnalysis.categories.map((cat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center items-center mb-2">
                      {cat.score >= 4.5 ? (
                        <Star className="text-green-500" size={24} />
                      ) : cat.score >= 4.0 ? (
                        <Award className="text-yellow-500" size={24} />
                      ) : (
                        <Clipboard className="text-red-500" size={24} />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{cat.name}</h3>
                    <p className={`text-4xl font-bold ${cat.score >= 4.5 ? 'text-green-600' : cat.score >= 4.0 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {cat.score}
                    </p>
                    <p className={`text-sm ${cat.score - cat.previous > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {cat.score - cat.previous > 0 ? '▲' : '▼'} {(cat.score - cat.previous).toFixed(1)} จากเดือนที่แล้ว
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* การวิเคราะห์ความคิดเห็น */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">การวิเคราะห์ความคิดเห็น</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-green-600 mb-2">ความคิดเห็นเชิงบวก</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {satisfactionAnalysis.feedback.positive.map((feedback, index) => (
                      <li key={index}>
                        <strong>{feedback.topic}</strong>: {feedback.count} ความคิดเห็น ({feedback.percentage}%)
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-600 mb-2">ความคิดเห็นเชิงลบ</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {satisfactionAnalysis.feedback.negative.map((feedback, index) => (
                      <li key={index}>
                        <strong>{feedback.topic}</strong>: {feedback.count} ความคิดเห็น ({feedback.percentage}%)
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* ตัวอย่างความคิดเห็น */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">ตัวอย่างความคิดเห็น</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>ความคิดเห็นเชิงบวก:</strong> "อาหารอร่อยมาก บริการดีเยี่ยม พนักงานยิ้มแย้มแจ่มใส"
                  </p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>ความคิดเห็นเชิงลบ:</strong> "รอนานเกินไปในช่วงเย็น และที่จอดรถไม่เพียงพอ"
                  </p>
                </div>
              </div>
            </div>

            {/* AI วิเคราะห์และคำแนะนำ */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">AI วิเคราะห์และคำแนะนำ</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>ปรับปรุงการบริการในช่วงเวลาที่ลูกค้ารอนาน เช่น เพิ่มพนักงานในช่วงเย็น</li>
                <li>เพิ่มที่จอดรถหรือจัดการพื้นที่จอดรถให้เหมาะสม</li>
                <li>จัดโปรโมชั่นลดราคาสำหรับเมนูที่ลูกค้ารู้สึกว่า "ราคาแพง"</li>
                <li>เพิ่มเมนูใหม่ที่ตอบโจทย์กลุ่มลูกค้าที่ชื่นชอบอาหารสุขภาพ</li>
                <li>ปรับปรุงระบบการจองโต๊ะออนไลน์ให้สะดวกและรวดเร็วมากขึ้น</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">แดชบอร์ดแอดมิน</h1>
          <p className="text-gray-600">ดูข้อมูลและจัดการร้านอาหารของคุณ</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-4 justify-center">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'overview'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              ภาพรวม
            </button>
            <button
              onClick={() => setActiveTab('sales')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'sales'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              ยอดขาย
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'customers'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              ลูกค้า
            </button>
            <button
              onClick={() => setActiveTab('satisfaction')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'satisfaction'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              ความพึงพอใจ
            </button>
          </nav>
        </div>

        {/* Dynamic Content */}
        {renderContent()}
      </div>
    </div>
  );
}