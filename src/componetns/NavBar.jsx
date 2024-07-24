import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'

const NavBar = () => {

  useGSAP(()=>{
    gsap.fromTo(".dark", {
      opacity:0
    },{
      opacity:1,
      delay:1,
      duration:2
    })
  },[])

  return (
    <>
    <header className='flex w-full h-[5vh] justify-between items-center max-md:px-[5%] px-[15%] py-3'>
      <img src="public\images\apple.svg" className="w-4 min-w-6" alt="" />
      <nav className='max-md:hidden text-xs flex gap-x-12'>
        <span className='text-gray-300'>Store</span>
        <span className='text-gray-300'>Mac</span>
        <span className='text-gray-300'>iPad</span>
        <span className='text-gray-300'>iPhone</span>
        <span className='text-gray-300'>Watch</span>
        <span className='text-gray-300'>AirPods</span>
        <span className='text-gray-300'>TV & Home</span>
        <span className='text-gray-300'>Entertainment</span>
        <span className='text-gray-300'>Accessories</span>
        <span className='text-gray-300'>Support</span>
      </nav>
      <div className='flex gap-5'>
        <img src="public\images\search.svg" className="w-4 min-w-6" alt="" />
        <img src="public\images\bag.svg" className="w-4 min-w-6" alt="" />
      </div>

    </header>
    <div className='w-full min-h-[5vh] dark'>
      <p className='dark mx-auto py-3 text-xs text-center'>
      Get iPhone 15 Pro from ₹5621.00/mo.‡ for 24 months with No Cost EMI from most leading <span className="dark text-blue-500">Buy &gt;</span>
      </p>
      </div>
    </>
  )
}

export default NavBar