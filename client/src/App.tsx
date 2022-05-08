import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";
import { Cart } from "./Components/Cart";
import { Home } from "./Components/Home";
import { History } from "./Components/History";
import { Login } from "./Components/Login";
import { UserContextProvider } from "./Authentication/user.provider";
import { Register } from "./Components/Register";
import ErrorHandler from "./Components/ErrorHandler"


function App() {
  const linkStyle = {
    margin:".25rem",
    textDecoration: "none",
    color:"#fff"
  }
  return (
    <UserContextProvider>
    <Navbar bg="danger" variant="dark" >
      <Container fluid={true} className="shadow">
        <Navbar.Brand>
        Pizza Ordering App
        </Navbar.Brand>
        <Nav className="justify-content-end">
         <Link style={linkStyle} to="/">Home</Link>
         <Link style={linkStyle} to="/login">Login</Link>
         <Link style={linkStyle} to="/cart">Cart</Link>
         <Link style={linkStyle} to="/history">History</Link>
        </Nav>    
      </Container>
    </Navbar>
    <Routes>
      <Route path="/" element = {<Home/>}></Route>
      <Route path="/login" element = {<Login/>}></Route>
      <Route path="/cart" element = {<Cart/>}></Route>
      <Route path="/history" element = {<History/>}></Route>
      <Route path="/register" element = {<Register/>}></Route>
      <Route path="/error" element = {<ErrorHandler/>}></Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
