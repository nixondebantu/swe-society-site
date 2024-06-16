"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UserProfile } from "@/data/types";
import { CircleX, Save } from "lucide-react";
import React, { useState } from "react";
import ProfileCard from "./ProfileCard";

interface EditProfileProps {
  values: UserProfile | undefined;
  setUpdating: React.Dispatch<React.SetStateAction<boolean>>;
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

const EditProfile: React.FC<EditProfileProps> = ({ values, setUpdating }) => {
  const [data, setData] = useState<UserProfile>(values ?? defaultUserProfile);

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
    setUpdating(false);
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
          <div className="flex flex-col w-full items-center -z-10">
            <Avatar className="w-fit h-fit p-2">
              <AvatarImage
                src={data.profile_picture}
                className="rounded-full border-2 border-white p-2"
              />
            </Avatar>
            {data.is_alumni ? (
              <p className="px-4 text-background bg-primary text-sm sm:text-base font-bold rounded-full text-wrap">
                Alumnus
              </p>
            ) : (
              <p className="sm:px-4 px-1 text-primary text-xs sm:text-base font-bold rounded-full border border-primary">
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
            placeholder="Phone Number"
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
          placeholder="Your Bio Here"
          onChange={(e) => handleInputChange("bio", e.target.value)}
          className="disabled:cursor-default disabled:opacity-100 mb-2"
        />
        <div className="grid grid-cols-2 gap-2">
          <ProfileCard
            label="Home Town"
            info={data.hometown}
            edit={true}
            placeholder="Hometown District"
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
          <ProfileCard
            label="CV"
            info={data.cv as string}
            edit={true}
            placeholder="CV URL"
            onChange={(e) => handleInputChange("cv", e)}
          />
        </div>

        <ProfileCard
          label="Projects"
          info={data.projects as string}
          edit={true}
          className="disabled mb-2"
          onChange={(e) => handleInputChange("projects", e)}
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
        <Button variant="outline_red" className="gap-2" onClick={handleSave}>
          <Save /> Save
        </Button>
      </div>
    </div>
  );
};

export default EditProfile;
