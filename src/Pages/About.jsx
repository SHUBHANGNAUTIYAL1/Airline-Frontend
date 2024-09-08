import React from 'react'
import Sidebar from '../Components/SideBar'
import HeroSection from "../Components/HomeComponents/HeroSection"
import Rating from "../Components/HomeComponents/Rating"
import Banner from "../Components/HomeComponents/Banner"
import Testimonials from "../Components/HomeComponents/Testimonials"


function About() {
  return (
    <div className='flex w-full h-screen'>
        <Sidebar/>
        <div className="flex w-full gap-4 flex-col h-screen overflow-y-scroll">
        <HeroSection/>

        <Banner/>
        <Rating/>
        
        <Testimonials/>
        
        </div>

    </div>
  )
}

export default About