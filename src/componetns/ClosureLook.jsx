import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useState } from 'react'

const ClosureLook = () => {
    const list = [{
        url:"public/images/closer-look/all colors.jpg",
        text:'6.1” iPhone 15 Pro1 in four colours',
    },{
        url:"public/images/closer-look/natural.jpg",
        text:'6.7” iPhone 15 Pro Max1 and 6.1” iPhone 15 Pro1 in Natural Titanium',
    },{
        url:"public/images/closer-look/blue.jpg",
        text:'6.7” iPhone 15 Pro Max1 and  6.1” iPhone 15 Pro1 in Blue Titanium',
    },{
        url:"public/images/closer-look/white.jpg",
        text:'6.7” iPhone 15 Pro Max1 and  6.1” iPhone 15 Pro1 in White Titanium',
    },{
        url:"public/images/closer-look/black.jpg",
        text:'6.7” iPhone 15 Pro Max1 and  6.1” iPhone 15 Pro1 in Black Titanium',
    }]

    useGSAP(()=>{
        gsap.fromTo("#image",{
            opacity:0,
        },{
            opacity:1,
            duration:0.1,
            ease:"power3"
        })
    },[])

    const [id, setId] = useState(1);
  return (
    <div>
        <h2 className='text-2xl font-semibold'>Take a Closure Look</h2>
        <div className='w-full flex flex-col items-center'>
            <img id='image' src={list[id].url} alt="" />

            <h3 className='font-bold'>{list[id].text}</h3>

            <div className='flex gap-2 items-center'>
                   <li className='size-6 rounded-full' style={{backgroundImage: "url(public/images/closer-look/all-icon.png)",backgroundPosition: "center",backgroundSize:"cover"
                   }}>
                   </li>
                {
                    ["#8f8a81","#202630","#c9c8c3","#242526"].map((color)=>(
                        <li className=' size-6 rounded-full' style={{background:color}} key={color}></li>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default ClosureLook