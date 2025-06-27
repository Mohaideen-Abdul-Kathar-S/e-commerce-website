import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FaShoppingCart, FaWallet, FaUserCircle } from 'react-icons/fa';

function NavScrollExample() {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="py-3">
      <Container fluid>
        {/* Left - Brand */}
        <Navbar.Brand href="#" className="fw-bold fs-4">
          Arab Store
        </Navbar.Brand>

        {/* Toggle Button (Mobile) */}
        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll" className="justify-content-between">
          {/* Middle - Nav Links */}
          
          <Nav
            className="mx-auto my-2 my-lg-0 gap-3"
            navbarScroll
          >
            <Nav.Link href="/">All</Nav.Link>
            <Nav.Link href="#grocery">Grocery</Nav.Link>
            <Nav.Link href="#vegetables">Vegetables</Nav.Link>
            <Nav.Link href="#drinks">Cool Drinks</Nav.Link>
            <Nav.Link href="#snacks">Snacks</Nav.Link>
            <Nav.Link href="#stationaries">Stationaries</Nav.Link>
          </Nav>

          {/* Right - Icons */}
          <div className="d-flex justify-content-around align-items-center gap-5">

            <FaWallet size={30} className="text-white" title="Budget" />
            <FaShoppingCart size={30} className="text-white" title="Cart" />
            <FaUserCircle size={35} className="text-white" title="Profile" />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
