import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import NotFoundImg from "../../assets/NotFound.svg";

const NotFound = () => {
  return (
    <>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card.Img
          src={NotFoundImg}
          style={{ width: "100%", maxWidth: "700px", margin: "2rem 0" }}
        />

        <p>Looks like you hit a wrong URL.</p>
      </Container>
    </>
  );
};

export default NotFound;
