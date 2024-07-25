import React, { useRef } from 'react'

const Slide = ({details, id, handleVideoEnd, handleOnPlay}) => {
    const ref = useRef(null);
  return (
    <div ref={ref} className='relative min-w-full'>
        <video className={`pointer-events-none h-96 w-full ${(id==3)?"object-cover":""}`} autoPlay={(id==1)?true:false} muted playsInline onEnded={()=>handleVideoEnd(id)} onPlay={()=>handleOnPlay(id - 1)}>
            <source src={`public/videos/highlight_small_${id}.mp4`}/>
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