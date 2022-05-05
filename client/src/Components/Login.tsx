import { Form, Row, Col, Card, Button, Container } from "react-bootstrap"

export const Login  = ()=>{
    return <>
    <Card className="m-5 p-3 " >
    <Form>
    <Form.Group as={Row} className="mb-3" controlId="formEmail">
        <Form.Label column sm={2}>
            Email
        </Form.Label>
        <Col sm={10}>
            <Form.Control type="email" placeholder="Email" />
        </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="formPassword">
        <Form.Label column sm={2}>
            Password
        </Form.Label>
        <Col sm={10}>
            <Form.Control type="password" placeholder="Password" />
        </Col>
    </Form.Group>
    <Container className= "d-flex justify-content-center"> 
    <Button variant="danger" style={{width:"10rem", fontWeight:"600"}} >Login</Button>
    </Container>
    
    </Form>
    </Card>
    
    </>
}