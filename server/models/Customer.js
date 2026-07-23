import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      // required: true,
      trim: true,
    },

    fatherName: {
      type: String,
      trim: true,
    },

    cnic: {
      type: String,
      // required: true,
      unique: true,
      trim: true,
    },

    phone: {
      type: String,
      // required: true,
      trim: true,
    },

    city: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    reference: {
      type: String,
      trim: true,
    },

    notes: {
      type: String,
      trim: true,
    },

    customerType: {
      type: String,
      enum: ["Buyer", "Seller", "Both"],
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;