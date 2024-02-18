import React, { useMemo } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getHeroById } from '../helpers/getHeroById';

export const HeroPage = () => {

  const Navigate=useNavigate();

  const param=useParams();
  const {id} =useParams();
  const hero=useMemo(()=>getHeroById(id),[id]);

  const onNavigateBack=()=>{
    //Te hace devolverte al anterior 
    Navigate(-1)
    // if(param.id.includes('dc')) return(Navigate('/dc',{replace:false}));
    // if(param.id.includes('marvel')) return(Navigate('/marvel',{replace:false}));
  }

  //En caso que no exista el hero se manda a dc de forma que nos ahorramos errores
  if (!hero){
    return(<Navigate to='/dc'/>)
  }

  const heroImageUrl = `/heroes/${ id }.jpg`;
  //antes
  //const heroImageUrl=`/assets/heroes/${id}.jpg`

  return (
    <>
      <div className='row mt-5'>
        <div className='col-4'>
          <img
            src={heroImageUrl}
            alt={hero.superhero}
            className='img-thumbnail animate__animated animate__fadeInLeft'
          />
        </div>
        <div className='col-8'>
          <h3>{hero.superhero}</h3>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item'> <b>Alter ego:</b> { hero.alter_ego}</li>
            <li className='list-group-item'> <b>Publisher:</b> { hero.publisher}</li>
            <li className='list-group-item'> <b>First Appereance:</b> { hero.first_appearance}</li>
          </ul>
          <h5 className='mt-3'>Characters</h5>
          <p>{hero.characters}</p>

          <button className='btn btn-outline-primary'
          onClick={onNavigateBack}>
            Back
          </button>
        </div>
      </div>
    </>
  )
}
