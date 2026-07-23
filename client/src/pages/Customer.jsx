import React, { useEffect, useMemo, useState } from "react";
import { Search, Plus, Users, ChevronDown } from "lucide-react";

import AddCustomerModal from "../components/customer/AddCustomerModal";
import EditCustomerModal from "../components/customer/EditCustomerModal";
import CustomerTable from "../components/customer/CustomerTable";
import DeleteConfirmModal from "../components/customer/DeleteConfirmModel";
import { useCustomers } from './../hooks/useCustomers';

const CUSTOMER_TYPES = ["All", "Buyer", "Seller", "Both"];

function useDebouncedValue(value, delayMs = 250) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);
  return debounced;
}

const Customer = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const { customers, isLoading, error, fetchCustomers, deleteCustomer } =
    useCustomers();

  const debouncedSearch = useDebouncedValue(search);

  const filteredCustomers = useMemo(() => {
    const keyword = debouncedSearch.toLowerCase();
    return customers.filter((customer) => {
      const matchesSearch =
        customer.fullname?.toLowerCase().includes(keyword) ||
        customer.phone?.toLowerCase().includes(keyword) ||
        customer.cnic?.toLowerCase().includes(keyword) ||
        customer.address?.toLowerCase().includes(keyword);

      const matchesType =
        typeFilter === "All" ||
        customer.type?.toLowerCase() === typeFilter.toLowerCase();

      return matchesSearch && matchesType;
    });
  }, [customers, debouncedSearch, typeFilter]);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    setDeleteError(null);
    try {
      await deleteCustomer(deleteTarget._id);
      setDeleteTarget(null);
    } catch (err) {
      setDeleteError(
        err?.response?.data?.message || "Failed to delete customer."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
            <Users size={28} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
            <p className="text-gray-500">
              Total Customers :
              <span className="ml-2 font-semibold text-blue-600">
                {filteredCustomers.length}
              </span>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white shadow transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Customer
        </button>
      </div>

      {/* Search & Filter */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:w-96">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search customers"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              aria-label="Filter by customer type"
              className="appearance-none rounded-xl border border-gray-200 bg-white px-5 py-3 pr-10 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              {CUSTOMER_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t === "All" ? "All Customers" : t}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>
      </div>

      <CustomerTable
        customers={filteredCustomers}
        isLoading={isLoading}
        error={error}
        onRetry={fetchCustomers}
        onDeleteRequest={setDeleteTarget}
        onEditRequest={(customer) => {
          setEditTarget(customer);
          setEditOpen(true);
        }}
      />

      {deleteTarget && (
        <DeleteConfirmModal
          customer={deleteTarget}
          isDeleting={isDeleting}
          onCancel={() => {
            setDeleteTarget(null);
            setDeleteError(null);
          }}
          onConfirm={handleConfirmDelete}
        />
      )}

      {deleteError && (
        <p className="fixed bottom-4 right-4 z-50 rounded-lg bg-red-600 px-4 py-2 text-white shadow-lg">
          {deleteError}
        </p>
      )}

      <AddCustomerModal
        open={open}
        setOpen={setOpen}
        onCustomerAdded={fetchCustomers}
      />

      <EditCustomerModal
        open={editOpen}
        setOpen={setEditOpen}
        customer={editTarget}
        onCustomerUpdated={fetchCustomers}
      />
    </div>
  );
};

export default Customer;