import { FormEvent, useEffect, useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AppDispatch } from "@/redux/store";
import { login } from "@/redux/UserStore/slice";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [showAlert, setshowAlert] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setshowAlert(location.state?.showAlert ?? false);
  }, []);

  useEffect(() => {
    setShowWarning(false);
  }, [email, password]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setShowWarning(false);
    setshowAlert(false);

    await dispatch(login({ email, password }));

    const auth = JSON.parse(localStorage.getItem("user")!);

    if (!auth?.authenticated) {
      setShowWarning(true);
    }
    if (auth?.user?.accessToken) {
      (window.location as any) = location?.state?.redirectTo ?? "/";
    }
  };

  return (
    <Container>
      <Alert
        variant={showWarning ? "warning" : "success"}
        show={showAlert || showWarning}
      >
        {!showWarning
          ? location.state?.message
          : "Unable to login. Please retry."}
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
        <Card.Link
          href={undefined}
          style={{ display: "block", marginBottom: "1rem", cursor: "pointer" }}
          onClick={() => navigate("/login/identify")}
        >
          Forgotten Password?
        </Card.Link>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
