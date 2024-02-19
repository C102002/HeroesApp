import { getAllByText, getByLabelText, getByText, render, screen } from "@testing-library/react"
import { AppRouter } from "../../src/router/AppRouter"
import { MemoryRouter } from "react-router-dom"
import { AuthContext } from "../../src/auth"

describe('Pruebas en AppRouter', () => {
    test('1. Debe de mostrar el login sino esta autenticado', () => {
        const contexValue={
            logged:false
        }
        {/* Error en el query string ponerlo en esta version para que funcione npm install query-string@7.1.1
 */}
        render(
            <MemoryRouter initialEntries={['/dc']}>
                <AuthContext.Provider value={contexValue}>
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>
        )
        //Nt: debe haber 2
        expect(screen.getAllByText('Login').length).toBeGreaterThan(0)
    })

    test('2. Debe mostrar el componente de dc si esta autenticado', () => {
        const contexValue={
            logged:true,
            user:{
                id:'ABC',
                name:'Alfredo Fung'
            }
        }
        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contexValue}>
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>
        )
        //screen.debug()
        expect(screen.getAllByText('DCPage').length).toBeGreaterThan(0)
    })
})