export const initialState=  {
    loading: true,
    items: [],
    error: null
  }
  export interface Action{
      type: string,
      payload?: any
  }
  export const fetchReducer = (currentState:object , action:Action)=>{
      switch(action.type){
        case "FETCH_SUCCESS": return { loading: false , items: action.payload, error:""}
        case "FETCH_ERROR": return { loading: false,items: [] ,error:"OOPS!! , Something Went Wrong."}
        default: return currentState
      }
    }