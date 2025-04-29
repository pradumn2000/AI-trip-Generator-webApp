
// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { Button } from '../button';

// function Hero() {
//   return (
//     <div className='flex items-center flex-col mx-4 sm:mx-16 md:mx-56 gap-6 '>
      
//      {/* Title Section */}
// <h1 className="text-5xl font-bold text-center text-red-600 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
//   Discover your Next Adventure with AI:<br/>
//   <span className='text-black text-5xl'>personalized itineraries at your fingertips</span> 
// </h1>

// {/* Subtitle Section */}
// <p className="text-lg text-center text-white mt-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
//   Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
// </p>

      
//       {/* Button Section */}
//       <div className="flex items-center justify-center w-full mt-8">
//         <NavLink to="/createTrip">
//           <Button className="px-6 py-3  text-black rounded-md text-base font-medium transition duration-300">
//             Get started, it's free
//           </Button>
//         </NavLink>
//       </div>
//     </div>
//   );
// }

// export default Hero;
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <div className="flex flex-col items-center mx-4 sm:mx-10 md:mx-24 lg:mx-48 xl:mx-72 gap-6 py-10 ">
      {/* Title Section */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-red-600 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] leading-tight ">
        Discover your Next Adventure with AI:
        <br />
        <span className="text-black text-2xl sm:text-4xl md:text-5xl">
          personalized itineraries at your fingertips
        </span>
      </h1>

      {/* Subtitle Section */}
      <p className="text-base sm:text-lg text-center text-white mt-2 sm:mt-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] max-w-3xl">
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>

      {/* Button Section */}
      <div className="flex justify-center w-full mt-6">
        <NavLink to="/createTrip">
          <Button className="px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-md text-base font-medium transition duration-300 shadow-md">
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

