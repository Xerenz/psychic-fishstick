import React from 'react'
import image from '../assets/landing.png'

export default function Landing() {
  return (
    <>
        <div>
            <img className='landing-img' src={image} />
        </div>
        <div>Landing</div>
    </>
  )
}
