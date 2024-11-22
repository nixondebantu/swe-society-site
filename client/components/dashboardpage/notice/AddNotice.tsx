"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React, { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserID } from "@/data/cookies/getCookies";
import axios from "axios";
import { format } from "date-fns";
import { IoIosAddCircleOutline } from "react-icons/io";
import { upload_img } from "./uploadImage";
// import { cookies } from 'next/headers';

type AddNoticeProps = {
  fetch_notices: () => void;
};

function AddNotice({ fetch_notices }: AddNoticeProps) {
  const [notice, setNotice] = useState({
    notice_provider: 0,
    notice_date: "",
    expire_date: "",
    headline: "",
    notice_body: "",
    picture: "",
    file: "",
  });

  const [notice_date, setNotice_date] = useState<Date>();
  const [expire_date, setExpire_date] = useState<Date>();
  const [uploadingStatus, setUploadingStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");

  const handleNoticeChange = (field: string, value: any) => {
    setNotice((prevNotice) => ({
      ...prevNotice,
      [field]: value,
    }));
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUploadingStatus("uploading");
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const fileUrl = await upload_img(formData);
        handleNoticeChange("file", fileUrl);
        console.log("Uploaded file URL:", fileUrl);

        setUploadingStatus("success");
      } catch (error) {
        console.error("File upload failed:", error);
        setUploadingStatus("error");
      }
    }
  };

  const handleSubmit = async (e: any) => {
    const userId = getUserID();
    console.log(userId);
    const updatedNotice = {
      ...notice,
      notice_provider: userId || 3,
      notice_date: notice_date ? format(notice_date, "yyyy-MM-dd") : "",
      expire_date: expire_date ? format(expire_date, "yyyy-MM-dd") : "",
    };

    try {
      axios
        .post("http://localhost:5050/notice/create", updatedNotice)
        .then((res) => {
          console.log(res);
          fetch_notices();
        });
    } catch (error) {
      console.error("Error submitting notice:", error);
    }
  };

  const isFormComplete = () => {
    return (
      notice.notice_provider !== 0 &&
      notice.notice_date &&
      notice.expire_date &&
      notice.headline &&
      notice.notice_body &&
      notice.file
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-primary flex items-center text-primary-foreground hover:bg-primary/90 rounded-lg font-bold px-4 py-2">
        <IoIosAddCircleOutline className="mr-2 text-2xl" /> Add Notice
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-5">Add Notice</AlertDialogTitle>
          <form className="flex flex-col space-y-5">
            <Label>Enter notice details</Label>

            <div className="flex flex-col space-y-2">
              <Label className="font-bold">Title</Label>
              <Input
                value={notice.headline}
                onChange={(e) => handleNoticeChange("headline", e.target.value)}
                className="w-full border-2 border-input"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label className="font-bold">Description</Label>
              <Input
                value={notice.notice_body}
                onChange={(e) =>
                  handleNoticeChange("notice_body", e.target.value)
                }
                className="w-full h-32 border-2 border-input"
              />
            </div>

            <div className="flex justify-between space-x-5">
              <div className="w-1/2 flex flex-col space-y-2">
                <Label className="font-bold">Notice Date</Label>
                <Input
                  type="date"
                  value={notice_date ? format(notice_date, "yyyy-MM-dd") : ""}
                  onChange={(e) =>
                    setNotice_date(
                      e.target.value ? new Date(e.target.value) : undefined
                    )
                  }
                  className="w-full"
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-2">
                <Label className="font-bold">Expire Date</Label>
                <Input
                  type="date"
                  value={expire_date ? format(expire_date, "yyyy-MM-dd") : ""}
                  onChange={(e) =>
                    setExpire_date(
                      e.target.value ? new Date(e.target.value) : undefined
                    )
                  }
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <Label className="font-bold">Upload a file</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full border-2 border-input"
                />
                {uploadingStatus === "uploading" && (
                  <span className="text-yellow-600 font-bold">
                    Uploading...
                  </span>
                )}
                {uploadingStatus === "success" && (
                  <span className="text-green-600 font-bold">Uploaded</span>
                )}
                {uploadingStatus === "error" && (
                  <span className="text-red-600 font-bold">Upload failed</span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label htmlFor="terms" className="text-sm font-medium">
                Notify all members
              </label>
            </div>
          </form>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleSubmit}>
            Publish Now
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AddNotice;
