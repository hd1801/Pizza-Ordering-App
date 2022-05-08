import { useState } from "react";
import { Form, Row, Col, Card, Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { RegisterInterface } from "../Interfaces/register.interface";

export const Register  = ()=>{
    const navigate = useNavigate()
    const [formData,setFormData] = useState<RegisterInterface>({
        name:"",
        email:"",
        password:""
    });
    
    
    const handleChange = (event:any)=>{
        setFormData((prevState:RegisterInterface)=>{
            return {...prevState, [event.target.name]: event.target.value}
        })
    }
    const RegisterUser= async(event:any)=>{
        event.preventDefault();
        const body = {
            name:formData.name,
            email:formData.email,
            username:formData.email,
            password:formData.password
        }
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            };
        const res = await fetch('http://localhost:3333/auth/signin',options)
        const data =  await res.json();
        alert("registration complete. login to continue");
        navigate('../login',{replace:true});
        console.log(data)
    }
    return <>
    <Card className="m-5 p-3 " >
    <Form>
    <Form.Group as={Row} className="mb-3" controlId="formName">
        <Form.Label column sm={2}>
            Name
        </Form.Label>
        <Col sm={10}>
            <Form.Control type="input" name="name" placeholder="Name" onChange={handleChange} value={formData.name} />
        </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="formEmail">
        <Form.Label column sm={2}>
            Email
        </Form.Label>
        <Col sm={10}>
            <Form.Control type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
        </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3"  controlId="formPassword" >
        <Form.Label column sm={2}>
            Password
        </Form.Label>
        <Col sm={10}>
            <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} value={formData.password}/>
        </Col>
    </Form.Group>
    <Container className= "d-flex justify-content-evenly"> 
    <Button variant="danger" style={{width:"10rem", fontWeight:"600"}} onClick={RegisterUser}>Register</Button>
    </Container>   
    </Form>
    </Card>
    
    </>
}