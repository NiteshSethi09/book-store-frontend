import { FormEvent, useEffect, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { login } from "../../redux/UserStore/slice";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showWarning, setShowWarning] = useState<boolean>(false);
  // const auth = useSelector((state) => (state as any).user);

  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  useEffect(() => {
    setShowWarning(false);
  }, [email, password]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setShowWarning(false);

    await dispatch(login({ email, password }));

    const auth = JSON.parse(localStorage.getItem("user")!);

    if (!auth?.authenticated) {
      setShowWarning(true);
    }
    if (auth?.user?._id) {
      (window.location as any) = location?.state ?? "/";
    }
  };

  return (
    <Container>
      <Alert variant="warning" show={showWarning}>
        Unable to login. Please retry.
      </Alert>
      <Form onSubmit={handleSubmit}>
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
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
