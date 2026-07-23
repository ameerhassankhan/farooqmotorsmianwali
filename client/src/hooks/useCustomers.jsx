import { useCallback, useEffect, useState } from "react";
import api from "../../config/axios";

export function useCustomers() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCustomers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.get("/customers/");
      setCustomers(res.data.customers || []);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Couldn't load customers. Try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

    const deleteCustomer = useCallback(async (id) => {
  // optimistic: pehle list se hata do, fail hone par wapas la do
  let previous;
  setCustomers((current) => {
    previous = current;
    return current.filter((c) => c._id !== id);
  });
  try {
    const res = await api.delete(`/customers/delete/${id}`);   
  } catch (err) {
    setCustomers(previous);   // rollback
    throw err;
  }
}, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return { customers, isLoading, error, fetchCustomers, deleteCustomer };
}