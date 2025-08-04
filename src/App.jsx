import { useEffect } from "react"
import { gsap } from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"


import Header from "./components/Header"
import HeroSection from "./components/HeroSection"
import CustomCursor from "./components/CustomCursor"
import AboutSection from "./components/AboutSection"
import ProjectsSection from "./components/ProjectsSection"
import ContactSection from "./components/ContactSection"


export default function App() {
  
  useEffect(() => {
    // register scrollptrigger plugin 
    gsap.registerPlugin(ScrollTrigger)
    
    // refresh scrolltrigger when the page is fully loaded 
    ScrollTrigger.refresh()
    
    // clean up scrollTrigger on component unmount 
    return ()=> {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
    
  }, [])
  return (
    <>
      <Header />
      <HeroSection />
      <CustomCursor/>
      <AboutSection/>
      <ProjectsSection/>
      <ContactSection />
    
    </>
  )
}