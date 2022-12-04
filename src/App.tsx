import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./componenets/Login";
import NavbarTop from "./componenets/Navbar";
import Products from "./componenets/Products";
import Cart from "./componenets/Order";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <NavbarTop />
      <Suspense>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
