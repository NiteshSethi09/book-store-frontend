import { Item } from "@/redux/Cart/slice";
import { axiosInstance } from "@/utils/axiosInstance";

export const createOrderAPI = async (
  items: Item[],
  user: { _id: string; name: string }
) => {
  const result = await axiosInstance.post("/razorpay/create-order", {
    items,
    user,
  });

  return result.data;
};
