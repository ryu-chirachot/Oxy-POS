import React, { useState } from 'react'
import { usePOSStore } from '../store'

export default function Settings() {
  const [tab, setTab] = useState('Store')
  
  return (
    <div className="p-4">
      <div className="card p-4">
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {['Store', 'Users', 'Categories', 'Tax & Discount', 'Receipt'].map(t => (
            <button 
              key={t} 
              className={`btn whitespace-nowrap ${tab === t ? 'border-oxy-gold text-oxy-gold' : ''}`} 
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        
        <div className="min-h-[400px]">
          {tab === 'Store' && <StoreTab />}
          {tab === 'Users' && <UsersTab />}
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
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-oxy-gold">🏪 Store Information</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Store Name</label>
          <input 
            className="input w-full" 
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Phone</label>
          <input 
            className="input w-full" 
            value={form.phone}
            onChange={e => setForm({...form, phone: e.target.value})}
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm text-neutral-400 mb-1">Address</label>
          <textarea 
            className="input w-full" 
            rows="3"
            value={form.address}
            onChange={e => setForm({...form, address: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Tax ID</label>
          <input 
            className="input w-full" 
            value={form.taxId}
            onChange={e => setForm({...form, taxId: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Email</label>
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

// Users Management Tab
function UsersTab() {
  const { users, addUser, removeUser, updateUser } = usePOSStore()
  const [showAdd, setShowAdd] = useState(false)
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-oxy-gold">👤 Users & Permissions</h3>
        <button className="btn-gold" onClick={() => setShowAdd(true)}>+ Add User</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-neutral-400 border-b border-neutral-800">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Role</th>
              <th className="text-left p-3">Pin Code</th>
              <th className="text-left p-3">Status</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-b border-neutral-800 hover:bg-neutral-900/50">
                <td className="p-3">{u.name}</td>
                <td className="p-3">
                  <select 
                    className="input py-1 text-xs"
                    value={u.role}
                    onChange={e => updateUser(u.id, { role: e.target.value })}
                  >
                    <option>Cashier</option>
                    <option>Manager</option>
                    <option>Admin</option>
                  </select>
                </td>
                <td className="p-3">
                  <input 
                    className="input w-20 py-1 text-xs text-center"
                    maxLength="4"
                    value={u.pin}
                    onChange={e => updateUser(u.id, { pin: e.target.value })}
                  />
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${u.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {u.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button 
                    className="btn py-1 px-3 text-xs mr-2"
                    onClick={() => updateUser(u.id, { active: !u.active })}
                  >
                    {u.active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button 
                    className="btn py-1 px-3 text-xs text-red-400"
                    onClick={() => {
                      if (confirm(`Delete ${u.name}?`)) removeUser(u.id)
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {showAdd && <AddUserModal onClose={() => setShowAdd(false)} onAdd={addUser} />}
    </div>
  )
}

function AddUserModal({ onClose, onAdd }) {
  const [name, setName] = useState('')
  const [role, setRole] = useState('Cashier')
  const [pin, setPin] = useState('')
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="card p-6 w-full max-w-md">
        <h3 className="font-semibold text-lg mb-4">Add New User</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Full Name</label>
            <input 
              className="input w-full" 
              placeholder="John Doe"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Role</label>
            <select className="input w-full" value={role} onChange={e => setRole(e.target.value)}>
              <option>Cashier</option>
              <option>Manager</option>
              <option>Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">4-Digit PIN</label>
            <input 
              className="input w-full" 
              placeholder="1234"
              maxLength="4"
              value={pin}
              onChange={e => setPin(e.target.value.replace(/\D/g, ''))}
            />
          </div>
        </div>
        <div className="mt-6 flex gap-2 justify-end">
          <button className="btn" onClick={onClose}>Cancel</button>
          <button 
            className="btn-gold"
            onClick={() => {
              if (!name || !pin || pin.length !== 4) {
                alert('Please fill all fields correctly')
                return
              }
              onAdd({ name, role, pin, active: true })
              onClose()
            }}
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  )
}

// Categories Management Tab
function CategoriesTab() {
  const { categories, addCategory, removeCategory, updateCategory } = usePOSStore()
  const [newCat, setNewCat] = useState('')
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-oxy-gold">📋 Menu Categories</h3>
      
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
          <div key={cat.id} className="bg-neutral-900 border border-neutral-800 rounded-xl2 p-3 flex items-center justify-between group hover:border-oxy-gold/30 transition">
            <div>
              <input 
                className="bg-transparent border-none outline-none text-base font-medium"
                value={cat.name}
                onChange={e => updateCategory(cat.id, e.target.value)}
              />
              <div className="text-xs text-neutral-500 mt-1">
                {cat.itemCount || 0} items
              </div>
            </div>
            <button 
              className="btn py-1 px-3 text-xs text-red-400 opacity-0 group-hover:opacity-100 transition"
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
        <div className="text-center text-neutral-500 py-8">
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
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-oxy-gold">💰 Tax & Discount Settings</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-4">
          <h4 className="font-semibold mb-3">Tax Configuration</h4>
          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-2 text-sm">
                <input 
                  type="checkbox"
                  checked={form.vatEnabled}
                  onChange={e => setForm({...form, vatEnabled: e.target.checked})}
                  className="w-4 h-4"
                />
                <span>Enable VAT</span>
              </label>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">VAT Rate (%)</label>
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
              <label className="flex items-center gap-2 text-sm">
                <input 
                  type="checkbox"
                  checked={form.serviceChargeEnabled}
                  onChange={e => setForm({...form, serviceChargeEnabled: e.target.checked})}
                  className="w-4 h-4"
                />
                <span>Enable Service Charge</span>
              </label>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Service Charge (%)</label>
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
        
        <div className="card p-4">
          <h4 className="font-semibold mb-3">Quick Discounts</h4>
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
                  className="btn px-3 text-red-400"
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
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-oxy-gold">🧾 Receipt Customization</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Header Text</label>
            <textarea 
              className="input w-full" 
              rows="3"
              placeholder="Welcome to..."
              value={form.headerText}
              onChange={e => setForm({...form, headerText: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Footer Text</label>
            <textarea 
              className="input w-full" 
              rows="3"
              placeholder="Thank you..."
              value={form.footerText}
              onChange={e => setForm({...form, footerText: e.target.value})}
            />
          </div>
          
          <div>
            <label className="flex items-center gap-2 text-sm">
              <input 
                type="checkbox"
                checked={form.showLogo}
                onChange={e => setForm({...form, showLogo: e.target.checked})}
                className="w-4 h-4"
              />
              <span>Show Logo</span>
            </label>
          </div>
          
          <div>
            <label className="flex items-center gap-2 text-sm">
              <input 
                type="checkbox"
                checked={form.showQRCode}
                onChange={e => setForm({...form, showQRCode: e.target.checked})}
                className="w-4 h-4"
              />
              <span>Show QR Code for Payment</span>
            </label>
          </div>
        </div>
        
        <div className="card p-4 bg-white text-black">
          <div className="text-center space-y-2">
            {form.showLogo && <div className="text-4xl">🥩</div>}
            <div className="font-bold">OXYFINE Meat & More</div>
            <div className="text-xs">{form.headerText}</div>
            <div className="border-t border-gray-300 my-3"></div>
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
            <div className="border-t border-gray-300 my-3"></div>
            <div className="flex justify-between font-bold">
              <span>TOTAL</span>
              <span>฿1,628</span>
            </div>
            {form.showQRCode && (
              <div className="mt-3 p-2 bg-gray-100 rounded">
                <div className="text-xs">QR Code Here</div>
              </div>
            )}
            <div className="text-xs mt-3">{form.footerText}</div>
          </div>
        </div>
      </div>
      
      <button className="btn-gold" onClick={handleSave}>💾 Save Settings</button>
    </div>
  )
}