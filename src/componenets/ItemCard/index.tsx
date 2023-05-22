import { memo } from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/Cart/slice";
import { AppDispatch } from "../../redux/store";

export interface cardProps {
  _id: string;
  imageUrl: string;
  title: string;
  category: string;
  description: string;
  onSale: false;
  price: { originalPrice: number; offerPrice: number };
}

function ItemCard({ description, imageUrl, price, title, _id }: cardProps) {
  const splitDescription = description.split(" ");
  if (splitDescription.length > 25) {
    description = splitDescription.slice(0, 25).join(" ") + " ...";
  } else {
    description = splitDescription.join(" ");
  }
  const dispatch = useDispatch<AppDispatch>();

  const handleAdd = (id: string) => {
    dispatch(addToCart(id));
  };

  return (
    <Card
      style={{ marginBottom: "10px", alignItems: "stretch", display: "flex" }}
    >
      <Card.Img
        style={{ height: "300px" }}
        variant="top"
        src={imageUrl}
        alt="alternative text"
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {/* <Card.Text>{description}</Card.Text> */}
        <Card.Text>RS. {price.offerPrice}</Card.Text>
      </Card.Body>
      <Card.Body>
        <Button variant="primary" onClick={() => handleAdd(_id)}>
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default memo(ItemCard);
