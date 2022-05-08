import { useContext, useState } from "react";
import { Form, Row, Col, Card, Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../Authentication/user.context";
import { LoginInterface } from "../Interfaces/login.interface";

export const Login  = ()=>{
    const userInfo: any = useContext(UserContext);

    const [formData,setFormData] = useState<LoginInterface>({
        email:"",
        password:""
    });

    const navigate = useNavigate();
    const handleChange = (event:any)=>{
        setFormData((prevState:LoginInterface)=>{
            return {...prevState, [event.target.name]: event.target.value}
        })
    }
    const loginUser= async (event:any)=>{
        event.preventDefault();
        const body = {
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
        const res = await fetch('http://localhost:3333/auth/login',options)
        const data =  await res.json();
        if(data){
            userInfo.setUserInfo(data);
            if('user' in userInfo.userInfo){
                userInfo.setLoggedIn(true);
                alert("Logged in");
            navigate('../',{replace:true});
            }
            else {
                alert('invalid credentials');
            }
            
        }
    }
    return <>
    <Card className="m-5 p-3 " >
    <Form>
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
    <Button variant="danger" style={{width:"10rem", fontWeight:"600"}} onClick={loginUser}>Login</Button>
    <Button variant="danger" style={{width:"10rem", fontWeight:"600"}} onClick= {()=>navigate('../register',{replace:true})}>Register</Button>
    </Container>
    </Form>
    </Card>
    </>
}