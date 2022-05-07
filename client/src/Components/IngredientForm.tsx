import { Form } from "react-bootstrap"
import { Ingredient } from "../Interfaces/ingredient.interface"
interface IngredientFormInterface extends Ingredient{
    onSelection?: any
}

const IngredientForm = (prop:IngredientFormInterface)=>{
    const handleClick = (event:any)=>{
        prop.onSelection((prevState: number[])=>{
            let currentstate=[...prevState]
            if(event.target.checked)
                currentstate.push(prop.ingredient_id)
            else
                currentstate = currentstate.filter(item => {return item !== prop.ingredient_id} );
            return currentstate;
    });
        
    }
    return (
    <Form.Check key={prop.ingredient_id} type={'checkbox'} id={`check-type-${prop.ingredient_id}`} >
        <Form.Check.Input type={'checkbox'} defaultChecked={false} onClick={handleClick}/>
        <Form.Check.Label>{`${prop.name}: Rs ${prop.price}`}</Form.Check.Label>
    </Form.Check>
    )
}
export default IngredientForm