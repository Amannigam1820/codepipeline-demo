import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";



const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);
  

  useEffect(() => {
    //console.log(user);
  }, []);

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
       // console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        window.location.reload()
        
      });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5 sticky top-0 z-50 bg-white">
      <a href="/">
      <img src="/logo.svg" alt="logo" />
      </a>
      <div>
        {user ? (
          <div className="flex items-center gap-5">
           <a href="/my-trips">
           <Button variant="outline" className="rounded-full">
              My Trips adsdsaw
            </Button>
            </a>
            <a href="/create-trip">
           <Button variant="outline" className="rounded-full">
              + Create trips with me
            </Button>
            </a>
           

            <Popover>
              <PopoverTrigger><img
                className="h-[30px] w-[30px] rounded-full"
                src={user.picture}
                alt=""
              /></PopoverTrigger>
              <PopoverContent>
                <h2 className="cursor-pointer" onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                  window.location.reload()
                }}>Logout</h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={()=>setOpenDialog(true)}>Sign In</Button>
        )}
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
                 <FcGoogle className="h-5 w-5"/> Sign in with google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
