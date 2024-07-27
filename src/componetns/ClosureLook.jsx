import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useState, useRef } from 'react'

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
    const ref = useRef(null);

    function handleClick(i){
        const children = gsap.utils.toArray(ref.current.children);
        children.forEach((child, idx)=>{
                if (idx === i)
                    child.style.border = "4px solid #fff";
                else
                    child.style.border = "none";
            })
        setId(i);
    }
    
  return (
    <div className=" h-[80vh] flex flex-col items-center justify-between">
        <h2 className='w-full  text-start text-2xl font-semibold'>Take a Closure Look</h2>
            <img id='image' src={list[id].url} alt="" />
        <div className="mx-auto text-center">

            <h3 className='font-bold w-72'>{list[id].text}</h3>

            <div ref={ref} className='flex gap-2 items-center justify-center py-4'>
                   <li onClick={()=>handleClick(0)} className='size-6 rounded-full' style={{backgroundImage: "url(public/images/closer-look/all-icon.png)",backgroundPosition: "center",backgroundSize:"cover"
                   }}>
                   </li>
                {
                    ["#8f8a81","#202630","#c9c8c3","#242526"].map((color,idx)=>(
                        <li onClick={()=>handleClick(idx+1)} className=' size-6 rounded-full' style={{background:color}} key={color}></li>
                    ))
                }
            </div>
    </div>
    </div>
  )
}

export default ClosureLook