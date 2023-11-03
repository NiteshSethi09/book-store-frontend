import { memo } from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/Cart/slice";
import { AppDispatch } from "@/redux/store";

export interface cardProps {
  _id: string;
  imageUrl: string;
  title: string;
  category: string;
  description: string;
  onSale: false;
  price: { originalPrice: number; offerPrice: number };
}

function ItemCard({ imageUrl, price, title, _id }: cardProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleAdd = (id: string) => {
    dispatch(addToCart(id));
  };

  return (
    <Card style={{ marginBottom: "20px", height: "500px" }}>
      <Card.Img
        style={{ height: "300px" }}
        variant="top"
        src={imageUrl}
        alt="alternative text"
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>RS. {price.offerPrice}</Card.Text>
      </Card.Body>
      <Card.Body
        style={{
          paddingTop: 0,
          display: "flex",
          justifyContent: "end",
          alignItems: "end",
        }}
      >
        <Button variant="dark" onClick={() => handleAdd(_id)}>
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default memo(ItemCard);
