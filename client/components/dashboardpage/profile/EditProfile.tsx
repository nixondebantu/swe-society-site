"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { getUserID } from "@/data/cookies/getCookies";
import { updateProfileCookies } from "@/data/cookies/setCookies";
import { UserProfile } from "@/data/types";
import { APIENDPOINTS } from "@/data/urls";
import axios from "axios";
import {
  CircleX,
  LoaderIcon,
  Pencil,
  Save,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { CldUploadButton } from "next-cloudinary";
import Link from "next/link";
import React, { useState } from "react";
import EditProject from "./EditProject";
import ProfileCard from "./ProfileCard";

interface EditProfileProps {
  values: UserProfile | undefined;
  setUpdating: React.Dispatch<React.SetStateAction<boolean>>;
  refreshProfileData: () => void;
}

const defaultUserProfile: UserProfile = {
  userid: 0,
  fullname: "",
  password: "",
  email: "",
  profile_picture: "",
  regno: "",
  session: "",
  phone_number: "",
  bio: "",
  linkedin_id: "",
  github_id: "",
  stop_stalk_id: "",
  whatsapp: "",
  facebook_id: "",
  blood_group: "",
  school: "",
  college: "",
  hometown: "",
  cv: null,
  experience: null,
  projects: null,
  is_alumni: false,
  role: "",
};

const bloodGroupOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const EditProfile: React.FC<EditProfileProps> = ({
  values,
  setUpdating,
  refreshProfileData,
}) => {
  const [data, setData] = useState<UserProfile>(values ?? defaultUserProfile);
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const handleProfilePicUpload = (result: any) => {
    const uploadedURL = result.info.secure_url;
    setData((prevData) => ({ ...prevData, profile_picture: uploadedURL }));
  };

  const handleCVUpload = (result: any) => {
    const uploadedURL = result.info.secure_url;
    setData((prevData) => ({ ...prevData, cv: uploadedURL }));
  };

  const handleRemoveCV = () => {
    setData((prevData) => ({ ...prevData, cv: null }));
  };

  const handleInputChange = (
    field: keyof UserProfile,
    value: string | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let newValue: string;
    if (typeof value === "string") {
      newValue = value;
    } else if (value.target && typeof value.target.value === "string") {
      newValue = value.target.value;
    } else {
      newValue = "";
    }
    setData((prevData) => ({ ...prevData, [field]: newValue }));
  };

  const handleSave = () => {
    console.log(data);
    setSaving(true);
    const updateUserData = async () => {
      try {
        const response = await axios.put(
          `${APIENDPOINTS.users.updateUserbyID}/${getUserID()}`,
          data
        );
        if (response.status === 200) {
          toast({
            title: "Profile Updated",
            duration: 4000,
          });
        }
        refreshProfileData();
        setSaving(false);
        setUpdating(false);
        if (
          data.fullname !== values?.fullname ||
          data.profile_picture !== values?.profile_picture
        ) {
          updateProfileCookies(data.fullname, data.profile_picture);
          window.location.reload();
        }
      } catch (error: any) {
        toast({
          title: "Failed Updating Profile",
          variant: "destructive",
          duration: 4000,
        });
      }
      setSaving(false);
    };
    updateUserData();
  };

  return (
    <div className="w-full py-2">
      <>
        <div className="grid grid-cols-3">
          <div className="col-span-2">
            <ProfileCard
              label="Name"
              info={data.fullname}
              edit={true}
              className="col-span-3 mb-2"
              placeholder="Full Name"
              onChange={(e) => handleInputChange("fullname", e)}
            />
            <ProfileCard
              label="Registration no"
              info={data.regno}
              edit={false}
              className="col-span-3 mb-2"
              onChange={(e) => handleInputChange("regno", e)}
            />
            <ProfileCard
              label="Session"
              info={data.session}
              edit={true}
              placeholder="2020-21"
              className="col-span-3 mb-2"
              onChange={(e) => handleInputChange("session", e)}
            />
            <ProfileCard
              label="Email"
              info={data.email}
              edit={true}
              placeholder="abc@gmail.com"
              className="col-span-3 mb-2"
              onChange={(e) => handleInputChange("email", e)}
            />
          </div>
          <div className="flex flex-col w-full items-center">
            <div className="relative">
              <Avatar className="w-fit h-fit p-2">
                <AvatarImage
                  src={data?.profile_picture}
                  className="rounded-full border-2 border-white sm:p-2 p-1"
                />
              </Avatar>
              <CldUploadButton
                onUpload={handleProfilePicUpload}
                uploadPreset={process.env.NEXT_PUBLIC_IMG_UPLOAD_PRESET}
                className="absolute bottom-0 sm:bottom-2 bg-background right-0 sm:right-2 text-primary border-2 border-primary rounded-full p-2 hover:text-white hover:bg-primary"
              >
                <Pencil size={20} />
              </CldUploadButton>
            </div>
            {data.is_alumni ? (
              <p className="px-4 text-center text-background bg-primary text-sm sm:text-base font-bold rounded-full text-wrap">
                Alumnus
              </p>
            ) : (
              <p className="sm:px-4 px-[2px] text-center text-primary text-xs sm:text-base font-bold rounded-full border border-primary">
                {data.role}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <ProfileCard
            label="Phone Number"
            info={data.phone_number}
            edit={true}
            placeholder="+8801........."
            className="mb-2"
            onChange={(e) => handleInputChange("phone_number", e)}
          />
          <ProfileCard
            label="WhatsApp"
            info={data.whatsapp}
            edit={true}
            placeholder="WhatsApp Number"
            className="mb-2"
            onChange={(e) => handleInputChange("whatsapp", e)}
          />
        </div>
        <p className="text-xs font-semibold">Bio</p>
        <Textarea
          value={data.bio}
          placeholder="Hi, I am ....."
          onChange={(e) => handleInputChange("bio", e.target.value)}
          className="disabled:cursor-default disabled:opacity-100 mb-2"
        />
        <div className="grid grid-cols-2 gap-2">
          <ProfileCard
            label="Home Town"
            info={data.hometown}
            edit={true}
            placeholder="District Name"
            className="mb-2"
            onChange={(e) => handleInputChange("hometown", e)}
          />
          <ProfileCard
            label="Blood Group"
            info={data.blood_group}
            edit={true}
            className="mb-2"
            onChange={(e) => handleInputChange("blood_group", e)}
            options={bloodGroupOptions}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <ProfileCard
            label="College"
            info={data.college}
            edit={true}
            placeholder="College Name"
            className="mb-2"
            onChange={(e) => handleInputChange("college", e)}
          />
          <ProfileCard
            label="High School"
            info={data.school}
            edit={true}
            placeholder="School Name"
            className="mb-2"
            onChange={(e) => handleInputChange("school", e)}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <ProfileCard
            label="LinkedIn"
            info={data.linkedin_id}
            edit={true}
            placeholder="Linkedin account URL"
            onChange={(e) => handleInputChange("linkedin_id", e)}
          />
          <ProfileCard
            label="Github"
            info={data.github_id}
            edit={true}
            placeholder="Github account URL"
            onChange={(e) => handleInputChange("github_id", e)}
          />
          <ProfileCard
            label="StopStalk"
            info={data.stop_stalk_id}
            edit={true}
            placeholder="StopStalk account URL"
            onChange={(e) => handleInputChange("stop_stalk_id", e)}
          />
          <ProfileCard
            label="Facebook"
            info={data.facebook_id}
            edit={true}
            placeholder="Facebook account URL"
            onChange={(e) => handleInputChange("facebook_id", e)}
          />
          <div className="mb-2 col-span-2">
            <p className="text-xs font-semibold">CV</p>
            <div className="flex gap-2 items-center">
              {data?.cv ? (
                <Link href={data?.cv as string} target="_blank">
                  <Button variant={"outline_red"}>View CV</Button>
                </Link>
              ) : (
                <p className="text-slate-500">Not Available</p>
              )}
              <CldUploadButton
                onUpload={handleCVUpload}
                uploadPreset={process.env.NEXT_PUBLIC_Assets_UPLOAD_PRESET}
                className={`border border-input bg-background hover:bg-accent hover:text-accent-foreground flex gap-1 p-2 rounded-md items-center`}
              >
                <UploadCloud />
                <div className="flex items-end gap-2">
                  <p>{data?.cv ? "Update" : "Upload"} CV</p>
                  <p className="text-[10px]">PDF only</p>
                </div>
              </CldUploadButton>
              <Button variant={"outline_red"} onClick={handleRemoveCV}>
                <Trash2 /> Remove CV
              </Button>
            </div>
          </div>
        </div>
        <EditProject
          projects={data.projects}
          onChange={(projects) => setData({ ...data, projects })}
        />
        <ProfileCard
          label="Skills"
          info="Your skills go here......"
          edit={true}
          className="disabled mb-2"
        />
      </>
      <div className="flex w-full justify-end gap-3">
        <Button
          variant="outline_red"
          className="gap-2"
          onClick={() => setUpdating(false)}
        >
          <CircleX /> Cancel
        </Button>
        <Button
          variant="outline_red"
          className="gap-2"
          disabled={saving}
          onClick={handleSave}
        >
          {saving ? (
            <>
              <LoaderIcon className="animate-spin" /> Saving
            </>
          ) : (
            <>
              <Save /> Save
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default EditProfile;
