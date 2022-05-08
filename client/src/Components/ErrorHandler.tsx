import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ErrorHandler = ()=>{
  const navigate = useNavigate();
  const handleClick=()=>{
    navigate('../',{replace: true})
  }
  return <Container className="m-5">
      There seems to be a error: try logging in before you access this page.
      <Button variant="danger" onClick={handleClick}> Go Back </Button>
  </Container>
}

export default ErrorHandler;