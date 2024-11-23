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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserID } from "@/data/cookies/getCookies";
import axios from "axios";
import { format } from "date-fns";
import { Edit } from "lucide-react";
import React, { useState } from "react";
import { upload_img } from "./uploadImage";

function EditNotice(props: any) {
  const [notice, setNotice] = useState({
    notice_provider: props.notice_provider,
    notice_date: props.notice_date,
    expire_date: props.expire_date,
    headline: props.headline,
    notice_body: props.notice_body,
    picture: props.picture,
    file: props.file,
  });

  const [notice_date, setNotice_date] = useState<Date>(props.notice_date);
  const [expire_date, setExpire_date] = useState<Date | null>(
    props.expire_date || null
  );
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

        setUploadingStatus("success");
      } catch (error) {
        console.error("File upload failed:", error);
        setUploadingStatus("error");
      }
    }
  };

  const handleSubmit = async (e: any) => {
    const userId = getUserID();

    const updatedNotice = {
      ...notice,
      notice_provider: userId,
      notice_date: notice_date ? format(notice_date, "yyyy-MM-dd") : "",
      expire_date: expire_date ? format(expire_date, "yyyy-MM-dd") : "",
    };
    try {
      await axios
        .put(`${BACKENDURL}notice/${props.noticeid}`, updatedNotice)
        .then((res) => {
          console.log(res.data);
          props.fetch_notices();
        });
    } catch (error) {
      console.error("Error submitting notice:", error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-blue-300 hover:text-blue-600 hover:bg-blue-100/10"
        >
          <Edit className="h-4 w-4" />
        </Button>
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
                  onChange={(e) => {
                    if (e.target.value) {
                      setNotice_date(new Date(e.target.value));
                    }
                  }}
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
                      e.target.value ? new Date(e.target.value) : null
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

export default EditNotice;