import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HeroesRoutes, } from '../heroes'
import { LoginPage } from '../auth'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = () => {
  return (
    <>
        <Routes>
            {/* Otra forma
            <Route path='login'  element={
              <PublicRoute>
                <LoginPage/>
              </PublicRoute>
            }/> */}

            {/* Los que terminen en el path login y los que empiecen en este son los que van aca*/}
            <Route path='login/*' element={
              <PublicRoute>
                <Routes>
                  <Route path='/*' element={<LoginPage/>}/>
                </Routes>
              </PublicRoute>
            }/>
            {/* //Todas las rutas que no son el login van al HeroesRoutes y estan protegidas */}
              <Route path='/*' element={<PrivateRoute>
                <HeroesRoutes/>
              </PrivateRoute>}
            />
            {/* // <Route path='/*' element={<HeroesRoutes/>}/> */}
        </Routes>
    </>
  )
}
