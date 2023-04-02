import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
const Login = lazy(() => import("./componenets/Login"));
const NavbarTop = lazy(() => import("./componenets/Navbar"));
const Products = lazy(() => import("./componenets/Products"));
const Cart = lazy(() => import("./componenets/Order"));
const IdentifyEmail = lazy(() => import("./componenets/IdentifyEmail"));
const Signup = lazy(() => import("./componenets/Signup"));
const NotFound = lazy(() => import("./componenets/NotFound"));
const ResetPassword = lazy(() => import("./componenets/ResetPassword"));
const VerifyAccount = lazy(() => import("./pages/VerifyAccount"));
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <NavbarTop />
      <Suspense fallback={"loading..."}>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/identify" element={<IdentifyEmail />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verify-account/:token" element={<VerifyAccount />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
