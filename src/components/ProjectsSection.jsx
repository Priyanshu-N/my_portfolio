import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SlShareAlt } from 'react-icons/sl'

gsap.registerPlugin(ScrollTrigger)

const ProjectsSection = () => {
  const sectionRef = useRef(null)
  const scrollRef = useRef(null)
  const panelsRef = useRef([])
  const titleRef = useRef(null)
  const titleLineRef = useRef(null)

  const projects = [
    {
      id: 1,
      title: 'AI SaaS Platform',
      image: '/images/project-1.png',
    },
    {
      id: 2,
      title: 'Chat Application',
      image: '/images/project-2.png',
    },
    {
      id: 3,
      title: 'Crypto Tracker',
      image: '/images/project-3.png',
    },
    {
      id: 4,
      title: 'Portfolio Site',
      image: '/images/project-4.png',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalPanels = projects.length

      scrollRef.current.style.width = `${100 * totalPanels}%`

      // ✅ Title Animation
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // ✅ Line Animation
      gsap.fromTo(
        titleLineRef.current,
        { width: '0%', opacity: 0 },
        {
          width: '100%',
          opacity: 1,
          duration: 1.5,
          ease: 'power3.inOut',
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // ✅ Horizontal Scroll
      gsap.to(panelsRef.current, {
        xPercent: -100 * (totalPanels - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${scrollRef.current.offsetWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          snap: 1 / (totalPanels - 1),
        },
      })

      // ✅ Per-panel animations
      panelsRef.current.forEach((panel) => {
        const img = panel.querySelector('img')
        const title = panel.querySelector('h3')

        gsap.fromTo(
          img,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: panel,
              start: 'left center',
              end: 'right center',
              scrub: true,
            },
          }
        )

        gsap.fromTo(
          title,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: panel,
              start: 'left center',
              end: 'right center',
              scrub: true,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [projects.length])

  return (
    <section
      ref={sectionRef}
      className='w-full bg-[#f6f6f6] text-black py-20 overflow-hidden'
    >
      {/* Section Header */}
      <div className='text-center mb-6 container mx-auto px-2 relative z-10'>
        <h2
          ref={titleRef}
          className='text-4xl md:text-5xl font-bold mb-4 opacity-0'
        >
          My Projects
        </h2>
        <div
          ref={titleLineRef}
          className='w-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto opacity-0'
        ></div>
        <p className='text-gray-500 text-lg mt-3'>Scroll to explore</p>
      </div>

      {/* Scrollable Panels */}
      <div
        ref={scrollRef}
        className='flex h-[80vh] transition-all duration-300'
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => (panelsRef.current[index] = el)}
            className='w-screen flex-shrink-0 flex flex-col items-center justify-center p-8'
          >
            <img
              src={project.image}
              alt={project.title}
              className='w-full max-w-[600px] h-auto rounded-2xl object-cover shadow-xl mb-6 project-image'
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x400?text=Missing+Image'
              }}
            />

            <h3
              className='project-title text-2xl md:text-3xl font-semibold flex items-center gap-2 cursor-pointer text-nowrap'
              onClick={(e) => {
                const target = e.currentTarget
                gsap.fromTo(
                  target,
                  { scale: 1, color: '#000000' },
                  {
                    scale: 1.1,
                    color: '#ec4899',
                    duration: 0.2,
                    repeat: 1,
                    yoyo: true,
                    ease: 'power1.inOut',
                  }
                )
              }}
            >
              {project.title}
              <SlShareAlt
                className='text-pink-500 cursor-pointer hover:text-pink-400 transition-colors duration-200'
                onClick={(e) => {
                  e.stopPropagation()
                  const shareUrl = `${window.location.origin}/projects#project-${project.id}`
                  navigator.clipboard.writeText(shareUrl)
                  alert('Project link copied to clipboard!')
                }}
              />
            </h3>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProjectsSection
