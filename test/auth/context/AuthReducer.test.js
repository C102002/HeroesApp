import { render } from "@testing-library/react"
import { authReducer,types } from "../../../src/auth"



describe('Pruebas en AuthReducer', () => {
    const initialSate={
        logged:false
    }

    test('1. Debe de retornar el estado por defecto', () => {

        const state=authReducer(initialSate,{})
        expect(state).toEqual(initialSate);
    })
    test('2. Debe de login llamar el login autenticar y establecer el user', () => {
        const action={
            type:types.login,
            payload:{
                name:'Pepe',
                id:123
            }
        }
        const state=authReducer(initialSate,action)
        expect(state).toEqual({
            logged:true,
            user:action.payload
        })
        //console.log(JSON.stringify(state))
    })

    test('3. Debe de logout borrar el name del usuario y logged en false', () => {
        const initialSate={
            logged:true,
            user:{
                id:123,
                name:'Pepe'
            }
        }

        const action={
            type:types.logout,
        }
        const state=authReducer(initialSate,action)
        expect(state).toEqual({
            logged:false,
        })
        //console.log(JSON.stringify(state))
    })
})