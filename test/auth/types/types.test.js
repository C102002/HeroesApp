import { types } from "../../../src/auth/types/types"

describe('Pruebas en Types', () => {
    test('1. Prueba en el type para todos los types de la aplicacion', () => {
        expect(types).toEqual({
            login:'[Auth] Login',
            logout:'[Auth] Logout',
        });
    })
})