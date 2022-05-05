import { Form,Card, FloatingLabel, Button, Container } from "react-bootstrap"

export const Home  = ()=>{
    const toppings = ["Topping A", "Topping B"];
    return <>
    <Card className="m-5 p-3 " >
        <Form>
        <FloatingLabel controlId="floatingSelect" label="Select Crust Size">
            <Form.Select >
            <option>Small </option>
            <option>Medium </option>
            <option>Large </option>
            </Form.Select>
        </FloatingLabel> 
        <h3 className="m-2"> Select Toppings </h3>
        <div className="m-3">
        {toppings.map((topping=>{
            return <Form.Check type={'checkbox'} id={`check-type`}>
            <Form.Check.Input type={'checkbox'} isValid />
            <Form.Check.Label>{topping}</Form.Check.Label>
            </Form.Check>
        }))}
        </div>
        <Container className= "d-flex justify-content-center"> 
            <Button variant="danger" style={{fontWeight:"600"}} >Add To Cart</Button>
        </Container>
        </Form>
    </Card>
    
    
    </>
}
