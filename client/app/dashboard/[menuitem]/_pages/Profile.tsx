"use client";
import EditProfile from "@/components/dashboardpage/profile/EditProfile";
import ViewProfile from "@/components/dashboardpage/profile/ViewProfile";
import { Button } from "@/components/ui/button";
import { getUserID } from "@/data/cookies/getCookies";
import { UserProfile } from "@/data/types";
import { APIENDPOINTS } from "@/data/urls";
import axios from "axios";
import { KeyRound, PencilLine } from "lucide-react";
import React, { useEffect, useState } from "react";

const Profile: React.FC = () => {
  const [updating, setUpdating] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);
  const [profileData, setProfileData] = useState<UserProfile>();
  useEffect(() => {
    const uid = getUserID();
    console.log(`${APIENDPOINTS.users.getUserbyID}/${uid}`);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${APIENDPOINTS.users.getUserbyID}/${uid}`
        );
        if (response.status === 200) {
          setProfileData(response.data);
        }
      } catch (error: any) {
        if (error.response.status === 404) {
          console.log(error);
        }
        console.log(error);
      }
    };
    setFetching(false);
    fetchData();
  }, []);
  return (
    <div className="flex flex-col items-center space-y-2 pt-16 h-screen p-4">
      {updating ? (
        <div className="flex flex-col max-w-screen-sm w-full">
          <EditProfile values={profileData} setUpdating={setUpdating} />
        </div>
      ) : (
        <div className="flex flex-col max-w-screen-sm w-full">
          <ViewProfile values={profileData} setUpdating={setUpdating} />
          <div className="flex w-full justify-end gap-3 mb-3">
            <Button variant="outline_red" className="gap-2">
              <KeyRound /> Change Password
            </Button>
            <Button
              variant="outline_red"
              className="gap-2"
              onClick={() => setUpdating(true)}
            >
              <PencilLine /> Edit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
