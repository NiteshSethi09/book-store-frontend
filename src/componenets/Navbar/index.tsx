import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { logout } from "../../redux/UserStore/slice";

function NavbarTop() {
  const dispatch = useDispatch<AppDispatch>();
  const authenticated = useSelector(
    (state) => (state as any).user.authenticated
  );

  const handleLogout = () => {
    dispatch(logout());
    (window.location as any) = "/";
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">Book Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" style={{ justifyContent: "end" }}>
          <Nav
            className=" my-2 my-lg-0"
            style={{ maxHeight: "180px" }}
            navbarScroll
          >
            {/* <Nav.Link> */}
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              Home
            </Link>
            {/* </Nav.Link> */}
            {authenticated ? (
              <>
                <Nav.Link onClick={handleLogout}>logout</Nav.Link>
              </>
            ) : (
              <>
                {/* <Nav.Link> */}
                <Link
                  to="/login"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  login
                </Link>
                {/* </Nav.Link> */}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarTop;
