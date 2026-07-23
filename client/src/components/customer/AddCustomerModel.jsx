import React, { useState } from "react";
import { X } from "lucide-react";
import api from "../../../config/axios";
const AddCustomerModal = ({ open, setOpen }) => {
         const [loading, setLoading] = useState(false)
         const [message, setMessage] = useState('')
  const [form, setForm] = useState({ 
    fullname: '', 
    fathername: '', 
    email: '', 
    phone: '',
    city: '',
    notes:'',
    address:'',
    customertype:'',
    reference:'',
    cnic:'',
  })
  if (!open) return null;
 

    const handleChange = (e) => {
    const { name, value } = e.target;
    
    // 1. Update the form values instantly
    setForm(prev => ({ ...prev, [name]: value }));
    

  }

    const handleAddCustomerform = async (e) => {
    e.preventDefault()
    setLoading(true) 
      try {
      const res = await api.post('/customer/addcustomer', form)
      if (res?.data?.success) {
        setMessage(res?.data?.message || 'Customer Added')
      }
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Something went wrong, try again.')
    } finally {
      setLoading(false) 
    }
  } 

  return (
    <div className="
fixed inset-0 bg-black/50 overflow-y-auto
">

      <div className="max-w-4xl mx-auto my-10 bg-white rounded-2xl p-6">

        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-1">

          <h2 className="text-xl font-semibold">
            Add New Customer
          </h2>

          <button onClick={() => setOpen(false)}>
            <X />
          </button>

        </div>

        {/* Body */}

        <div className="p-6">

          <form   id="customerForm" className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleAddCustomerform}>
            <div>
              <label>Name</label>
              <input
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1"
                placeholder="Customer Name"
              />
            </div>

            <div>
              <label>Father Name</label>
              <input
              name="fathername"

               onChange={handleChange}
              value={form.fathername}
                className="w-full border rounded-lg p-2 mt-1"
                placeholder="Father Name"
              />
            </div>

            <div>
              <label>Phone</label>
              <input
              name="phone"

              value={form.phone}
               onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1"
                placeholder="03XXXXXXXXX"
              />
            </div>

            <div>
              <label>CNIC</label>
              <input
              name="cnic"

               onChange={handleChange}
              value={form.cnic}
                className="w-full border rounded-lg p-2 mt-1"
                placeholder="XXXXX-XXXXXXX-X"
              />
            </div>
 <div>
              <label>Email</label>
              <input
              name="email"

               onChange={handleChange}
              value={form.email}
                className="w-full border rounded-lg p-2 mt-1"
                placeholder="Email"
              />
            </div>

            <div>
              <label>Customer Type</label>

              <select name="customertype" className="w-full border rounded-lg p-2 mt-1" value={form.customertype}  onChange={handleChange}>
                <option value="">Select Type</option>
<option value="Buyer">Buyer</option>
<option value="Seller">Seller</option>
<option value="Both">Both</option>
              </select>

             
            </div>

            <div>
              <label>City</label>
              <input
              name="city"

               onChange={handleChange}
              value={form.city}
                className="w-full border rounded-lg p-2 mt-1"
                placeholder="City"
              />
            </div>

            <div>
              <label>Address</label>
              <input
              name="address"

               onChange={handleChange}
              value={form.address}
                className="w-full border rounded-lg p-2 mt-1"
                placeholder="Address"
              />
            </div>

        


          <div className="mt-5">
            <label>Notes</label>

            <textarea
              name="notes"

             onChange={handleChange}
            value={form.notes}
              rows={4}
              className="w-full border rounded-lg p-2 mt-1"
            ></textarea>
          </div>

           {message && (
        <p className={`mt-2 text-sm font-medium ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
)}
  </form>
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t px-6 py-4">

          <button
            onClick={() => setOpen(false)}
            className="border px-5 py-2 rounded-lg"
          >
            Cancel
          </button>
{/* 
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Save Customer
          </button> */}

               <button
      type='submit'
       form="customerForm"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg "
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Save Customer"
          )}
        </button>

        </div>

      </div>

    </div>
  );
};

export default AddCustomerModal;