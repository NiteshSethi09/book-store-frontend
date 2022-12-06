import { Button, Card, CardGroup, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { cartActions, Item, orderCreated } from "../../redux/Cart/slice";
import { AppDispatch } from "../../redux/store";
import { Auth } from "../../redux/UserStore/slice";
import Counter from "../Counter";

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

  const handleOrder = async () => {
    if (!isUserLoggedIn) {
      return navigate("/login", { state: location.pathname });
    }

    const result = await dispatch(orderCreated());

    if (result.type === `${cartActions.orderCreated}/rejected`) {
      return alert(result.payload);
    }
    alert("Order created Successfully.");
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
