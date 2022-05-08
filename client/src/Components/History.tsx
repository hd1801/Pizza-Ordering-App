import { useContext, useState,useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Authentication/user.context";

export const History = ()=>{
    const [orders,setOrders]= useState([]);
    const userInfo:any = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(()=>{
        if(userInfo.loggedIn){
            const options = {
                method: 'GET',
                headers: {
                'Authorization': 'Bearer ' + userInfo.userInfo.token,
                'Content-Type': 'application/json',
                },
                };
                fetch(`http://localhost:3333/order/${userInfo.userInfo.user.user_id}`,options).then(res=>res.json()).then(data=>setOrders(data));
            }
            else{
                navigate('../error',{replace:true})
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    console.log(orders);
    const renderOrderDetails= ()=>{
        return orders.map((order:any)=>{
            return <Container key={order.order_id} className="m-4">
                <Card>
                <Container className="d-flex justify-content-around">
                        <Container>Item</Container>
                        <Container>Price</Container>
                        <Container>Date</Container>
                        </Container>
                    {order.orderItems.map(((items:any) =>{
                        return <Card key={items.id}>
                        <Container className="d-flex justify-content-around">
                        <Container>One {items.pizza.crust_size} Pizza  </Container>
                        <Container>Rs {items.pizza.price} </Container>
                        <Container>{items.updatedAt.slice(0,10)}</Container>
                        </Container>
                        </Card>
                    }))}
                </Card>
                </Container>
        })

    }
    return (
        <Container>
            {renderOrderDetails()}
        </Container>
        
        )
}