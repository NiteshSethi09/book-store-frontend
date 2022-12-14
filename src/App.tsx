import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./componenets/Login";
import NavbarTop from "./componenets/Navbar";
import Products from "./componenets/Products";
import Cart from "./componenets/Order";
import "bootstrap/dist/css/bootstrap.min.css";
import IdentifyEmail from "./componenets/IdentifyEmail";
import Signup from "./componenets/Signup";
import NotFound from "./componenets/NotFound";
import ResetPassword from "./componenets/ResetPassword";

function App() {
  return (
    <>
      <NavbarTop />
      <Suspense>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/identify" element={<IdentifyEmail />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
