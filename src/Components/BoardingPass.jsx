import React from 'react';
import FlightIcon from '@mui/icons-material/Flight';

const BoardingPass = ({ booking }) => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    // Generate random gate (between 1 and 30) and seat (combining a letter with a number)
    const randomGate = Math.floor(Math.random() * 30) + 1;
    const randomSeat = `${String.fromCharCode(65 + Math.floor(Math.random() * 6))}${Math.floor(Math.random() * 30) + 1}`;

    return (
        <div className="w-[800px] h-[300px] border-black border-2 rounded-xl flex flex-col relative">
        
            {/* Top Red Section */}
            <div className='h-[20%] w-full bg-red-600 flex items-center rounded-t-xl justify-center'>
                <h1 className="font-bold text-white">Boarding Pass</h1>
            </div>
        
            {/* Flight Icon */}
            <div className="w-[80px] h-[80px] bg-white rounded-full absolute top-4 left-10 flex justify-center items-center">
                <div className='w-[60px] h-[60px] bg-red-600 flex items-center justify-center text-white rounded-full transform rotate-45'>
                    <FlightIcon />
                </div>
            </div>
        
            {/* Main Content Section */}
            <div className="h-[70%] flex justify-around p-4">
                <div className="flex flex-col justify-around">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>From:</strong> {booking.from}</p>
                    <p><strong>To:</strong> {booking.to}</p>
                    <p><strong>Flight:</strong> {booking.flightName}</p>
                    <p><strong>Gate:</strong> {randomGate}</p>
                </div>
                <div className="flex flex-col justify-around">
                    <p><strong>Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {booking.time}</p>
                    <p><strong>Seat:</strong> {randomSeat}</p>
                    <p><strong>Boarding Time:</strong> {booking.boardingTime}</p>
                </div>
            </div>
            
            {/* Bottom Flight Icon */}
            <div className="w-[60px] h-[60px] bg-white rounded-full absolute bottom-2 right-10 flex justify-center items-center">
                <div className='w-[50px] h-[50px] bg-red-600 flex items-center justify-center text-white rounded-full transform rotate-45'>
                    <FlightIcon />
                </div>
            </div>
        
            {/* Bottom Red Section */}
            <div className='h-[10%] w-full bg-red-600 flex items-center rounded-b-xl justify-center'>
            </div>
        </div>
    );
};

export default BoardingPass;
