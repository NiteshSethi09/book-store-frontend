import { axiosInstance } from "@/utils/axiosInstance";

export const getAllProductsAPI = async () => {
  const result = await axiosInstance.get("/product/get-products");

  return result.data;
};

export const getProductByIdAPI = async (id: string) => {
  const result = await axiosInstance.post("/product/get-by-id", { id });

  return result.data;
};
