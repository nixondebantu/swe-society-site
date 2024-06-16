"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UserProfile } from "@/data/types";
import {
  CircleSlash,
  Facebook,
  FileText,
  GithubIcon,
  LinkedinIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import ProfileCard from "./ProfileCard";
interface ViewProfileProps {
  values: UserProfile | undefined;
  setUpdating: React.Dispatch<React.SetStateAction<boolean>>;
}

const ViewProfile: React.FC<ViewProfileProps> = ({ values, setUpdating }) => {
  return (
    <div className="w-full py-2">
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <ProfileCard
            label="Name"
            info={values?.fullname}
            edit={false}
            className="col-span-3 mb-2"
          />
          <ProfileCard
            label="Registration no"
            info={values?.regno}
            edit={false}
            className="col-span-3 mb-2"
          />
          <ProfileCard
            label="Session"
            info={values?.session}
            edit={false}
            className="col-span-3 mb-2"
          />
          <ProfileCard
            label="Email"
            info={values?.email}
            edit={false}
            className="col-span-3 mb-2"
          />
        </div>
        <div className="flex flex-col w-full items-center -z-10">
          <Avatar className="w-fit h-fit p-2">
            <AvatarImage
              src={values?.profile_picture}
              className="rounded-full border-2 border-white p-2"
            />
          </Avatar>
          {values?.is_alumni ? (
            <p className="px-4 text-background bg-primary text-sm sm:text-base font-bold rounded-full text-wrap">
              Alumnus
            </p>
          ) : (
            <p className="sm:px-4 px-1 text-primary text-xs sm:text-base font-bold rounded-full border border-primary">
              {values?.role}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <ProfileCard
          label="Phone Number"
          info={values?.phone_number}
          edit={false}
          className="mb-2"
        />
        <ProfileCard
          label="WhatsApp Number"
          info={values?.whatsapp}
          edit={false}
          placeholder="Your whatsapp number"
          className="mb-2"
        />
      </div>
      <p className="text-xs font-semibold">Bio</p>
      <Textarea
        value={values?.bio}
        disabled
        className="disabled:cursor-default disabled:opacity-100 mb-2"
      />
      <div className="grid grid-cols-2 gap-2">
        <ProfileCard
          label="Home Town"
          info={values?.hometown}
          edit={false}
          className="mb-2"
        />
        <ProfileCard
          label="Blood Group"
          info={values?.blood_group}
          edit={false}
          className="mb-2"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <ProfileCard
          label="College"
          info={values?.college}
          edit={false}
          className="mb-2"
        />
        <ProfileCard
          label="High School"
          info={values?.school}
          edit={false}
          className="mb-2"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <div>
          <p className="text-xs font-semibold">Socials</p>
          <div className="flex gap-2">
            {values?.linkedin_id ? (
              <Link href={values?.linkedin_id} target="_blank">
                <Button variant={"outline_red"} size={"icon"}>
                  <LinkedinIcon />
                </Button>
              </Link>
            ) : (
              <Button variant={"outline"} size={"icon"}>
                <LinkedinIcon />
              </Button>
            )}
            {values?.github_id ? (
              <Link href={values?.github_id} target="_blank">
                <Button variant={"outline_red"} size={"icon"}>
                  <GithubIcon />
                </Button>
              </Link>
            ) : (
              <Button variant={"outline"} size={"icon"}>
                <GithubIcon />
              </Button>
            )}
            {values?.stop_stalk_id ? (
              <Link href={values?.stop_stalk_id} target="_blank">
                <Button variant={"outline_red"} size={"icon"}>
                  <CircleSlash />
                </Button>
              </Link>
            ) : (
              <Button variant={"outline"} size={"icon"}>
                <CircleSlash />
              </Button>
            )}
            {values?.facebook_id ? (
              <Link href={values?.facebook_id} target="_blank">
                <Button variant={"outline_red"} size={"icon"}>
                  <Facebook />
                </Button>
              </Link>
            ) : (
              <Button variant={"outline"} size={"icon"}>
                <Facebook />
              </Button>
            )}
          </div>
        </div>
        <div className="sm:col-start-2 col-start-1">
          <p className="text-xs font-semibold">CV</p>
          {values?.cv ? (
            <Link href={values?.cv}>
              <Button variant={"outline_red"} className="gap-2">
                CV
              </Button>
            </Link>
          ) : (
            <Button variant={"outline"} className="gap-2">
              <FileText />
              CV
            </Button>
          )}
        </div>
      </div>
      <ProfileCard
        label="Projects"
        info={values?.projects as string}
        edit={false}
        className="disabled mb-2"
      />
      <ProfileCard
        label="Skills"
        info="Your skills goes here......"
        edit={false}
        className="disabled mb-2"
      />
    </div>
  );
};

export default ViewProfile;
