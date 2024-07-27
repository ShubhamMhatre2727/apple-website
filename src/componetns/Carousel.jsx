import { useRef } from "react";
import Slide from "./Slide";
import gsap from "gsap";

const Carousel = () => {
  const details = [
    ["Enter A17 Pro.", "Game‑changing chip.", "Groundbreaking", "performance."],
    ["Titanium.", "So strong. So light. So Pro."],
    [
      "iPhone 15 Pro Max has the",
      "longest optical zoom in",
      " iPhone ever. Far out.",
    ],
    ["All-new Action button.", "What will yours do?"],
  ];

  const ref = useRef(null);
  const loadRef = useRef(null);

  function handleVideoEnd(id) {
      // ref.current.children[id].scrollIntoView()
      ref.current.scrollLeft = id*ref.current.children[0].clientWidth;
    ref.current.children[id].children[0].play();
  }

  function handleOnPlay(id) {
    //alert(id)
    const dots = gsap.utils.toArray(loadRef.current.children)
    dots.forEach((dot, idx)=>{
      if(idx == id){
        dot.style.width="40px"
      }else{
        dot.style.width="10px"
      }
    })
    gsap.fromTo(loadRef.current.children[id],{
      background:"linear-gradient(to right, #707070 0%, #313131 0%)",
    },{
      background:"linear-gradient(to right, #707070 100%, #313131 100%)",
      duration: ref.current.children[id].children[0].duration-1,
    });
     }

  function handleScroll(i) {
    const dots = gsap.utils.toArray(loadRef.current.children)
    dots.forEach((dot, idx)=>{
      if(idx == i){
        dot.style.width="40px"
      }else{
        dot.style.width="10px"
      }
    })
    ref.current.children[i].scrollIntoView();
  }



  return (
    <div className="relative dark">
      <section ref={ref} className="dark flex overflow-hidden scroll-smooth md:w-[80vw] h-[80vh] mx-auto">
        <Slide
          details={details[0]}
          id={1}
          handleVideoEnd={handleVideoEnd}
          handleOnPlay={handleOnPlay}
        />
        <Slide
          details={details[1]}
          id={2}
          handleVideoEnd={handleVideoEnd}
          handleOnPlay={handleOnPlay}
        />
        <Slide
          details={details[2]}
          id={3}
          handleVideoEnd={handleVideoEnd}
          handleOnPlay={handleOnPlay}
        />
        <Slide
          details={details[3]}
          id={4}
          handleVideoEnd={handleVideoEnd}
          handleOnPlay={handleOnPlay}
        />
      </section>
      <div className="loader sticky bottom-0 my-2 pb-8">
        <div ref={loadRef}>
          <p onClick={() => handleScroll(0)}></p>
          <p onClick={() => handleScroll(1)}></p>
          <p onClick={() => handleScroll(2)}></p>
          <p onClick={() => handleScroll(3)}></p>
        </div>
        <div onClick={()=>handleVideoEnd(0)}>
          <img src="public\vite.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
