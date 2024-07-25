import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'
import Carousel from './Carousel'

const Highlights = () => {
    
    useGSAP(() => {
          gsap.fromTo("a",{
            y:20,
            opacity:0
          },{
            y:0,
            opacity:1,
            stagger:0.25
          })
      }, []);

  return (
    <section className='dark'>
        <div className='dark flex max-md:flex-col gap-2 justify-between items-baseline p-12 pt-24'>
            <h1 className='dark text-4xl font-semibold text-gray-50 pb-4'>Get the highlights</h1>
            <div className='dark flex md:gap-4 max-md:flex-col text-sm'>
                <a className='dark text-blue-500 flex gap-1'>Watch the film <img className='dark' src="public\images\play.svg" width={19} alt="" /></a>
                <a className='dark text-blue-500 flex gap-1'>Watch the Event &gt;</a>
            </div>
        </div>

        <Carousel/>
    </section>
  )
}

export default Highlights