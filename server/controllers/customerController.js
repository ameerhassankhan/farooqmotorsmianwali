import Customer from "../models/Customer.js"; // apna model path check kar lena
import mongoose from "mongoose";

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;

  // invalid ObjectId ko crash hone se pehle hi rok do
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid customer id" });
  }

  try {
    const deleted = await Customer.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).json({
      message: "Customer deleted successfully",
      customer: deleted,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error while deleting customer" });
  }
};


export const fetchCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    return res.status(201).json({
      success: true,
      customers,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const addCustomer = async (req, res) => {
    try {
    const {
      fullname, fathername, email, phone, address, city, customertype, notes, reference, cnic,
    } = req.body;

    if (!fullname || !cnic) {
      return res.status(400).json({ success: false, message: "Fullname and CNIC are required" });
    }

    // 2. FIX: CNIC aur Email dono check karo
    const existingCustomer = await Customer.findOne({ 
      $or: [{ cnic }, { email }] 
    });

    if (existingCustomer) {
      if (existingCustomer.cnic === cnic) {
        return res.status(400).json({ success: false, message: "CNIC already exists" });
      }
      if (existingCustomer.email === email) {
        return res.status(400).json({ success: false, message: "Email already exists" });
      }
    }

    const customer = await Customer.create({
      fullname, fathername, email, phone, address, city, customertype, notes, reference, cnic,
    });

    return res.status(201).json({
      success: true,
      message: "Customer Added Successfully",
      customer,
    });

  } catch (err) {
    console.error(err);
    // 3. FIX: Mongoose duplicate key error handle
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).json({ success: false, message: `${field.toUpperCase()} already exists` });
    }
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updateCustomer = async (req, res) => {
  const { id } = req.params;
 
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid customer id" });
  }
 
  try {
    // Frontend "customertype" bhejta hai, model shayad "type" field use karta ho —
    // agar aisa hai to yahan map kar do (warna is line ko hata dena).
    const { customertype, ...rest } = req.body;
    const payload = customertype ? { ...rest, type: customertype } : rest;
 
    const updated = await Customer.findByIdAndUpdate(id, payload, {
      new: true, // updated document return karo, purana nahi
      runValidators: true, // schema validations dobara chalao
    });
 
    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }
 
    return res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      customer: updated,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Server error while updating customer" });
  }
};
 