import { useRef } from "react";
import Slide from "./Slide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Carousel = () => {
  const details = [["Enter A17 Pro.", "Game‑changing chip.", "Groundbreaking", "performance."], ["Titanium.", "So strong. So light. So Pro."], ["iPhone 15 Pro Max has the", "longest optical zoom in", " iPhone ever. Far out."], ["All-new Action button.",
    "What will yours do?"]];

  const ref = useRef(null);
  const loadRef = useRef(null);
  
  function handleVideoEnd(id) {
    ref.current.scrollLeft += ref.current.children[0].offsetWidth
    ref.current.children[id].children[0].play()
  }

  function handleOnPlay(id){
    const timeline = gsap.timeline();
    timeline.to(loadRef.current.children[id],{
      width:"50px",
      background: "linear-gradient(90deg, white, gray)"
    })
    timeline.to(loadRef.current.children[id],{
      width:"50px",
      background: "linear-gradient(90deg, white 100%, gray)",
    })
    timeline.to(loadRef.current.children[id],{
      width:"10px",
      background:"gray",
      duration: ref.current.children[id].children[0].duration
    })
  }

  function handleScroll(i){
    ref.current.children[i].scrollIntoView()
  }

  function handleReload(){
    ref.current.scrollLeft = 0;
    ref.current.children[0].children[0].play()
  }

  return (
    <div className="relative">
      <section ref={ref} className="flex overflow-hidden scroll-smooth">
        <Slide details={details[0]} id={1} handleVideoEnd={handleVideoEnd} handleOnPlay={handleOnPlay}/>
        <Slide details={details[1]} id={2} handleVideoEnd={handleVideoEnd} handleOnPlay={handleOnPlay}/>
        <Slide details={details[2]} id={3} handleVideoEnd={handleVideoEnd} handleOnPlay={handleOnPlay}/>
        <Slide details={details[3]} id={4} handleVideoEnd={handleVideoEnd} handleOnPlay={handleOnPlay}/>
      </section>
      <div className="loader sticky bottom-0 my-2">
        <div ref={loadRef}>
          <p onClick={()=>handleScroll(0)}></p>
          <p onClick={()=>handleScroll(1)}></p>
          <p onClick={()=>handleScroll(2)}></p>
          <p onClick={()=>handleScroll(3)}></p>
        </div>
        <div onClick={handleReload}>
          <img src="public\vite.svg" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Carousel