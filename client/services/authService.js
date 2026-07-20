import api from "../config/axios";

export const testConnection = async () => {
  const res = await api.get("/");
  return res.data;
}; 