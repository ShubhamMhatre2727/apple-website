import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useEffect, useState } from 'react'

const Hero = () => {
    useGSAP(()=>{
        gsap.to('h1',{
            opacity:0.4,
            delay:1
        })

        gsap.fromTo('.stagger-box',{
            y:50,
            opacity:0,
            duration:1
        },
    {
        y:0,
        opacity:1,
        stagger:0.2,
        duration:1,
    })
    },[])

  return (
    <section className='flex flex-col items-center justify-center px-[10%] py-20'>
        <h1
            className='text-3xl font-semibold text-yellow-100 opacity-0'
        >iPhone 15 Pro</h1>

        <video autoPlay muted playsInline  className='pointer-events-none w-full md:hidden'>
            <source src={`public/videos/small_2x.mp4`} type='video/mp4'/>
        </video>
        <video autoPlay  muted playsInline  className='pointer-events-none w-full hidden md:block'>
            <source src={`public/videos/large_2x.mp4`} type='video/mp4'/>
        </video>

        <div className='text-center'>
            <button className='stagger-box px-5 py-2 pb-3 rounded-full bg-blue-600 text-xl/2 border-2 border-blue-600 active:border-blue-50'>Buy</button>
            <p className='stagger-box text-xl font-semibold text-gray-200 mt-10'>From ₹134900.00*</p>
        </div>
        
    </section>
  )
}

export default Hero