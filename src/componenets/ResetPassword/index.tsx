import { FormEvent, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInstance";

const ResetPassword = () => {
  const [password, setPassword] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const { token } = useParams();
  const navigate = useNavigate();

  const handlePasswordReset = async (e: FormEvent) => {
    e.preventDefault();

    const { data } = await axiosInstance.post(`/user/reset-password/${token}`, {
      password,
    });

    if (data.error) {
      setShowAlert(true);
      setAlertMessage(data.message);
    } else {
      setPassword("");
      navigate("/login", {
        state: {
          showAlert: true,
          message: data.message,
        },
      });
    }
  };

  return (
    <>
      <Container>
        <Alert variant="warning" show={showAlert}>
          {alertMessage}
        </Alert>
        <Form onSubmit={handlePasswordReset}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Reset Password
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default ResetPassword;
