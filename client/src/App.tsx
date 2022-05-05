import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";
import { Cart } from "./Components/Cart";
import { Home } from "./Components/Home";
import { History } from "./Components/History";
import { Login } from "./Components/Login";


function App() {
  const linkStyle = {
    textDecoration: "none",
    color:"#fff"
  }
  return (
    <>
    <Navbar bg="danger" variant="dark" >
      <Container fluid={true} className="shadow">
        <Navbar.Brand>
        Pizza Ordering App
        </Navbar.Brand>
        <Nav className="justify-content-end">
        <Nav.Link > <Link style={linkStyle} to="/login">Login</Link></Nav.Link>
        <Nav.Link > <Link style={linkStyle} to="/cart">Cart</Link></Nav.Link>
        <Nav.Link > <Link style={linkStyle} to="/history">History</Link></Nav.Link>
        </Nav>    
      </Container>
    </Navbar>
    <Routes>
      <Route path="/" element = {<Home/>}></Route>
      <Route path="/login" element = {<Login/>}></Route>
      <Route path="/cart" element = {<Cart/>}></Route>
      <Route path="/history" element = {<History/>}></Route>
    </Routes>
    </>
  );
}

export default App;
