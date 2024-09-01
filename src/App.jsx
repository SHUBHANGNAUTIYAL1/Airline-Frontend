import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import FlightsList from './Pages/FlightList'
import Flights from './Pages/Flights'
import Allflights from './Components/Allflights'
import HotelsPage from './Pages/HotelPage'
import BookingsPage from './Pages/BookingPage'
import AirlineBooking from './Pages/AirlineBooking'
import About from './Pages/About'
import SurveyForm from './Pages/SurveyForm'




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
        <Route path="/booking" element={<BookingsPage/>} />
        <Route path="/customers" element={<AirlineBooking/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/survey" element={<SurveyForm/>} />
     

      </Routes>
    </BrowserRouter>
  )
}

export default App
