import { Search, Plus } from 'lucide-react'
import React, { useState } from 'react'
import AddCustomerModal from '../components/customer/AddCustomerModel';

const Customer = () => {
  const [open, setOpen] = useState(false);
  const customers = [
  {
    id: 1,
    name: "Ameer Hassan Khan",
    email: "hassanniazi329@gmail.com",
    cnic: "38302-9599611-7",
  },
  {
    id: 2,
    name: "Ali Khan",
    email: "ali@gmail.com",
    cnic: "61101-1234567-1",
  },
];
  return (
    
    <div>


<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

  {/* Search */}
  <div className="relative w-full md:w-80">
    <Search
      size={18}
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
    />
    <input
      type="text"
      placeholder="Search customer..."
      className="w-full border rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
    />
  </div>

  {/* Right Side */}
  <div className="flex gap-3">

    <select className="border rounded-lg px-4 py-2">
      <option>All Customers</option>
      <option>Buyer</option>
      <option>Seller</option>
      <option>Both</option>
    </select>

    <button
      onClick={() => setOpen(true)}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
    >
      <Plus size={18} />
      Add Customer
    </button>
    <AddCustomerModal
    open={open}
    setOpen={setOpen}
/>

  </div>
</div>
<div className="overflow-x-auto">
  <table className="w-full border border-gray-300 border-collapse">
    <thead>
      <tr className="bg-gray-100">
        <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
        <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
        <th className="border border-gray-300 px-4 py-2 text-left">CNIC No.</th>
      </tr>
    </thead>

<tbody>
  {customers.map((customer) => (
    <tr key={customer.id} className="hover:bg-gray-50">
      <td className="border border-gray-300 px-4 py-2">
        {customer.name}
      </td>
      <td className="border border-gray-300 px-4 py-2">
        {customer.email}
      </td>
      <td className="border border-gray-300 px-4 py-2">
        {customer.cnic}
      </td>
    </tr>
  ))}
</tbody>
  </table>
</div>
    </div>
  )
}

export default Customer
