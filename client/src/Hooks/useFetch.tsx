import {useReducer,useEffect} from "react"
import { initialState,fetchReducer } from "../Utils/FetchReducer";

const useFetch= (URL:string)=>{
    const [results,dispatch] = useReducer(fetchReducer,initialState);
    useEffect(() => {
        fetch(URL)
        .then(response => response.json())
        .then(data => {
            dispatch({type: "FETCH_SUCCESS", payload: data });
        })
        .catch(err => {dispatch({type: "FETCH_ERROR"});
        }
        )},[URL]);  
    return results;
}
export default useFetch;