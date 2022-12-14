import { FormEvent, useEffect, useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInstance";

function Signup() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [responseError, setResponseError] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    setResponseError(false);
  }, [email, password, confirmPassword]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setResponseError(true);
      setResponseMessage("Make sure both passwords match.");
      return;
    }
    const { data } = await axiosInstance.post("/user/signup", {
      name,
      email,
      password,
    });
    console.log(data);
    setResponseError(data.error);
    setResponseMessage(data.message);

    if (!data.error) {
      navigate("/login", {
        state: {
          showAlert: true,
          message: data.message,
        },
      });
    }
  };

  return (
    <Container>
      <Alert variant="warning" show={responseError}>
        {responseMessage}
      </Alert>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            defaultValue={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Card.Link
          href={undefined}
          style={{ display: "block", marginBottom: "1rem", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Already have account?
        </Card.Link>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Signup;
