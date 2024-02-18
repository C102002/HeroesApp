import React from 'react'
import { Navbar } from '../../ui'
import { Route, Routes } from 'react-router-dom'
import { DCPage, HeroPage, MarvelPage, SearchPage } from '../pages'

export const HeroesRoutes = () => {
  return (
    <>
        <Navbar/>

        <div className='container'>
            <Routes>
                <Route path='marvel' element={<MarvelPage/>}/>
                <Route path='dc' element={<DCPage/>}/>
                <Route path='search' element={<SearchPage/>}/>
                {/* NT: Para poder tener la informacion sin importar el heroe */}
                <Route path='hero/:id' element={<HeroPage/>}/>
                <Route path='/*' element={<DCPage/>}/>

            </Routes>
        </div>
    </>
  )
}
