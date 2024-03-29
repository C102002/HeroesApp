import React from 'react'
import { HeroCard } from '../components'
import { useForm } from '../../hooks/useForm'
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import {getHeroByName} from '../helpers'

export const SearchPage = () => {
  
  const navigate=useNavigate();
  const location=useLocation();

  const query=queryString.parse(location.search)
  //NT mandar la query q siempre en vacio sino esta
  const {q=''}=query

  const heroes=getHeroByName(q)

  //NT: show search si hay query
  const showSearch=(q.length===0);
  const showError=(q.length>0)&& heroes.length===0;


  //NT: searchText es la estructura del form
  const {searchText,onInputChange}=useForm({
    searchText:q //'' antes pero para que se mantenga la busqueda 'q'
  })

  const onSearchSubmit=(event)=>{
    event.preventDefault();
    if(searchText.trim().length<=1) return;
    //console.log(searchText)
    //Nt: navegacion con el query parameters
    navigate(`?q=${searchText.toLowerCase().trim()}`)
    //console.log(location)
  }

  return (
    <>
        <h1>SearchPage</h1>
        <hr/>
        <div className='row'>
          <div  className='col-5'>
            <h4>Searching</h4>
            <hr/>
            <form onSubmit={onSearchSubmit}
                  aria-label='form'>
              <input
                type='text'
                placeholder='Search a hero'
                className='form-control'
                name='searchText'
                autoComplete='off'
                value={searchText}
                onChange={onInputChange}
              />
              <button className='btn btn-outline-primary mt-1'>
                Search
              </button>
            </form>
          </div>

          <div className='col-7'>
            <h4>Results</h4>
            <hr/>
            {/* ///Muy ilegible {
              (q==='')
              ?<div className='alert alert-primary'>
              Search a hero
              </div>
              : (heroes.length===0) &&<div className='alert alert-danger'>
              No hero with <b>{q}</b>
              </div>
            } */}

            <div className='alert alert-primary animate__animated animate__fadeIn' 
              style={{display: showSearch ? '' :'none'}}
              aria-label='search'>
              Search a hero
            </div>

            <div className='alert alert-danger animate__animated animate__fadeIn' style={{display: showError ? '' :'none'}}
            aria-label='No found'>
              No hero with <b>{q}</b>
            </div>

            {
              heroes.map(hero=>(
                <HeroCard key={hero.id} {...hero}/>
              ))
            }
          </div>
        </div>
    </>
  )
}
