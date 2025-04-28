import React from "react";
import HotelCardItem from "./HotelCardItem";

function Hotels({ TripData }) {
  const hotelList =
    TripData?.tripData?.[0]?.travelPlan?.hotelOptions ||
    TripData?.tripData?.[0]?.travelPlan?.hotels||
    TripData?.tripData?.[0]?.TravelPlan ||
    TripData?.tripData?.[0]?.tripPlan ||
    [];

  const validHotelList = Array.isArray(hotelList) ? hotelList : [];
  console.log ({TripData})
 console.log (validHotelList)
  return (
    <div>
      <h2 className="font-bold text-2xl mb-6">Hotel Recommendations</h2>

      {validHotelList.length === 0 ? (
        <h3 className="text-gray-500">No hotel recommendations available.</h3>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {validHotelList.map((hotel, index) => (
            <HotelCardItem key={index} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Hotels;
