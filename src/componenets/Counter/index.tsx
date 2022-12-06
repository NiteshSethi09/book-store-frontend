import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/Cart/slice";
import { AppDispatch } from "../../redux/store";

interface CounterProps {
  quantity: number;
  productId: string;
}

const Counter = ({ quantity, productId }: CounterProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAdd = (id: string) => {
    dispatch(addToCart(id));
  };

  const handleDelete = (id: string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <div style={{ display: "inline-block" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "110px",
          }}
        >
          <Button
            variant="outline-primary"
            onClick={() => handleDelete(productId)}
          >
            -
          </Button>
          <Form.Control
            type="text"
            value={quantity}
            style={{ textAlign: "center" }}
            readOnly
          />
          <Button
            variant="outline-primary"
            onClick={() => handleAdd(productId)}
            disabled={quantity !== 5 ? false : true}
          >
            +
          </Button>
        </div>
      </div>
    </>
  );
};

export default Counter;
