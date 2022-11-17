import { axiosInstance } from "../../utils/axiosInstance";
import { Cart, Item } from "./slice";

const addProduct: (id: string) => Promise<Item[]> = async (id: string) => {
  const allProducts: Cart = JSON.parse(localStorage.getItem("cart")!);
  let newQuantity: number = 1;

  const itemIndex: number = allProducts?.items?.findIndex(
    (item: Item) => item.product._id.toString() === id.toString()
  );

  if (itemIndex >= 0) {
    newQuantity = allProducts.items[itemIndex].quantity + 1;
    allProducts.items[itemIndex].quantity = newQuantity;
  } else {
    const { data } = await axiosInstance.post("/product/get-by-id", { id });

    if (data.error) {
      throw new Error(data.message);
    }
    allProducts.items.push({ product: data.data, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(allProducts));
  return allProducts.items;
};

const cartService = {
  addProduct,
};

export default cartService;
