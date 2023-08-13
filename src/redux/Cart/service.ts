import { getProductByIdAPI } from "@/api/product";
import type { Cart, Item } from "./slice";

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
    const data = await getProductByIdAPI(id);

    if (data.error) {
      throw new Error(data.message);
    }
    allProducts.items.push({ product: data.data, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(allProducts));
  return allProducts.items;
};

const removeOrDeleteProduct = (id: string) => {
  const allProducts: Cart = JSON.parse(localStorage.getItem("cart")!);
  const itemIndex: number = allProducts?.items?.findIndex(
    (item) => item.product._id.toString() === id.toString()
  );

  const productQuantity = allProducts.items[itemIndex].quantity;
  if (productQuantity > 1) {
    allProducts.items[itemIndex].quantity = productQuantity - 1;
  } else {
    const newItems = allProducts.items.filter(
      (item) => item.product._id !== id
    );
    allProducts.items = newItems;
  }

  localStorage.setItem("cart", JSON.stringify(allProducts));
  return allProducts.items;
};

const clearCart = () => {
  const allProducts: Cart = JSON.parse(localStorage.getItem("cart")!);

  allProducts.items = [];
  localStorage.setItem("cart", JSON.stringify(allProducts));
  return allProducts.items;
};

const cartService = {
  addProduct,
  removeOrDeleteProduct,
  clearCart,
};

export default cartService;
