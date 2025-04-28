
import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "./components/infoSection";
import Hotels from "./components/Hotels";
import PlacesToVisit from "./components/PlacesToVisit";
import Footer from "./components/Footer";
function Viewtrip (){
    const {tripId}=useParams();
    const[trip,setTrip]=useState([]);
    useEffect(()=>{
        tripId&&GetTripData();
    },[tripId])
    /*
    use to get trip information from firebase
    */
    const GetTripData=async()=>{
        const docRef=doc(db,'AITrips',tripId);
        const docSnap=await getDoc(docRef);
        if(docSnap.exists()){
           // console.log('Documents:',docSnap.data());
            setTrip(docSnap.data())

        }
        else{
            console.log('no such Document');
            toast('no trip found!')
        }
    }
    return (
        <div className="p-10 md:px-20 lg:px-44 xl:px-56">
          
            <>
              {/* Information section */}
              <InfoSection TripData={trip} />
    
              {/* Recommended Hotels */}
              <Hotels TripData={trip}/>

              {/* Daily Plan */}
              <PlacesToVisit TripData={trip} />
              {/* Footer */}
              <Footer TripData={trip}/>
            </>
         
        </div>
      );
    }
export default Viewtrip;