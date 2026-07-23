import React from "react";
import { Eye, Pencil, Trash2, Users, AlertTriangle, Loader2 } from "lucide-react";

const TYPE_STYLES = {
  Buyer: "bg-blue-100 text-blue-700",
  Seller: "bg-amber-100 text-amber-700",
  Both: "bg-purple-100 text-purple-700",
};

function TypeBadge({ type }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        TYPE_STYLES[type] || "bg-gray-100 text-gray-700"
      }`}
    >
      {type}
    </span>
  );
}

function CustomerRow({ customer, index, onDeleteRequest, onEditRequest }) {
  return (
    <tr
      className={`transition hover:bg-blue-50 ${
        index % 2 === 0 ? "bg-white" : "bg-gray-50/40"
      }`}
    >
      <td className="px-4 py-5 text-center font-semibold text-gray-500">
        {index + 1}
      </td>

      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-r from-blue-600 to-indigo-600 font-bold text-white shadow">
            {customer.fullname?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{customer.fullname}</p>
            <p className="text-sm text-gray-500">{customer.phone}</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-5 text-gray-600">{customer.cnic}</td>

      <td className="max-w-xs px-6 py-5 text-gray-600">
        <p className="truncate">{customer.address}</p>
      </td>

      <td className="px-6 py-5 text-center">
        <TypeBadge type={customer.type} />
      </td>

      <td className="px-6 py-5">
        <div className="flex justify-center gap-2">
          <button
            type="button"
            aria-label={`View ${customer.fullname}`}
            title="View"
            className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-100"
          >
            <Eye size={18} />
          </button>

          <button
            type="button"
            aria-label={`Edit ${customer.fullname}`}
            title="Edit"
            onClick={() => onEditRequest(customer)}
            className="rounded-lg p-2 text-amber-600 transition hover:bg-amber-100"
          >
            <Pencil size={18} />
          </button>

          <button
            type="button"
            aria-label={`Delete ${customer.fullname}`}
            title="Delete"
            onClick={() => onDeleteRequest(customer)}
            className="rounded-lg p-2 text-red-600 transition hover:bg-red-100"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}

// Simple status rows — kept inline here instead of separate files since
// they're only ever used inside this table's <tbody>.
function StatusRow({ children }) {
  return (
    <tr>
      <td colSpan={6} className="py-20 text-center">
        {children}
      </td>
    </tr>
  );
}

export default function CustomerTable({
  customers,
  isLoading,
  error,
  onRetry,
  onDeleteRequest,
  onEditRequest,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-600">
              #
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
              Customer
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
              CNIC
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
              Address
            </th>
            <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-600">
              Type
            </th>
            <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-600">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {isLoading ? (
            <StatusRow>
              <Loader2 size={40} className="mx-auto mb-3 animate-spin text-blue-400" />
              <p className="text-gray-500">Loading customers…</p>
            </StatusRow>
          ) : error ? (
            <StatusRow>
              <AlertTriangle size={48} className="mx-auto mb-4 text-red-300" />
              <h2 className="text-xl font-semibold text-gray-700">
                Couldn't load customers
              </h2>
              <p className="mt-2 text-gray-500">{error}</p>
              <button
                type="button"
                onClick={onRetry}
                className="mt-4 rounded-xl bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
              >
                Retry
              </button>
            </StatusRow>
          ) : customers.length > 0 ? (
            customers.map((customer, index) => (
              <CustomerRow
                key={customer._id}
                customer={customer}
                index={index}
                onDeleteRequest={onDeleteRequest}
                onEditRequest={onEditRequest}
              />
            ))
          ) : (
            <StatusRow>
              <Users size={60} className="mx-auto mb-4 text-gray-300" />
              <h2 className="text-xl font-semibold text-gray-700">
                No Customers Found
              </h2>
              <p className="mt-2 text-gray-500">
                Click{" "}
                <span className="font-semibold text-blue-600">Add Customer</span>{" "}
                to create your first customer.
              </p>
            </StatusRow>
          )}
        </tbody>
      </table>
    </div>
  );
}