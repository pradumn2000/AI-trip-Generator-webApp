// // 
// import { Button } from '@/components/ui/button';
// import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'; 
// import React, { useEffect, useState } from 'react';
// import { IoIosSend} from "react-icons/io";



// function InfoSection({ TripData }) {
//     const [photoUrl,setPhotoUrl]=useState();

//     useEffect(() => {
//         if (TripData?.userSelection?.location?.name) {
//           GetPlacePhoto();
//         }
//       }, [TripData]);
    
//     //   
//     const GetPlacePhoto = async () => {
//         const data = {
//           textQuery: TripData?.userSelection?.location?.name,
//         };
//         try {
//           const response = await GetPlaceDetails(data);
        
      
//           if (response && response.data && response.data.places && response.data.places.length > 0) {
//             const photoName = response.data.places[0]?.photos?.[0]?.name;
//             if (photoName) {
//               const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
//               setPhotoUrl( PhotoUrl);
//             } else {
//               console.log('No photo name found.');
//             }
//           } else {
//             console.log('No places found in response.');
//           }
//         } catch (error) {
//           console.error('Error fetching place details:', error);
//         }
//       };
//   return (
//     <div>
//       <img
//         src={photoUrl}
//         className="h-[340px] w-full   object-cover rounded-xl zoom-loop "
//         alt="Travel"
//       />
//       <h2 className='bg-red-700 mt-2 rounded-2xl flex h-6 font-bold font-serif'>.Infosection.............</h2>
//       <div className='flex justify-between items-center'>
//       <div className="my-5 flex flex-gap gap-2">
       
//         <h2 className="text-4xl font-bold text-gray-700">
//           {TripData?.userSelection?.location?.name || "Unknown"}
//         </h2>
//         <div className="flex flex-wrap gap-4 items-center justify-start mb-6">
//   <div className="flex items-center gap-2 p-2 px-4 bg-gray-100 rounded-full shadow text-gray-800 text-sm md:text-base">
//     📆 <span>{TripData.userSelection?.noOFdays} Day{TripData.userSelection?.noOFdays > 1 ? 's' : ''}</span>
//   </div>
//   <div className="flex items-center gap-2 p-2 px-4 bg-indigo-100 rounded-full shadow text-gray-800 text-sm md:text-base">
//     💰 <span>{TripData.userSelection?.budget} Budget</span>
//   </div>
//   <div className="flex items-center gap-2 p-2 px-4 bg-red-100 rounded-full shadow text-gray-800 text-sm md:text-base">
//     🧑🏻‍🤝‍🧑🏻 <span>{TripData.userSelection?.travelPartner} Traveler{TripData.userSelection?.travelPartner > 1 ? 's' : ''}</span>
//   </div>
// </div>

//       </div>
//       <Button className='text-black shadow-lg '><IoIosSend/></Button>
//       </div>
//     </div>
//   )
// }

// export default InfoSection;
// // google place pohot api use for photos 
// 
import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { IoIosSend } from "react-icons/io";
import { QRCodeCanvas } from "qrcode.react";

function InfoSection({ TripData }) {
  const [photoUrl, setPhotoUrl] = useState();
  const [shareLink, setShareLink] = useState('');
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    if (TripData?.userSelection?.location?.name) {
      GetPlacePhoto();
    }
  }, [TripData]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: TripData?.userSelection?.location?.name,
    };
    try {
      const response = await GetPlaceDetails(data);
      if (
        response?.data?.places?.length > 0 &&
        response.data.places[0]?.photos?.[0]?.name
      ) {
        const photoName = response.data.places[0].photos[0].name;
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
        setPhotoUrl(PhotoUrl);
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  // Solution 1: Create a minimal share object with only essential data
  const createMinimalShareData = (tripData) => {
    return {
      location: tripData?.userSelection?.location?.name || "Unknown",
      days: tripData?.userSelection?.noOFdays || 0,
      budget: tripData?.userSelection?.budget || "Unknown",
      travelers: tripData?.userSelection?.travelPartner || "Unknown",
      // Only include essential trip details, not the full object
      highlights: tripData?.TripData?.slice(0, 3)?.map(day => ({
        day: day.day,
        bestPlace: day.plan?.[0]?.placeName || "Various locations"
      })) || []
    };
  };

  const handleShare = () => {
    try {
      // Use minimal data instead of full TripData
      const minimalData = createMinimalShareData(TripData);
      const encodedData = encodeURIComponent(
        btoa(unescape(encodeURIComponent(JSON.stringify(minimalData))))
      );
      
      // Check if the encoded data is too long for QR codes (typically > 2000 chars)
      if (encodedData.length > 1500) {
        // Fallback: create an even more minimal version
        const ultraMinimal = {
          location: TripData?.userSelection?.location?.name || "Unknown",
          days: TripData?.userSelection?.noOFdays || 0,
          budget: TripData?.userSelection?.budget || "Unknown",
          travelers: TripData?.userSelection?.travelPartner || "Unknown"
        };
        const fallbackEncoded = encodeURIComponent(
          btoa(unescape(encodeURIComponent(JSON.stringify(ultraMinimal))))
        );
        const link = `${window.location.origin}/share?data=${fallbackEncoded}`;
        setShareLink(link);
      } else {
        const link = `${window.location.origin}/share?data=${encodedData}`;
        setShareLink(link);
      }
      
      navigator.clipboard.writeText(shareLink || `${window.location.origin}/share?data=${encodedData}`);
      alert("Link copied to clipboard!");
      setShowQR(true);
    } catch (err) {
      console.error("Failed to share trip data", err);
      // Fallback: create a simple link without data
      const simpleLink = `${window.location.origin}/share?trip=${encodeURIComponent(TripData?.userSelection?.location?.name || 'trip')}`;
      setShareLink(simpleLink);
      navigator.clipboard.writeText(simpleLink);
      alert("Simple link copied to clipboard!");
    }
  };

  // Solution 2: Alternative approach using a hash-based system
  const handleShareWithHash = async () => {
    try {
      // In a real app, you'd save this to a database and get a hash/ID back
      const tripId = Date.now().toString(36); // Simple ID generation
      
      // Store the full data in localStorage with the ID (in real app, use database)
      localStorage.setItem(`trip_${tripId}`, JSON.stringify(TripData));
      
      const link = `${window.location.origin}/share/${tripId}`;
      setShareLink(link);
      navigator.clipboard.writeText(link);
      alert("Short link copied to clipboard!");
      setShowQR(true);
    } catch (err) {
      console.error("Failed to create share link", err);
    }
  };

  return (
    <div className='bg-gray-300 rounded-2xl'>
      <img
        src={photoUrl}
        className="h-[340px] w-full object-cover rounded-xl zoom-loop"
        alt="Travel"
      />
      <h2 className='bg-red-700 mt-2 rounded-2xl flex h-6 font-bold font-serif'>
        .Infosection.............
      </h2>

      <div className='flex justify-between items-center'>
        <div className="my-5 flex flex-gap gap-2">
          <h2 className="text-4xl font-bold text-gray-700">
            {TripData?.userSelection?.location?.name || "Unknown"}
          </h2>
          <div className="flex flex-wrap gap-4 items-center justify-start mb-6">
            <div className="flex items-center gap-2 p-2 px-4 bg-gray-100 rounded-full shadow text-gray-800 text-sm md:text-base">
              📆 <span>{TripData.userSelection?.noOFdays} Day{TripData.userSelection?.noOFdays > 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-2 p-2 px-4 bg-indigo-100 rounded-full shadow text-gray-800 text-sm md:text-base">
              💰 <span>{TripData.userSelection?.budget} Budget</span>
            </div>
            <div className="flex items-center gap-2 p-2 px-4 bg-red-100 rounded-full shadow text-gray-800 text-sm md:text-base">
              🧑🏻‍🤝‍🧑🏻 <span>{TripData.userSelection?.travelPartner} Traveler{TripData.userSelection?.travelPartner > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button className='text-black shadow-lg' onClick={handleShare}>
            <IoIosSend /> Share (Minimal)
          </Button>
          <Button className='text-black shadow-lg' onClick={handleShareWithHash}>
            <IoIosSend /> Share (Short Link)
          </Button>
        </div>
      </div>

      {showQR && shareLink && (
        <div className="mt-6 flex flex-col items-center">
          <p className="text-gray-700 font-semibold mb-2">Scan to view trip:</p>
          {/* Add error boundary for QR code */}
          <div className="border p-4 rounded-lg bg-gray-50">
            {shareLink.length > 200 ? (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Link too long for QR code. Use the copied link instead.
                </p>
                <p className="text-xs bg-gray-200 p-2 rounded break-all">
                  {shareLink}
                </p>
              </div>
            ) : (
              <QRCodeCanvas 
                value={shareLink} 
                size={180}
                level="M" // Medium error correction
                includeMargin={true}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default InfoSection;