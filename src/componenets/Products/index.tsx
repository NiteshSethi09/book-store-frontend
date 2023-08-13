import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ItemCard, { cardProps } from "../ItemCard";
import { getAllProductsAPI } from "@/api/product";

const Products = () => {
  const [products, setProducts] = useState<cardProps[]>([]);
  const [isloading, setIsloading] = useState<boolean>(true);

  useEffect(() => {
    async function getProducts() {
      const products = await getAllProductsAPI();
      setProducts(products.data);
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
