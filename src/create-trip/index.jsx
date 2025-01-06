import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelerList,
} from "@/constant/Option";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGoogleLogin } from "@react-oauth/google";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebase.config";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast as toasts } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateTrip = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    //  console.log(formData);
  }, [formData]);

  useEffect(() => {
    if (loading) {
      toasts.info("Please wait...We are working on it");
    }
  }, [loading]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length > 2) {
        try {
          const response = await axios.get(
            "https://nominatim.openstreetmap.org/search",
            {
              params: {
                q: query,
                format: "json",
                addressdetails: 1,
              },
            }
          );
          setSuggestions(response.data);
        } catch (error) {
          console.error("Error fetching place suggestions:", error);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [query]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      (formData?.noOfdays > 10 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveller
    ) {
      toast("Please fill the deatils");
      return;
    }

    setLoading(true);

    const final_prompt = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveller)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    // console.log(final_prompt);

    const result = await chatSession.sendMessage(final_prompt);

    console.log("--", result?.response?.text());
    setLoading(false);
    saveAITrip(result.response.candidates[0].content.parts[0].text);
    //console.log(result?.response?.json);
  };

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        onGenerateTrip();
      });
  };

  const saveAITrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));

    const docId = Date.now().toString();

    await setDoc(doc(db, "AiTrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate(`/view-trip/${docId}`);
  };

  return (
    <div className="sm:px-10 md:px-[100px] lg:px-[300px] xl:px-[200px]  mt-10 ">
      <h2 className="font-bold text-3xl">
        Tell Us Your Travel Preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Help us curate your perfect journey by sharing your travel preferences.
        Whether you love adventure, relaxation, or cultural exploration, our AI
        will tailor a trip just for you.
      </p>

      <div className="mt-[35px] flex flex-col gap-9">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice?
          </h2>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              const value = e.target.value;
              setQuery(value);
              handleInputChange("location", value);
            }}
            placeholder="Enter a destination"
            className="border border-gray-300 p-2 rounded w-full"
          />
          {suggestions.length > 0 && (
            <ul className="border border-gray-300 mt-2 rounded max-h-48 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    const selectedValue = suggestion.display_name;
                    setQuery(selectedValue);
                    setFormData({
                      ...formData,
                      location: selectedValue,
                    });
                    setSuggestions([]);
                  }}
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder={"Ex.3"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5 pb-10">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer 
              ${formData?.budget === item.title && "shadow-lg border-black"}
              `}
            >
              <h2 className="text-2xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">
          Who do you plan on traveling with on your next adventure?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5 pb-10">
          {SelectTravelerList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("traveller", item.people)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer 
              ${formData?.traveller === item.people && "shadow-lg border-black"}
              `}
            >
              <h2 className="text-2xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 justify-end flex">
        <Button disabled={loading} onClick={onGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
          ) : (
            <>Generate Trip</>
          )}
        </Button>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="" />
              <h2 className="font-bold text-lg mt-7">Sign in with google</h2>
              <p>Sign in to the app with Google authentication</p>
              <Button
                className="w-full mt-5 flex gap-4 items-center"
                onClick={login}
              >
                <FcGoogle className="h-5 w-5" /> Sign in with google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default CreateTrip;
