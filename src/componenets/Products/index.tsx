import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { axiosInstance } from "../../utils/axiosInstance";
import ItemCard, { cardProps } from "../ItemCard";

const Products = () => {
  const [products, setProducts] = useState<cardProps[]>([]);
  const [isloading, setIsloading] = useState<boolean>(true);

  useEffect(() => {
    async function getProducts() {
      const result = await axiosInstance.get("/product/get-products");
      setProducts(result.data.data);
      setIsloading(false);
    }

    getProducts();
  }, []);
  if (isloading) return <h2>Loading...</h2>;
  return (
    <>
      <Container>
        <Row md={5} xs={1}>
          {products?.map((product) => (
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
