import { axiosInstance } from "../../utils/axiosInstance";
import { Auth, User } from "../UserStore/slice";
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

const orderCreated = async () => {
  const allProducts: Cart = JSON.parse(localStorage.getItem("cart")!);
  const logedInUser: User = (JSON.parse(localStorage.getItem("user")!) as Auth)
    ?.user as User;

  const { data } = await axiosInstance.post("/user/place-order", {
    items: allProducts.items,
    user: {
      userId: logedInUser._id,
      name: logedInUser.name,
    },
  });
  console.log(data);

  if (data.error) {
    throw new Error(data.message);
  } else {
    return clearCart();
  }
};

const cartService = {
  addProduct,
  removeOrDeleteProduct,
  orderCreated,
  clearCart,
};

export default cartService;
