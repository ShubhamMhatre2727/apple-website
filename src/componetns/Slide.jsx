import React, { useRef, useState,useEffect } from 'react'

const Slide = ({details, id, handleVideoEnd, handleOnPlay}) => {
    const ref = useRef(null);
    const [size, setSize] = useState((window.innerWidth > 720)?"large":"small");
  
  return (
    <div ref={ref} className='md:rounded-3xl overflow-hidden relative min-w-full'>
        <video className={`pointer-events-none h-full w-full ${(id==3)?"object-cover":""}`} autoPlay={(id==1)?true:false} muted playsInline onEnded={()=>handleVideoEnd(id)} onPlay={()=>handleOnPlay(id - 1)}>
            
              <source  src={`public/videos/highlight_${size}_${id}.mp4`}/>
            
        </video>
        <div className='absolute top-5 left-5 bg-transparent font-bold text-xl opacity-50'>
        {
            details.map((txt)=><p key={txt} className='bg-inherit cursor-pointer'>{txt}</p>)
        }
        </div>
    </div>
  )
}

export default Slide