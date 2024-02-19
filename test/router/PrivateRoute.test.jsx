import { render, screen } from "@testing-library/react";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { AuthContext } from "../../src/auth";
import { MemoryRouter } from "react-router-dom";

describe('Pruebas en PrivateRoute', () => {
    test('1. Debe de mostrar el children si esta autenticado', () => {
        
        Storage.prototype.setItem=jest.fn();

        const contextValue={
            logged:true,
            user:{
                id:'abc',
                name:'Alfredo Fung'
            }
        }
        render(
        <AuthContext.Provider value={contextValue}>
            {/*Testing de router es memory router */}
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <PrivateRoute>
                    <h1>Ruta Privada</h1>
                </PrivateRoute>
            </MemoryRouter>
        </AuthContext.Provider>)


        expect(screen.getByText('Ruta Privada')).toBeTruthy();
        //NT: ver si se llamo al localStorage
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath','/search?q=batman');
    })
})