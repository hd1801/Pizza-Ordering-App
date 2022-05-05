import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";


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
      <Route path="/" element = {<>home</>}></Route>
      <Route path="/login" element = {<>login</>}></Route>
      <Route path="/cart" element = {<>cart</>}></Route>
      <Route path="/history" element = {<>history</>}></Route>
    </Routes>
    </>
  );
}

export default App;
