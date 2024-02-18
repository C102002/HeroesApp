import React from 'react'
import { Link } from 'react-router-dom'

const CharaterByHero=({alter_ego,characters})=>{
    if(alter_ego=== characters) return (<></>);
    return (<p>{characters}</p>);
    //Se puede hacer como ternario
    // return (alter_ego===character)
    //? <></>
    //:<p>{characters}</p>
}

export const HeroCard = (
    {
        id,
        superhero, 
        publisher, 
        alter_ego,
        first_appearance,
        characters
    }
) => {
      //NT: `/heroes/${ id }.jpg`; para desarrollo

    const heroImageUrl = `./heroes/${ id }.jpg`;
    // antes
    //const heroImageUrl=`/assets/heroes/${id}.jpg`

    //const charaterByHero=(<p>{characters}</p>)

  return (
  <>
    <div className='col animate__animated animate__fadeIn'>
        <div className='card'>
            <div className='row no-gutters'>
                <div className='col-4'>
                    <img src={heroImageUrl} className='card-img' alt={superhero}/>
                </div>

                <div className='col-8'>
                    <div className='card-body'>
                        <h5 className='card-title'>{superhero} </h5>
                        {/* <p className='card-text'>{
                            (alter_ego !== characters)&&charaterByHero
                        }</p> */}
                        <CharaterByHero characters={characters} alter_ego={alter_ego}/>
                        <p className='card-text'>
                            <small className='text-muted'>{first_appearance}</small>
                        </p>
                        {/* //NT OJO con el / del url que cambia todo */}
                        <Link to={`/hero/${id}`}> Mas información</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </>
  )
}
