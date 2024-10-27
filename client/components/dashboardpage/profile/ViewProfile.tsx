"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { UserProfile } from "@/data/types";
import {
  CircleSlash,
  Facebook,
  FileText,
  GithubIcon,
  LinkedinIcon,
  LucideLink,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import ProfileCard from "./ProfileCard";
interface ViewProfileProps {
  values: UserProfile | undefined;
}

const ViewProfile: React.FC<ViewProfileProps> = ({ values }) => {
  const { toast } = useToast();
  const NA = () => {
    toast({
      title: "Not Available",
      duration: 1000,
    });
  };
  return (
    <div className="w-full py-2">
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <ProfileCard
            label="Name"
            info={values?.fullname}
            placeholder="Full Name"
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
            placeholder="2020-21"
            edit={false}
            className="col-span-3 mb-2"
          />
          <ProfileCard
            label="Email"
            info={values?.email}
            edit={false}
            placeholder="abc@gmail.com"
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
            <p className="px-4 text-center text-background bg-primary text-sm sm:text-base font-bold rounded-full text-wrap">
              Alumnus
            </p>
          ) : (
            <p className="sm:px-4 px-[2px] text-center text-primary text-xs sm:text-base font-bold rounded-full border border-primary">
              {values?.role}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <ProfileCard
          label="Phone Number"
          info={values?.phone_number}
          placeholder="+8801........."
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
        placeholder="Hi, I am ....."
        disabled
        className="disabled:cursor-default disabled:opacity-100 mb-2"
      />
      <div className="grid grid-cols-2 gap-2">
        <ProfileCard
          label="Home Town"
          info={values?.hometown}
          placeholder="District Name"
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
          placeholder="College Name"
          edit={false}
          className="mb-2"
        />
        <ProfileCard
          label="High School"
          info={values?.school}
          placeholder="School Name"
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
              <Button variant={"outline"} size={"icon"} onClick={NA}>
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
              <Button variant={"outline"} size={"icon"} onClick={NA}>
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
              <Button variant={"outline"} size={"icon"} onClick={NA}>
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
              <Button variant={"outline"} size={"icon"} onClick={NA}>
                <Facebook />
              </Button>
            )}
          </div>
        </div>
        <div className="sm:col-start-2 col-start-1">
          <p className="text-xs font-semibold">CV</p>
          {values?.cv ? (
            <Link href={values?.cv} target="_blank">
              <Button variant={"outline_red"} className="gap-2">
                View CV
              </Button>
            </Link>
          ) : (
            <Button variant={"outline"} className="gap-2" onClick={NA}>
              <FileText />
              View CV
            </Button>
          )}
        </div>
      </div>
      <p className="text-xs font-semibold">Projects</p>
      <div className="flex gap-2 mb-2 flex-wrap">
        {values?.projects && values.projects.length > 0 ? (
          values.projects.map((url, index) => (
            <Link href={url} key={index}>
              <Button variant={"outline_red"} size={"icon"}>
                <LucideLink />
              </Button>
            </Link>
          ))
        ) : (
          <p className="text-sm text-gray-500">N/A</p>
        )}
      </div>
      <ProfileCard
        label="Skills"
        info="Your skills goes here......"
        edit={false}
        className="mb-2"
      />
    </div>
  );
};

export default ViewProfile;
