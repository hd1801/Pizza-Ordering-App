import { useContext, useState } from "react";
import { Form,Card, FloatingLabel, Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Authentication/user.context";
import useFetch from "../Hooks/useFetch";
import { Ingredient } from "../Interfaces/ingredient.interface";
import IngredientForm from "./IngredientForm";

export const Home  = ()=>{
    const navigate = useNavigate()
    const userInfo:any = useContext(UserContext);
    const [crustSize,setCrustSize] = useState('small');
    const [selectedIngredients,selectIngredients] = useState([]);
    const ingredients:any= useFetch('http://localhost:3333/pizza/ingredients');
    console.log(userInfo);
    const handleSelect= (event:any)=>{
        setCrustSize(event.target.value);
    }
    const handleClick = async (event:any)=>{
        event.preventDefault();
        const body = {
            crust_size:crustSize,
            ingredient_id: selectedIngredients
        }
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            };
       const res = await fetch('http://localhost:3333/pizza/',options)
       const pizza = await res.json()
       await fetch(`http://localhost:3333/pizza/${pizza.pizza_id}/ingredients`,options)

       //this part is contains complex calls to add each pizza in the cart 
       if(userInfo.loggedIn){
           //if cart already exist we will get cart info.
                const cart = await fetch(`http://localhost:3333/cart`,{...options,body:JSON.stringify({
                    user_id: userInfo.userInfo.user.user_id
                })})
                const cartinfo:any = await cart.json()
                const cartbody = {
                    cart_id:cartinfo.cart_id,
                    pizza_id: pizza.pizza_id
                }
                const cartoptions = {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(cartbody),
                    };

                fetch(`http://localhost:3333/cart/${cartinfo.cart_id}`,cartoptions).then(res=>res.json())
                localStorage.setItem('cart_id',cartinfo.cart_id);    
                navigate('../cart',{state:pizza});
            }
        else{
            navigate('Login');
        }

    } 
    const renderIngredients = (ingredients:any)=>{
        if(ingredients.error){
            return "Something went wrong cant get ingredients."
        }
        else {
            return ( ingredients.items.map((ingredient:Ingredient) => {
            return <IngredientForm key={ingredient.ingredient_id} {...ingredient} onSelection={selectIngredients}/>
            }))
        }
    }

    return <>
    <Card className="m-5 p-3 " >
        <Form>
        <FloatingLabel controlId="floatingSelect" label="Select Crust Size">
            <Form.Select value={crustSize} onChange={handleSelect}>
            <option>small </option>
            <option>medium </option>
            <option>large </option>
            </Form.Select>
        </FloatingLabel> 
        <h3 className="m-2"> Select Toppings </h3>
        <div className="m-3">
        {renderIngredients(ingredients)}
        </div>
        <Container className= "d-flex justify-content-center"> 
            <Button variant="danger" style={{fontWeight:"600"}} onClick={handleClick}>Add To Cart</Button>
        </Container>
        </Form>
    </Card>
    </>
}
