import React from 'react'

export default function RecommendedShows(props) {
   
  return (
    <div className='recommended_section'>
        <img src={props.image} alt="" />
        <h2>{props.name}</h2>
        <p>{props.date}</p>
        <p>{props.artist}</p>
        <h3>{props.price}</h3>

    </div>
  )
}
