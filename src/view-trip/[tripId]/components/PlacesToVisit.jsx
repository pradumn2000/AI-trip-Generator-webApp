

import React from 'react';
import PlaceCardItem from './PlaceCardItem'; // import your component

function PlacesToVisit({ TripData }) {
  // Extract the itinerary data with fallback if missing
  const itinerary = TripData?.tripData?.[0]?.travelPlan?.itinerary || {};

  // Sort the days in ascending order
  const sortedDays = Object.keys(itinerary).sort((a, b) => {
    const dayA = parseInt(a.replace('day', '').trim(), 10);
    const dayB = parseInt(b.replace('day', '').trim(), 10);
    return dayA - dayB;
  });

  return (
    <div>
      <h2 className="font-bold text-2xl mb-6">Places to Visit</h2>

      {sortedDays.map((day, index) => (
        <div key={index} className="mb-10">
          <h3 className="font-semibold text-xl mb-4 capitalize">
            {day} - {itinerary[day]?.theme || "No theme available"}
          </h3>

          {/* Best time to visit */}
          <p className="text-sm italic mb-4">
            {itinerary[day]?.bestTimeToVisit || "No best time available"}
          </p>

          {/* Grid for Places */}
          <div className="grid md:grid-cols-2 gap-6">
            {itinerary[day]?.places?.map((place, idx) => (
              <PlaceCardItem key={idx} place={place} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlacesToVisit;
