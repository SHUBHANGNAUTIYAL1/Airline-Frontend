import React from 'react'
import SideNavbar from '../Components/SideNavbar'
import FlightSearch from '../Components/FlightSearch'
import Sidebar from '../Components/SideBar'
import TopFlightRoutes from '../Components/TopFlightRoutes'
import FlightListing from '../Components/FlightListing'

function Flights() {
  return (
    <div className='h-screen flex w-full  '>
        <Sidebar/>
        <div className="flex flex-col px-6 py-6 gap-4 h-screen overflow-y-scroll bg-gradient-to-r  from-blue-400 to-blue-300">
        <FlightSearch/>
        <TopFlightRoutes/>
        <FlightListing/>
        </div>
    </div>
  )
}

export default Flights