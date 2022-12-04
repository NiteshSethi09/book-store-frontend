import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { axiosInstance } from "../../utils/axiosInstance";
import ItemCard, { cardProps } from "../ItemCard";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const result = await axiosInstance.get("/product/get-products");
      setProducts(result.data);
    }

    getProducts();
  }, []);
  return (
    <>
      <Container>
        <Row md={5} xs={1}>
          {products?.map((product: cardProps) => (
            <Col key={product._id}>
              <ItemCard {...product} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Products;
