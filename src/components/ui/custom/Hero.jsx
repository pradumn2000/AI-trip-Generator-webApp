
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../button';

function Hero() {
  return (
    <div className='flex items-center flex-col mx-4 sm:mx-16 md:mx-56 gap-6 '>
      
     {/* Title Section */}
<h1 className="text-5xl font-bold text-center text-red-600 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
  Discover your Next Adventure with AI:<br/>
  <span className='text-black text-5xl'>personalized itineraries at your fingertips</span> 
</h1>

{/* Subtitle Section */}
<p className="text-lg text-center text-white mt-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
  Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
</p>

      
      {/* Button Section */}
      <div className="flex items-center justify-center w-full mt-8">
        <NavLink to="/createTrip">
          <Button className="px-6 py-3  text-black rounded-md text-base font-medium transition duration-300">
            Get started, it's free
          </Button>
        </NavLink>
      </div>
       {/* Centered Image Only for Desktop */}
       <div className="hidden lg:flex justify-center mt-10">
          <img
            src="./Hero.png"
            alt="Travel Illustration"
            className="w-[300px] max-w-full opacity-90"
          />
        </div>
    </div>
  );
}

export default Hero;
