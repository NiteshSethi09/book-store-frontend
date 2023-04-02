import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Player } from "@lottiefiles/react-lottie-player";

import { axiosInstance } from "../../utils/axiosInstance";

const VerifyAccount = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    async function handle() {
      const { data } = await axiosInstance.post(
        `/user/verify-account/${token}`
      );
      setLoading(false);
      setError(data?.error);
      setMessage(data?.message);
    }
    handle();
  }, []);

  if (error || loading) {
    return (
      <Container>
        <h3 style={{ textAlign: "center", marginTop: "4rem" }}>{message}</h3>
      </Container>
    );
  }
  return (
    <>
      <Player
        style={{ width: "300px", height: "300px" }}
        speed={0.6}
        autoplay
        loop
        src={"https://assets8.lottiefiles.com/packages/lf20_eRt4aHeLmL.json"}
      />
      <h1 style={{ textAlign: "center" }}>Hey, You are verified now!</h1>
    </>
  );
};

export default VerifyAccount;
