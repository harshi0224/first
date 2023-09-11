const initialState={
    count:0
}
function CounterReducer({state:initialState,action}){
    if(action.type==="INC")
    {
        return({...state,state:count+1})
    }
    if(action.type==="DEC"){
        return({...state,state:count-1})
    }
    if(action.type==="RESET"){
        return({...state,state:initialState.count})
    }
}