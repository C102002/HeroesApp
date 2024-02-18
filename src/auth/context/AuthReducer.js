import { types } from "../types/types";

export const authReducer=(state, action)=>{
    switch (action.type){
        
        case types.login:
            return {
                //Nt: para conservar el estado de la aplicacion
                ...state,
                logged: true,
                user: action.payload
            };
        
        case types.logout:
            return {
                ...state,
                logged: false,
                user: action.payload
            };
        
        default:
            return state;
    }
}