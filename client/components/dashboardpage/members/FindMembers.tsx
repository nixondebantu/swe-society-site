"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MemberDataType } from "@/data/types";
import { APIENDPOINTS } from "@/data/urls";
import axios from "axios";
import { InfoIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const FindMembers: React.FC = () => {
  const [list, setList] = useState<MemberDataType[]>([]);
  const [findby, setFindby] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<MemberDataType[]>(
          APIENDPOINTS.users.getAllUsers
        );
        console.log(response.data);
        setList(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  // Filter list based on findby string
  const filteredList = list.filter(
    (row) =>
      row.regno?.includes(findby) ||
      row.fullname?.toLowerCase().includes(findby.toLowerCase()) ||
      row.session?.includes(findby)
  );

  return (
    <div className="w-full flex flex-col items-center">
      <Input
        placeholder="Search by reg, name and session"
        className="my-2 max-w-96"
        value={findby}
        onChange={(e) => setFindby(e.target.value)}
      />
      <div className="flex w-full max-w-4xl items-center">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reg. Number</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Session</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredList.map((row: MemberDataType, index: number) => (
              <TableRow key={row.regno}>
                <TableCell className="font-medium">{row.regno}</TableCell>
                <TableCell>{row.fullname}</TableCell>
                <TableCell>{row.session}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <InfoIcon className="hover:text-primary cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage src={row.profile_picture as string} />
                            <AvatarFallback>SWE</AvatarFallback>
                          </Avatar>
                          {row.fullname}
                        </DialogTitle>
                        <DialogDescription>
                          <p>
                            <strong>Reg No: </strong>
                            {row.regno}
                          </p>
                          <p>
                            <strong>Session: </strong>
                            {row.session}
                          </p>
                          <p>
                            <strong>Email: </strong>
                            {row.email}
                          </p>
                          <p>
                            <strong>Phone: </strong>
                            {row.phone_number}
                          </p>
                          <p>
                            <strong>Blood Group: </strong>
                            {row.blood_group}
                          </p>
                          <p>
                            <strong>Home Town: </strong>
                            {row.hometown}
                          </p>
                          <p>
                            <strong>School: </strong>
                            {row.school}
                          </p>
                          <p>
                            <strong>College: </strong>
                            {row.college}
                          </p>
                          <p>
                            <strong>Role: </strong>
                            {row.role}
                          </p>
                          <p>
                            <strong>Bio: </strong>
                            {row.bio}
                          </p>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FindMembers;
