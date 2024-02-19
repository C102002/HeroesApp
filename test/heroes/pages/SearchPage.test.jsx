import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, Navigate, useNavigate } from "react-router-dom"
import { SearchPage } from "../../../src/heroes/pages/SearchPage"

const mockedUsedNavigate=jest.fn();

jest.mock('react-router-dom',()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate:()=>mockedUsedNavigate
}))

describe('Pruebas en SearchPage', () => {
    //NT: Buena practica
    beforeEach(()=>jest.clearAllMocks());

    test('1. Debe de mostrarse correctamente con valores con defecto', () => {
        const {container}=render(
            <MemoryRouter>
                <SearchPage/>
            </MemoryRouter>
        )
        expect(container).toMatchSnapshot();
        //screen.debug();
    })
    test('2. Debe de mostrar a Batman y el input con el valor del queryString  ', () => {
        render(
            <MemoryRouter initialEntries={['search?q=batman']}>
                <SearchPage/>
            </MemoryRouter>
        )
        //NT: comprobar que el input tenga 'batman' del query parameter
        const input=screen.getByRole('textbox');
        expect(input.value).toBe('batman')

        const img=screen.getByRole('img');
        //NT: ./heroes/dc-batman.jpg este es el verdaderamente esperado pero lo manda a
        //http://localhost/heroes/dc-batman.jpg
        expect(img.src).toContain('dc-batman.jpg')
        const SearchSubcomponent=screen.getByLabelText('search')
        expect(SearchSubcomponent.style.display).toBe('none');
    })
    test('3. Debe de mostrar un error sino se encuentra el heroe', () => {
        render(
            <MemoryRouter initialEntries={['search?q=batman35']}>
                <SearchPage/>
            </MemoryRouter>
        )
        //NT: comprobar que el input tenga 'batman35' del query parameter
        const input=screen.getByRole('textbox');
        expect(input.value).toBe('batman35')

        const NoFoundSubcomponent=screen.getByLabelText('No found')
        expect(NoFoundSubcomponent.style.display).not.toEqual('none');

        //NT: espero que el componente de busqueda sea 
        const SearchSubcomponent=screen.getByLabelText('search')
        expect(SearchSubcomponent.style.display).toBe('none');
        //screen.debug()
    })

    test('4. Debe de llamar el navegate para la pantalla nueva', () => {
        
        render(
            <MemoryRouter initialEntries={['search']}>
                <SearchPage/>
            </MemoryRouter>
        )
        //NT: no detecta por el rol form asi que se hace un aria-label
        const form=screen.getByLabelText('form');
        const input=screen.getByRole('textbox');
        //Se cambia el input
        fireEvent.change(input,{target:{name:'searchText',value:'spiderman'}})
        fireEvent.submit(form);
        //Se espera que se usara el usenavigate
        expect(mockedUsedNavigate).toHaveBeenCalledWith("?q=spiderman")
    })
})