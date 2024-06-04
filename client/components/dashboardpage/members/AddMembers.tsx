"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { MemberRowType } from "@/data/types";
import { BACKENDURL } from "@/data/urls";
import axios from "axios";
import { LoaderCircle, Trash2 } from "lucide-react";
import React, { useState } from "react";
import FileUpload from "./FileUpload";

const AddMembers: React.FC = () => {
  const { toast } = useToast();
  const [members, setMembers] = useState<MemberRowType[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [addingMember, setAddingMember] = useState<boolean>(false);

  const removeMember = (indexToRemove: number) => {
    const updatedMembers = members.filter(
      (_, index) => index !== indexToRemove
    );
    setMembers(updatedMembers);
  };

  const addMember = async () => {
    setAddingMember(true);
    console.log(members);
    try {
      const response = await axios.post(
        `${BACKENDURL}auth/multiUserCreate`,
        members
      );
      console.log(response);
      if (response.status === 201) {
        toast({
          title: "Successfully member added",
          description: `You have added ${members.length} member successfully`,
        });
      } else {
        toast({
          title: `Status: ${response.status}`,
          description: response.data.message,
        });
      }
      setMembers([]);
    } catch (error) {
      toast({
        title: "Error!!",
      });
      console.log(error);
    }

    setAddingMember(false);
    setOpenDialog(false);
  };

  return (
    <div className="flex flex-col items-center h-screen">
      {members.length ? (
        <>
          <h1 className="font-extrabold text-xl py-2">
            Uplaoded User{members.length !== 1 ? "s" : ""} Information
          </h1>
          {members.map((row, index) => (
            <div className="flex gap-2 w-full" key={index}>
              <div
                className="grid grid-cols-9 items-center p-2 w-full"
                key={index}
              >
                <p className="text-slate-300 text-sm col-span-2">{row.regno}</p>
                <p className="col-span-2">{row.session}</p>
                <p className="col-span-4">{row.email}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeMember(index)}
                  className="col-span-1"
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="flex flex-col justify-center h-full items-center text-neutral-500 flex-grow">
          <h1>To add member upload CSV</h1>
          <h1>or</h1>
          <h1>enter information manually</h1>
        </div>
      )}
      <div className="flex flex-col justify-center space-y-2 my-2">
        <FileUpload members={members} setMembers={setMembers} />
        <div className="flex justify-center gap-2 items-center mt-4">
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button disabled={!members.length}>
                Add Member{members.length !== 1 ? "s" : ""}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                Add Member{members.length !== 1 ? "s" : ""}
              </DialogHeader>
              <DialogDescription>
                Are you sure to add {members.length} member
                {members.length !== 1 ? "s" : ""} as general member?
              </DialogDescription>
              <div className="flex justify-end gap-3">
                <DialogTrigger asChild>
                  {!addingMember && <Button variant="outline">Cancle</Button>}
                </DialogTrigger>
                {addingMember ? (
                  <Button variant="ghost" disabled className="gap-2">
                    <LoaderCircle className="animate-spin" />
                    Adding Member{members.length !== 1 ? "s" : ""}
                  </Button>
                ) : (
                  <Button onClick={addMember}>Confirm</Button>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AddMembers;
