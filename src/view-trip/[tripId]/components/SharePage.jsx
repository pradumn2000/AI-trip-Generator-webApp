

import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SharePage() {
  const [sharedData, setSharedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { tripId } = useParams(); // For hash-based URLs like /share/abc123

  useEffect(() => {
    loadSharedData();
  }, []);

  const loadSharedData = () => {
    try {
      // Method 1: Load from URL query parameter
      const queryParams = new URLSearchParams(window.location.search);
      const encodedData = queryParams.get("data");
      
      if (encodedData) {
        try {
          const decodedJson = decodeURIComponent(escape(atob(encodedData)));
          const tripData = JSON.parse(decodedJson);
          setSharedData(tripData);
          setLoading(false);
          return;
        } catch (decodeError) {
          console.error("Failed to decode URL data", decodeError);
        }
      }

      // Method 2: Load from hash-based ID (from localStorage in this example)
      if (tripId) {
        const storedData = localStorage.getItem(`trip_${tripId}`);
        if (storedData) {
          const tripData = JSON.parse(storedData);
          setSharedData(tripData);
          setLoading(false);
          return;
        }
      }

      // Method 3: Simple trip name fallback
      const tripName = queryParams.get("trip");
      if (tripName) {
        setSharedData({
          userSelection: {
            location: { name: decodeURIComponent(tripName) },
            noOFdays: "Unknown",
            budget: "Unknown",
            travelPartner: "Unknown"
          }
        });
        setLoading(false);
        return;
      }

      // No valid data found
      setError("No valid trip data found");
      setLoading(false);

    } catch (error) {
      console.error("Failed to load shared data", error);
      setError("Failed to load trip data");
      setLoading(false);
    }
  };

  // Helper function for personalized message
  function getTravelMessage(travelPartner) {
    switch ((travelPartner || "").toLowerCase()) {
      case "family":
        return "A perfect getaway to create unforgettable memories with your loved ones!";
      case "just me":
        return "An ideal solo adventure to explore and unwind at your own pace.";
      case "friend":
      case "friends":
        return "A fun-filled trip to share amazing moments with your friends!";
      case "couple":
        return "A romantic escape designed for you and your special someone.";
      default:
        return "Plan a wonderful trip tailored just for you!";
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading shared trip...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center bg-red-50 p-8 rounded-lg">
          <h2 className="text-xl font-bold text-red-700 mb-2">Oops!</h2>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create New Trip
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gray-300 rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            🌟 Shared Trip Plan
          </h1>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
                Trip Overview
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <span className="font-medium text-gray-600">Destination:</span>
                    <p className="text-lg font-semibold text-gray-800">
                      {sharedData.userSelection?.location?.name || sharedData.location || "Unknown Location"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-2xl">📅</span>
                  <div>
                    <span className="font-medium text-gray-600">Duration:</span>
                    <p className="text-lg text-gray-800">
                      {sharedData.userSelection?.noOFdays || sharedData.days} 
                      {(sharedData.userSelection?.noOFdays || sharedData.days) !== "Unknown" ? " Days" : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-2xl">💰</span>
                  <div>
                    <span className="font-medium text-gray-600">Budget:</span>
                    <p className="text-lg text-gray-800">
                      {sharedData.userSelection?.budget || sharedData.budget}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-2xl">👥</span>
                  <div>
                    <span className="font-medium text-gray-600">Travelers:</span>
                    <p className="text-lg text-gray-800">
                      {sharedData.userSelection?.travelPartner || sharedData.travelers}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trip Highlights */}
            {sharedData.highlights && sharedData.highlights.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
                  Trip Highlights
                </h2>
                <div className="space-y-3">
                  {sharedData.highlights.map((highlight, index) => (
                    <div key={index} className="bg-blue-50 p-3 rounded-lg">
                      <h3 className="font-medium text-blue-800">
                        Day {highlight.day}
                      </h3>
                      <p className="text-blue-700 text-sm">
                        {highlight.bestPlace}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Personalized Message */}
          <p className="text-center text-gray-700 italic my-6">
            {getTravelMessage(sharedData.userSelection?.travelPartner || sharedData.travelers)}
          </p>

          {/* Call to Action */}
          <div className="mt-8 text-center border-t pt-6">
            <p className="text-gray-600 mb-4">
              Inspired by this trip? Create your own adventure!
            </p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 bg-blue-500 text-black rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Plan Your Trip
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SharePage;
