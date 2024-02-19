import { render, screen } from "@testing-library/react"
import { PublicRoute } from "../../src/router/PublicRoute"
import { AuthContext } from "../../src/auth"
import { MemoryRouter, Route, Routes } from "react-router-dom"

describe('Pruebas en PublicRoute', () => {
    test('1. Debe de mostrar el children sino esta autenticado', () => {
        const contextValue={
            logged:false
        }
        //NT: Recuerda que el public rote funciona bajo un contexto sino este no funciona
        render(
        <AuthContext.Provider value={contextValue}>
            <PublicRoute>
                <h1>Ruta Publica</h1>
            </PublicRoute>
        </AuthContext.Provider>)
        expect(screen.getByText('Ruta Publica')).toBeTruthy();
    })

    test('2. Debe de mostrar el navigate si esta autenticado', () => {
        const contextValue={
            logged:true,
            user:{
                name:'goku',
                id:123
            }
        }
        render(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path="login" element={
                        <PublicRoute>
                            <h1>Ruta Publica</h1>
                        </PublicRoute>
                    }/>
                    {/* OJO: Tiene que ser el defult page de la pagina */}
                    <Route path='dc' element={<h1>Pagina de Dc</h1>}/>
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
        )
        expect(screen.getByText('Pagina de Dc')).toBeTruthy();
    })
})