
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserTripCardItem({ TripData }) { // ✅ Correct props
    const [photoUrl, setPhotoUrl] = useState("");

    useEffect(() => {
        if (TripData?.userSelection?.location?.name) {
            GetPlacePhoto();
        }
    }, [TripData]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: TripData.userSelection.location.name,
        };
        try {
            const response = await GetPlaceDetails(data);

            if (response?.data?.places?.length > 0) {
                const photoName = response.data.places[0]?.photos?.[0]?.name;
                if (photoName) {
                    const url = PHOTO_REF_URL.replace('{NAME}', photoName);
                    setPhotoUrl(url);
                } else {
                    console.log('No photo name found.');
                }
            } else {
                console.log('No places found in response.');
            }
        } catch (error) {
            console.error('Error fetching place details:', error);
        }
    };

    return (
        <Link to={TripData?.id ? `/view-trip/${TripData.id}` : '#'}>
        <div className='bg-amber-50 rounded-xl text-center cursor-pointer hover:scale-105 transition-all hover:shadow-md '>
            <img src={photoUrl || "/placeholder.jpg"} className="object-cover rounded-xl w-full h-[220px]" alt="Trip" />
            <div>
                <h2 className="font-bold text-lg">{TripData?.userSelection?.location?.name}</h2>
                <h2 className="text-sm text-gray-900">
                    {TripData?.userSelection?.noOFdays} Days trip with {TripData?.userSelection?.budget}
                </h2>
            </div>
        </div>
        </Link>
    );
}

export default UserTripCardItem;
