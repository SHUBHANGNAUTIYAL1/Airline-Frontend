import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import FlightsList from './Pages/FlightList'
import Flights from './Pages/Flights'
import Allflights from './Components/Allflights'
import HotelsPage from './Pages/HotelPage'




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/flight" element={<FlightsList/>}/>
        <Route path="/home" element={<Flights/>}/>
        <Route path="/flight-listing" element={<Allflights/>} />
        <Route path="/hotels" element={<HotelsPage/>} />
     

      </Routes>
    </BrowserRouter>
  )
}

export default App
