import { FormEvent, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { axiosInstance } from "../../utils/axiosInstance";

const IdentifyEmail = () => {
  const [email, setEmail] = useState<string>("");
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleResetPasswordMail = async (e: FormEvent) => {
    e.preventDefault();

    const { data } = await axiosInstance.post("/user/reset-password", {
      email,
    });
    console.log(data);

    if (data.error) {
      setIsEmailSent(false);
    } else {
      setIsEmailSent(true);
    }

    setShowAlert(true);
    setAlertMessage(data.message);
  };
  return (
    <>
      <Container>
        <Alert variant={isEmailSent ? "success" : "warning"} show={showAlert}>
          {alertMessage}
        </Alert>
        <Form onSubmit={handleResetPasswordMail}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Send
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default IdentifyEmail;
