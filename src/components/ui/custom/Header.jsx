import React, { useEffect, useState } from 'react';
import { Button } from '../button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { useDialog } from './DailogContext';

import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
    const { openDailog, setOpenDailog } = useDialog();

    useEffect(() => {
      
      }, [user]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
    //   console.log("Login Success ✅", codeResp);
      GetUserProfile(codeResp); // Call it here when needed
    },
    onError: (error) => {
      console.log("Login Error ", error);
    },
  });
  const GetUserProfile = (tokenInfo) => {


    
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "application/json",
        },
      })
      .then((resp) => {
        // console.log("User Profile Info:", resp.data);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDailog(false); // This will work correctly with the component-level variable
        window.location.reload();
      })
      .catch((error) => {
        console.log(" Error fetching user info:", error);
      });
  };
  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5 bg-[#ffffff7a] sticky top-0 bg-opacity-70 sm:max-w-full z-50">
  {/* Logo */}
  <a href='/' className='cursor-pointer' >
    <img src="/logo.svg" alt="Logo" className="w-[120px]" />
  </a>

      {/* Right side */}
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <a href='/my-trips'>
            <Button className="text-black rounded-full">My Trips</Button>
            </a>
            <a href='/createTrip'>
            <Button className="text-black rounded-full">+Create Trip</Button>
            </a>
            <Popover>
  <PopoverTrigger> <img
              src={user?.picture}
              alt="User Avatar"
              className="h-[30px] w-[30px] rounded-full "
            /></PopoverTrigger>
  <PopoverContent>
    <h2 className='hover:cursor-pointer' onClick={()=>{
        googleLogout();
        localStorage.clear()
        window.location.reload();
       
    }}>Logout</h2>
  </PopoverContent>
  </Popover>
           
          </div>
        ) : (
          <Button onClick={()=>setOpenDailog(true)} className="text-black">Sign In</Button>
        )}
        {/* //Sign in popup */}
        <Dialog open={openDailog}>
        <DialogContent>
          <div className="flex flex-col justify-items-start  mt-6">
            <img src="/logo.svg" alt="App Logo" className="w-42 h-16 mb-4" />
            <h2 className="font-bold text-lg">Sign in with Google</h2>
            <p>Sign in to the App with google Authentication securely</p>
            <Button
              onClick={login}
              className="w-full mt-5 flex gap-4 items-center text-black shadow-black"
            >
              <FcGoogle className="h-7 w-7" />
              Sign In With Google
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
}

export default Header;
