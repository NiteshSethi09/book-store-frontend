import { Button, Card, CardGroup, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import useRazorpay from "react-razorpay";
import Counter from "../Counter";
import { clearCart, Item } from "../../redux/Cart/slice";
import { AppDispatch } from "../../redux/store";
import { Auth, User } from "../../redux/UserStore/slice";
import { axiosInstance } from "../../utils/axiosInstance";
import { razorpayKeyId } from "../../utils/config";

function CartItemCard({ product, quantity }: Item) {
  return (
    <CardGroup>
      <Card
        style={{
          marginBottom: "10px",
          maxWidth: "720px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Card.Img
          style={{ width: "120px" }}
          variant="top"
          src={product.imageUrl}
        />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Counter quantity={quantity} productId={product._id} />
        </Card.Body>
        {/* <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer> */}
      </Card>
    </CardGroup>
  );
}

const Cart = () => {
  const cartItems: Item[] = useSelector((state) => (state as any).cart.items);

  const isUserLoggedIn: boolean = (
    JSON.parse(localStorage.getItem("user")!) as Auth
  )?.authenticated;

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const Razorpay = useRazorpay();

  const handleOrder = async () => {
    if (!isUserLoggedIn) {
      return navigate("/login", { state: { redirectTo: location.pathname } });
    }

    await handlePayment();
  };

  const createOrder = async (items: Item[], user: User) => {
    const result = await axiosInstance.post("/razorpay/create-order", {
      items,
      user,
    });

    return result.data;
  };

  const handlePayment = async () => {
    const user = (JSON.parse(localStorage.getItem("user")!) as Auth)?.user;

    const order = await createOrder(cartItems, user!);

    if (order.error) {
      return alert(order.message);
    }

    const options = {
      key: razorpayKeyId,
      amount: order.data.amount,
      currency: order.data.currency,
      name: user!.name,
      image:
        "https://camo.githubusercontent.com/61e102d7c605ff91efedb9d7e47c1c4a07cef59d3e1da202fd74f4772122ca4e/68747470733a2f2f766974656a732e6465762f6c6f676f2e737667",
      order_id: order.data.id,
      handler: function (res: any) {
        console.log(res);
        dispatch(clearCart());
        alert("Yay! you make an order successfully.");
      },
      prefill: {
        name: user?.name,
        email: user?.email,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      <Container>
        <h2 style={{ marginBottom: "2rem" }}>Shopping Cart</h2>
        <Button
          onClick={() => handleOrder()}
          disabled={cartItems?.length > 0 ? false : true}
        >
          Order
        </Button>
        {cartItems?.map((cartItem: Item) => (
          <CartItemCard key={cartItem.product._id} {...cartItem} />
        ))}
      </Container>
    </>
  );
};

export default Cart;
