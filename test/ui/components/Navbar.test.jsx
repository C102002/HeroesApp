import { fireEvent, render, screen } from "@testing-library/react"
import { AuthContext } from "../../../src/auth"
import { MemoryRouter, useNavigate } from "react-router-dom"
import { Navbar } from "../../../src/ui"

const mockedUsedNavigate=jest.fn();

//Nt:Asi haces un mock permaneciendo el uso del memoryrouter y solo alternando el del useNavigate
jest.mock('react-router-dom',()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate:()=>mockedUsedNavigate
}))

describe('Pruebas en Navbar', () => {

    beforeEach(()=>jest.clearAllMocks());

    test('1. Aparezca el Nombre de la persona en el NavBar', () => {
        const initialState={
            logged:true,
            user:{
                id:'insecto',
                name:'Kakaroto'
            }
        }

        render(
        <MemoryRouter initialEntries={['/dc']}>
            <AuthContext.Provider value={initialState}>
                <Navbar/>
            </AuthContext.Provider>
        </MemoryRouter>
        )
        //screen.debug()
        expect(screen.getAllByText('Kakaroto')).toBeTruthy();
     })
    test('2. Cuando el usuario hace click en el Logout, se llama el logout y el navigate cuando de hace click', () => { 
        const logout=jest.fn()
        const initialState={
            logged:true,
            user:{
                id:'insecto',
                name:'Kakaroto'
            },
            logout:logout,
        }
        render(
        <MemoryRouter initialEntries={['/dc']}>
            <AuthContext.Provider value={initialState}>
                <Navbar/>
            </AuthContext.Provider>
        </MemoryRouter>
        )
        //screen.debug()
        const ButtonLogOut=screen.getByRole('button');
        fireEvent.click(ButtonLogOut);
        //Validamos que se llamo al logout
        expect(logout).toHaveBeenCalled()
        expect(mockedUsedNavigate).toHaveBeenCalledWith("/login", {"replace": true})
     })

})