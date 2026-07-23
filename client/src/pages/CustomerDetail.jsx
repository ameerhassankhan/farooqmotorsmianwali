import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  AlertTriangle,
  User,
  Phone,
  Mail,
  MapPin,
  IdCard,
  Pencil,
} from "lucide-react";
import api from "../../config/axios";

const TYPE_STYLES = {
  Buyer: "bg-blue-100 text-blue-700",
  Seller: "bg-amber-100 text-amber-700",
  Both: "bg-purple-100 text-purple-700",
};

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3">
      <Icon size={18} className="mt-0.5 text-gray-400" />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          {label}
        </p>
        <p className="text-gray-800">{value || "—"}</p>
      </div>
    </div>
  );
}

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCustomer = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.get(`/customers/view/${id}`);
      setCustomer(res.data.customer);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Couldn't load customer details."
      );
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <Loader2 size={40} className="mb-3 animate-spin text-blue-400" />
        <p className="text-gray-500">Loading customer…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <AlertTriangle size={48} className="mb-4 text-red-300" />
        <h2 className="text-xl font-semibold text-gray-700">
          Couldn't load customer
        </h2>
        <p className="mt-2 text-gray-500">{error}</p>
        <button
          type="button"
          onClick={fetchCustomer}
          className="mt-4 rounded-xl bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={18} />
          Back to Customers
        </button>
      </div>

      {/* Profile card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-r from-blue-600 to-indigo-600 text-2xl font-bold text-white shadow">
            {customer.fullname?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {customer.fullname}
            </h1>
            <span
              className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                TYPE_STYLES[customer.type] || "bg-gray-100 text-gray-700"
              }`}
            >
              {customer.type}
            </span>
          </div>
        </div>
      </div>

      {/* Detail sections */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow">
          <h2 className="mb-2 text-lg font-semibold text-gray-800">
            Contact Info
          </h2>
          <div className="divide-y divide-gray-100">
            <InfoRow icon={Phone} label="Phone" value={customer.phone} />
            <InfoRow icon={Mail} label="Email" value={customer.email} />
            <InfoRow icon={MapPin} label="Address" value={customer.address} />
            <InfoRow icon={MapPin} label="City" value={customer.city} />
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow">
          <h2 className="mb-2 text-lg font-semibold text-gray-800">
            Identification
          </h2>
          <div className="divide-y divide-gray-100">
            <InfoRow icon={IdCard} label="CNIC" value={customer.cnic} />
            <InfoRow
              icon={User}
              label="Father Name"
              value={customer.fathername}
            />
            <InfoRow
              icon={User}
              label="Reference"
              value={customer.reference}
            />
          </div>
        </div>

        {customer.notes && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow md:col-span-2">
            <h2 className="mb-2 text-lg font-semibold text-gray-800">Notes</h2>
            <p className="whitespace-pre-wrap text-gray-600">
              {customer.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDetail;