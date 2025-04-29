
import { LoadScript } from "@react-google-maps/api";
import AutoCompleteCom from "./AutoCompleteCom";
import React, { useEffect, useState } from "react";
import { Input } from "./input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/Constants/options";
import { Button } from "./button";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GoogleGenAI } from "@google/genai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import GetUserProfile from "./auth"; // Ensure this is the correct path
import { useDialog } from "./custom/DailogContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const libraries = ["places"];
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { openDailog, setOpenDailog } = useDialog();

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("Form Data:", formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: async (codeResp) => {
        if (codeResp?.access_token) {
          try {
            await GetUserProfile(codeResp);  
            setOpenDailog(false);             
            OnGenerateTrip();                 
            console.log(codeResp);
          } catch (error) {
            console.error("Error during GetUserProfile:", error);
            toast.error("Login failed: " + error.message);
          }
        } else {
          console.error("No access token in Google response");
          toast.error("Login failed: No access token received");
        }
      }
  });

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.email) {
        throw new Error("User data not found");
      }
      const docId = Date.now().toString();

      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail: user.email,
        id: docId,
      });
      toast.success("Trip saved successfully!");
      navigate("/view-trip/" + docId);
    } catch (error) {
      console.error("Error saving trip:", error);
      toast.error("Failed to save trip: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const OnGenerateTrip = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      console.log("No user found, opening login dialog");
      setOpenDailog(true);
      return;
    }

    if (
      (formData?.noOFdays > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData?.travelPartner
    ) {
      toast.error("Please fill all required fields before generating the trip.");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData.location?.name || "")
      .replace("{totalDays}", formData.noOFdays || "1")
      .replace("{traveler}", formData.travelPartner || "")
      .replace("{budget}", formData.budget || "")
      .replace("{totalDays}", formData.noOFdays || "1");

    console.log("Final Prompt:", FINAL_PROMPT);

    try {
      const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Missing Gemini API Key");
      }

      const ai = new GoogleGenAI({ apiKey });
      const model = "gemini-2.0-flash";
      const config = {
        responseMimeType: "application/json",
      };
      const contents = [{ role: "user", parts: [{ text: FINAL_PROMPT }] }];

      const response = await ai.models.generateContent({
        model,
        contents,
        config,
      });

      if (response?.candidates?.length > 0) {
        const text = response.candidates[0].content.parts[0].text;
        console.log("Generated Response:", text);
        await SaveAiTrip(text);
      } else {
        throw new Error("Invalid API response");
      }
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error(`Failed to generate trip: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 create-trip-container">
      <div className="bg-zinc-900 bg-opacity-90 p-8 rounded-xl backdrop-blur-sm text-white">
        <h2 className="font-bold text-3xl">
          Tell us your travel preference 🏕️🌴
        </h2>
        <p className="mt-3 text-gray-300 text-xl">
          Just provide some basic information, and our trip planner will generate
          a customized itinerary based on your preferences.
        </p>

        <div className="mt-20 flex flex-col gap-9">
          <h2 className="text-xl my-3 font-medium">
            What is the destination of choice?
          </h2>
          <LoadScript
            googleMapsApiKey="AIzaSyD6cNVYo9Mu6Z1py_AfwMcPqB9Nzs2gMYw"
            libraries={libraries}
          >
            <AutoCompleteCom
              selectProps={{
                place,
                onChange: (v) => {
                  setPlace(v);
                  handleInputChange("location", v);
                },
              }}
            />
          </LoadScript>
        </div>

        <div className="mt-8">
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder={"e.g. 3"}
            type="number"
            className="bg-white bg-opacity-80"
            onChange={(e) => handleInputChange("noOFdays", e.target.value)}
          />
        </div>

        <div className="mt-8">
          <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer bg-white bg-opacity-70 backdrop-blur-sm ${
                  formData?.budget === item.title
                    ? "shadow-lg border-black bg-opacity-90"
                    : ""
                }`}
                onClick={() => handleInputChange("budget", item.title)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold tex-lg text-black">{item.title}</h2>
                <h2 className="text-sm text-gray-900">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on traveling with?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelesList.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer bg-white bg-opacity-70 backdrop-blur-sm ${
                  formData.travelPartner === item.people
                    ? "shadow-lg border-black bg-opacity-90"
                    : ""
                }`}
                onClick={() => handleInputChange("travelPartner", item.people)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold tex-lg text-black">{item.title}</h2>
                <h2 className="text-sm text-gray-900">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="my-10 flex justify-end bg-gradient-to-r from-black via-gray-900 to-black bg-opacity-80 p-8 rounded-xl shadow-lg">
          <Button
            onClick={OnGenerateTrip}
            disabled={loading}
            className="text-black bg-white hover:shadow-lg cursor-pointer"
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin text-black" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>
      </div>

      {/* Google sign-in dialog */}
      <Dialog open={openDailog} onOpenChange={setOpenDailog}>
        <DialogContent>
          <div className="flex flex-col justify-items-start mt-6">
            <img src="/logo.svg" alt="App Logo" className="w-42 h-16 mb-4" />
            <h2 className="font-bold text-lg">Sign in with Google</h2>
            <p>Sign in to the App with Google Authentication securely</p>
            <Button
              onClick={login}
              className="w-full mt-5 flex gap-4 items-center text-black
              shadow-black"
            >
              <FcGoogle className="h-7 w-7" />
              Sign In With Google
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
