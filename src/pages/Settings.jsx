import React, { useState } from 'react'
import { usePOSStore } from '../store'
import logo from "../assets/logo.jpg";
import qr from "../assets/QRcode.png";

export default function Settings() {
  const [tab, setTab] = useState('Store')
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">⚙️ Settings</h1>
      <div className="card p-6">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['Store', 'Categories', 'Tax & Discount', 'Receipt'].map(t => (
            <button 
              key={t} 
              className={`btn whitespace-nowrap ${tab === t ? 'border-amber-500 text-amber-600 bg-amber-50 font-semibold' : ''}`} 
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        
        <div className="min-h-[400px]">
          {tab === 'Store' && <StoreTab />}
          {tab === 'Categories' && <CategoriesTab />}
          {tab === 'Tax & Discount' && <TaxTab />}
          {tab === 'Receipt' && <ReceiptTab />}
        </div>
      </div>
    </div>
  )
}

// Store Information Tab
function StoreTab() {
  const { storeInfo, updateStoreInfo } = usePOSStore()
  const [form, setForm] = useState(storeInfo)
  
  const handleSave = () => {
    updateStoreInfo(form)
    alert('✅ Store information saved!')
  }
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-800">🏪 Store Information</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-600 mb-2 font-medium">Store Name</label>
          <input 
            className="input w-full" 
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-sm text-slate-600 mb-2 font-medium">Phone</label>
          <input 
            className="input w-full" 
            value={form.phone}
            onChange={e => setForm({...form, phone: e.target.value})}
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm text-slate-600 mb-2 font-medium">Address</label>
          <textarea 
            className="input w-full" 
            rows="3"
            value={form.address}
            onChange={e => setForm({...form, address: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-sm text-slate-600 mb-2 font-medium">Tax ID</label>
          <input 
            className="input w-full" 
            value={form.taxId}
            onChange={e => setForm({...form, taxId: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-sm text-slate-600 mb-2 font-medium">Email</label>
          <input 
            className="input w-full" 
            type="email"
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
          />
        </div>
      </div>
      
      <button className="btn-gold" onClick={handleSave}>💾 Save Changes</button>
    </div>
  )
}

// Categories Management Tab
function CategoriesTab() {
  const { categories, addCategory, removeCategory, updateCategory } = usePOSStore()
  const [newCat, setNewCat] = useState('')
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-800">📋 Menu Categories</h3>
      
      <div className="flex gap-2">
        <input 
          className="input flex-1" 
          placeholder="New category name..."
          value={newCat}
          onChange={e => setNewCat(e.target.value)}
          onKeyPress={e => {
            if (e.key === 'Enter' && newCat.trim()) {
              addCategory(newCat.trim())
              setNewCat('')
            }
          }}
        />
        <button 
          className="btn-gold"
          onClick={() => {
            if (newCat.trim()) {
              addCategory(newCat.trim())
              setNewCat('')
            }
          }}
        >
          + Add
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-3">
        {categories.map(cat => (
          <div key={cat.id} className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4 flex items-center justify-between group hover:border-amber-400 hover:bg-amber-50 transition">
            <div>
              <input 
                className="bg-transparent border-none outline-none text-base font-semibold text-slate-800"
                value={cat.name}
                onChange={e => updateCategory(cat.id, e.target.value)}
              />
              <div className="text-xs text-slate-500 mt-1">
                {cat.itemCount || 0} items
              </div>
            </div>
            <button 
              className="btn py-1 px-3 text-xs text-red-600 opacity-0 group-hover:opacity-100 transition hover:bg-red-50"
              onClick={() => {
                if (confirm(`Delete "${cat.name}" category?`)) removeCategory(cat.id)
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      
      {categories.length === 0 && (
        <div className="text-center text-slate-400 py-8 bg-slate-50 rounded-xl">
          No categories yet. Add your first category above.
        </div>
      )}
    </div>
  )
}

// Tax & Discount Tab
function TaxTab() {
  const { taxSettings, updateTaxSettings } = usePOSStore()
  const [form, setForm] = useState(taxSettings)
  
  const handleSave = () => {
    updateTaxSettings(form)
    alert('✅ Tax settings saved!')
  }
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-800">💰 Tax & Discount Settings</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5">
          <h4 className="font-bold mb-4 text-blue-900">Tax Configuration</h4>
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                <input 
                  type="checkbox"
                  checked={form.vatEnabled}
                  onChange={e => setForm({...form, vatEnabled: e.target.checked})}
                  className="w-5 h-5 rounded"
                />
                <span className="text-slate-700">Enable VAT</span>
              </label>
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-2 font-medium">VAT Rate (%)</label>
              <input 
                className="input w-full" 
                type="number"
                step="0.01"
                value={form.vatRate}
                onChange={e => setForm({...form, vatRate: parseFloat(e.target.value) || 0})}
                disabled={!form.vatEnabled}
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                <input 
                  type="checkbox"
                  checked={form.serviceChargeEnabled}
                  onChange={e => setForm({...form, serviceChargeEnabled: e.target.checked})}
                  className="w-5 h-5 rounded"
                />
                <span className="text-slate-700">Enable Service Charge</span>
              </label>
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-2 font-medium">Service Charge (%)</label>
              <input 
                className="input w-full" 
                type="number"
                step="0.01"
                value={form.serviceChargeRate}
                onChange={e => setForm({...form, serviceChargeRate: parseFloat(e.target.value) || 0})}
                disabled={!form.serviceChargeEnabled}
              />
            </div>
          </div>
        </div>
        
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-5">
          <h4 className="font-bold mb-4 text-amber-900">Quick Discounts</h4>
          <div className="space-y-2">
            {form.quickDiscounts.map((d, i) => (
              <div key={i} className="flex gap-2">
                <input 
                  className="input flex-1" 
                  placeholder="Discount name"
                  value={d.name}
                  onChange={e => {
                    const newDiscounts = [...form.quickDiscounts]
                    newDiscounts[i].name = e.target.value
                    setForm({...form, quickDiscounts: newDiscounts})
                  }}
                />
                <input 
                  className="input w-20" 
                  type="number"
                  placeholder="%"
                  value={d.percent}
                  onChange={e => {
                    const newDiscounts = [...form.quickDiscounts]
                    newDiscounts[i].percent = parseFloat(e.target.value) || 0
                    setForm({...form, quickDiscounts: newDiscounts})
                  }}
                />
                <button 
                  className="btn px-3 text-red-600 hover:bg-red-50"
                  onClick={() => {
                    const newDiscounts = form.quickDiscounts.filter((_, idx) => idx !== i)
                    setForm({...form, quickDiscounts: newDiscounts})
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            <button 
              className="btn w-full text-sm"
              onClick={() => {
                setForm({
                  ...form, 
                  quickDiscounts: [...form.quickDiscounts, { name: '', percent: 0 }]
                })
              }}
            >
              + Add Discount
            </button>
          </div>
        </div>
      </div>
      
      <button className="btn-gold" onClick={handleSave}>💾 Save Settings</button>
    </div>
  )
}

// Receipt Customization Tab
function ReceiptTab() {
  const { receiptSettings, updateReceiptSettings } = usePOSStore()
  const [form, setForm] = useState(receiptSettings)
  
  const handleSave = () => {
    updateReceiptSettings(form)
    alert('✅ Receipt settings saved!')
  }
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-800">🧾 Receipt Customization</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-600 mb-2 font-medium">Header Text</label>
            <textarea 
              className="input w-full" 
              rows="3"
              placeholder="Welcome to..."
              value={form.headerText}
              onChange={e => setForm({...form, headerText: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm text-slate-600 mb-2 font-medium">Footer Text</label>
            <textarea 
              className="input w-full" 
              rows="3"
              placeholder="Thank you..."
              value={form.footerText}
              onChange={e => setForm({...form, footerText: e.target.value})}
            />
          </div>
          
          <div className="bg-slate-50 rounded-xl p-4 space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
              <input 
                type="checkbox"
                checked={form.showLogo}
                onChange={e => setForm({...form, showLogo: e.target.checked})}
                className="w-5 h-5 rounded"
              />
              <span className="text-slate-700">Show Logo</span>
            </label>
            
            <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
              <input 
                type="checkbox"
                checked={form.showQRCode}
                onChange={e => setForm({...form, showQRCode: e.target.checked})}
                className="w-5 h-5 rounded"
              />
              <span className="text-slate-700">Show QR Code for Payment</span>
            </label>
          </div>
        </div>
        
        <div className="bg-white border-2 border-slate-300 rounded-xl p-6 shadow-lg">
          <div className="text-center space-y-2 text-slate-900">
            {form.showLogo && (
              <img
                src={logo}
                alt="Logo"
                className="block mx-auto h-16 md:h-20 w-auto object-contain"
              />
            )}
            <div className="font-bold text-lg">OXYFINE Meat & More</div>
            <div className="text-xs whitespace-pre-line">{form.headerText}</div>
            <div className="border-t-2 border-dashed border-slate-300 my-3"></div>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Wagyu A5 Striploin x1</span>
                <span>฿1,290</span>
              </div>
              <div className="flex justify-between">
                <span>Pork Belly x2</span>
                <span>฿338</span>
              </div>
            </div>
            <div className="border-t-2 border-dashed border-slate-300 my-3"></div>
            <div className="flex justify-between font-bold text-base">
              <span>TOTAL</span>
              <span>฿1,628</span>
            </div>
            {form.showQRCode && (
              <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-300 text-center">
                <div className="text-xs font-semibold text-slate-700 mb-2 flex items-center justify-center gap-1">
                  <span role="img" aria-label="phone">📱</span>
                  Scan to Pay
                </div>

                <img
                  src={qr}
                  alt="QR Code"
                  className="mx-auto w-28 h-28 md:w-32 md:h-32 object-contain border border-slate-200 rounded-md shadow-sm"
                />

                <div className="text-[10px] text-slate-500 mt-2">
                  * Please scan with any mobile banking app *
                </div>
              </div>
            )}
            <div className="text-xs mt-4 whitespace-pre-line text-slate-600">{form.footerText}</div>
          </div>
        </div>
      </div>
      
      <button className="btn-gold" onClick={handleSave}>💾 Save Settings</button>
    </div>
  )
}