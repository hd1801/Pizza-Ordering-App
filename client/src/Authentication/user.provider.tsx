import { useEffect, useState } from "react";
import { UserContext } from "./user.context";
export const UserContextProvider = (props:any)=>{
    const [loggedIn,setLoggedIn] = useState(false);
    const [userInfo,setUserInfo] = useState({});
    //initially there should be no token.
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            localStorage.removeItem('token');
        }
    },[]);

    return <UserContext.Provider value={{loggedIn,userInfo,setLoggedIn,setUserInfo}}>
        {props.children}
    </UserContext.Provider>
}
