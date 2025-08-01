
import { useRef, useEffect, useReducer } from "react"
import {gsap} from "gsap"
import { ScrollTrigger } from "gsap/all"
import { div } from "framer-motion/client"


const AboutSection = () => {

  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const introRef = useRef(null)
  const starsRef = useRef([])


  useEffect(()=>{
    gsap.registerPlugin(ScrollTrigger)
    // title animation 

    gsap.fromTo(
      titleRef.current,
    { y: 100, opacity: 0},
    {
      y: -300,
      opacity: 1,
      duration: 0.8,
      scrollTrigger:{
        trigger: sectionRef.current,
        start: "top 40%",
        toggleActions: "play none none reverse"
      },
    }
    )
    gsap.fromTo(
      introRef.current,
      {y: 100, opacity: 0, filter: "blur(10px) " },
      {
        y: -400,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          toggleActions: "play none none reverse",
        },

      }
    )
    // stars animation with different speeds and directions 
    starsRef.current.forEach((star, index) => {
      const direction = index % 2 === 0 ? 1 : -1
      const speed = 0.5 + Math.random() * 0.5

      gsap.to(star, {
        x: `${direction * (100 + index * 20)}`,
        y: `${direction * -50 - index * 10}`,
        rotation: direction * 360,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: speed,
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if(trigger.vars.trigger === sectionRef.current){
          trigger.kill()
        }
      })
    }
  })
  const addToStars = (el) => {
    if(el && !starsRef.current.includes(el)){
      starsRef.current.push(el)

    }
  }



  return (
    <section ref={sectionRef} className="h-screen relative overflow-hidden
    bg-gradient-to-b from-black to-[#9a74cf50]">

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i)=>(
          <div
            ref={addToStars}
            key={`star-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${10 + i * 3}px`,
              height: `${10 + i * 3}px`,
              backgroundColor: "white",
              opacity: 0.2 + Math.random() * 0.4,
              top: `${ Math.random() * 100}%`,
              left: `${ Math.random() * 100}%`,
          }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center">
        <h1 

        ref={titleRef} 
        className="text-4xl md:text-6xl font-bold sm:mb-16 text-center text-white opacity-0">
            About Me
        </h1>
      </div>
      <div ref={ introRef } className="absolute lg:bottom-[-20rem]
      md:bottom-[-10rem] bottom-[-20rem] left-0 w-full
      flex md:flex-row flex-col justify-between lg:px-24
       pc-5 items-center opacity-0 ">


        <h3 className="text-sm md:text-2xl font-bold text-purple-200
        z-50 lg:max-w-[45rem] max-w-[27rem] tracking-wider md:mt-20
        sm:mt-[-40rem] mt-[-32rem]" >
          B.Sc. in Computer Science from Doon University. With a strong interest
          in web development, 
          particularly in the MERN stack (MongoDB, Express.js, React, Node.js), 
          I enjoy building dynamic and modern web applications that are both 
          functional and visually engaging.

          Over time, I've developed hands-on experience with React.js, Tailwind CSS, 
          GSAP animations, and backend tools like MongoDB, Multer, and GridFS for 
          handling file uploads efficiently. 
          I'm also expanding my expertise in DevOps, aiming to bridge the gap between 
          development and deployment, and I'm actively exploring areas like AI and Data Science.

        </h3>
        <img className="lg:h-[40rem] md:h-[25rem] h-[20rem]
        mix-blend-lighten
        " src="images/person.png" alt="profile-img" />
      </div>
    </section>
  )
}

export default AboutSection 