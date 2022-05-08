import { useContext, useEffect} from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Authentication/user.context";
import useFetch from "../Hooks/useFetch";
export const Cart = ()=>{
    const navigate = useNavigate()
    const userInfo:any = useContext(UserContext);
    const urlroute = userInfo.loggedIn?('user' in userInfo.userInfo && userInfo.userInfo.user.user_id):'';
    const url = `http://localhost:3333/cart/user/${urlroute}`
    let totalCost = 0;
    useEffect(()=>{
        if(userInfo.loggedIn === false)
        navigate('../error',{replace:true});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
        
    const cartData:any = useFetch(url);

    const onPurchase= async ()=>{
        console.log("purchased")
        const orders = cartData.items.CartItems.map((item:any)=>item.pizza.pizza_id);
        console.log(orders);
        console.log(userInfo.userInfo.user);
        console.log(userInfo.userInfo.token)
        const body = {
            user_id: userInfo.userInfo.user.user_id,
            username: userInfo.userInfo.user.email,
            email: userInfo.userInfo.user.email,
            pizza_id:orders
        }
        console.log(orders);
        const options = {
            method: 'POST',
            headers: {
            'Authorization': 'Bearer ' + userInfo.userInfo.token,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            };
        const res = await fetch('http://localhost:3333/order/',options)
        const data:any = await res.json();
        await fetch(`http://localhost:3333/order/${data.order_id}/items`,options)
        await fetch(`http://localhost:3333/cart/${cartData.items.cart_id}`,{method:'DELETE'});
        await alert("pizza ordered!");
        navigate('../history',{replace: true});
    }   

    const removePizza = async (id:number)=>{
        console.log('removing',id);
        await fetch(`http://localhost:3333/cart/item/${id}`,{method:'DELETE'})
        await navigate('../',{replace:true});
    }

    return(
    <Card className="m-3 p-2 shadow-sm ">
    {cartData.items.CartItems
    ? cartData.items.CartItems.map((item:any,index:number)=>{
        totalCost = totalCost + item.pizza.price;
        return (
        <Container key={item.pizza_id} className="m-2 d-flex justify-content-between">
         {"->"} {item.pizza.crust_size} Pizza, cost: Rs {item.pizza.price} <Button variant="outline-danger" size="sm" onClick={()=>{removePizza(item.id)}}>remove</Button>
        </Container>
        )
    })
    : "cant get items."
    }
    {cartData.items.CartItems 
    ? <>Total Cost: Rs{totalCost}
     <Container className= "d-flex justify-content-center"> 
     <Button style={{width:"10rem", fontWeight:"600"}} variant="danger" onClick={onPurchase}>Purchase</Button>
     </Container></>
     : null }
    </Card>
    )   
}