"use client";
import { Button } from "@/components/ui/button";
import { UserMinus, UserPlus, UserRoundSearch } from "lucide-react";
import React from "react";

interface MembersNavProps {
  membersOption: string;
  setMembersOption: React.Dispatch<React.SetStateAction<string>>;
}

const MembersNav: React.FC<MembersNavProps> = ({
  membersOption,
  setMembersOption,
}) => {
  return (
    <div className="flex gap-2">
      <Button
        variant={membersOption === "find" ? "default" : "outline_red"}
        onClick={() => setMembersOption("find")}
      >
        <UserRoundSearch />
        <p className="hidden sm:contents">Show Members</p>
      </Button>
      <Button
        variant={membersOption === "add" ? "default" : "outline_red"}
        onClick={() => setMembersOption("add")}
      >
        <UserPlus />
        <p className="hidden sm:contents">Add Members</p>
      </Button>
      <Button
        variant={membersOption === "del" ? "default" : "outline_red"}
        onClick={() => setMembersOption("del")}
      >
        <UserMinus />
        <p className="hidden sm:contents">Remove Members</p>
      </Button>
    </div>
  );
};

export default MembersNav;
