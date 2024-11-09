"use client";
import { BACKENDURL } from "@/data/urls";
import React, { useEffect, useState } from "react";
import Select, { MultiValue, ActionMeta } from "react-select";
interface AchievementFormProps {
  onClose: () => void;
  onSubmit: (formData: any) => void;
}

interface UserResponse {
  userid: number;
  regno: string;
  // other properties if needed
}

interface MappedUser {
  id: number;
  value: number;
  label: string;
}


const AchievementModal: React.FC<AchievementFormProps> = ({ onClose, onSubmit }) => {
  const [userList, setUserList] = useState<MappedUser[]>([]);
  const [formData, setFormData] = useState({
    teamname: "",
    mentor: "",
    teammembers: [] as number[],
    eventname: "",
    segment: "",
    rank: "",
    photos: "",
    task: "",
    solution: "",
    techstack: "",
    resources: "",
    others: [{ othermember: "", other_member_institute: "" }],
    startdate: "",
    enddate: "",
    organizer: "",
    venue: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleSelectChange = (selectedOptions: MultiValue<MappedUser>) => {
    const selectedIds = selectedOptions.map(option => option.id);
    setFormData((prev) => ({
      ...prev,
      teammembers: selectedIds,
    }));
    console.log(formData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BACKENDURL}users/`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        
        const data: UserResponse[] = await response.json();

        // Map the response to the required structure
        const mappedData: MappedUser[] = data.map((user) => ({
          id: user.userid,
          value: user.userid,
          label: user.regno,
        }));

        setUserList(mappedData);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);


 


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black text-white p-8 rounded-lg w-full max-w-2xl">
        <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Add Achievement</h2>
        <button 
        onClick={()=>{onClose()}}
        className="bg-white p-1 m-2 text-black w-5 h-5 flex justify-center items-center rounded-full">X</button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 h-[70vh] overflow-y-scroll px-2">
          <input
            type="text"
            placeholder="Team Name"
            value={formData.teamname}
            onChange={(e) => handleChange(e, "teamname")}
            className="w-full p-2 rounded bg-gray-700"
          />
          <input
            type="text"
            placeholder="Mentor"
            value={formData.mentor}
            onChange={(e) => handleChange(e, "mentor")}
            className="w-full p-2 rounded bg-gray-700"
          />
           <Select
            name="Team Members"
            isMulti
            options={userList}
            className=" border rounded w-full   text-gray-200 bg-gray-700 leading-tight focus:outline-none"
            onChange={handleSelectChange}
          />
          <div className="w-full text-sm flex justify-end">
              <button className="underline text-red-400">Add member from another department / institution</button>

          </div>
          <input
            type="text"
            placeholder="Event Name"
            value={formData.eventname}
            onChange={(e) => handleChange(e, "eventname")}
            className="w-full p-2 rounded bg-gray-700"
          />
          <input
            type="text"
            placeholder="Segment"
            value={formData.segment}
            onChange={(e) => handleChange(e, "segment")}
            className="w-full p-2 rounded bg-gray-700"
          />
          <input
            type="text"
            placeholder="Rank"
            value={formData.rank}
            onChange={(e) => handleChange(e, "rank")}
            className="w-full p-2 rounded bg-gray-700"
          />
          <textarea
            placeholder="Task"
            value={formData.task}
            onChange={(e) => handleChange(e, "task")}
            className="w-full p-2 rounded bg-gray-700"
          />
          <textarea
            placeholder="Solution"
            value={formData.solution}
            onChange={(e) => handleChange(e, "solution")}
            className="w-full p-2 rounded bg-gray-700"
          />
          <input
            type="text"
            placeholder="Tech Stack"
            value={formData.techstack}
            onChange={(e) => handleChange(e, "techstack")}
            className="w-full p-2 rounded bg-gray-700"
          />
          <input
            type="text"
            placeholder="Resources"
            value={formData.resources}
            onChange={(e) => handleChange(e, "resources")}
            className="w-full p-2 rounded bg-gray-700"
          />
          <input
            type="text"
            placeholder="Start Date"
            value={formData.startdate}
            onChange={(e) => handleChange(e, "startdate")}
            className="w-full p-2 rounded bg-gray-700"
          />
          <input
            type="text"
            placeholder="End Date"
            value={formData.enddate}
            onChange={(e) => handleChange(e, "enddate")}
            className="w-full p-2 rounded bg-gray-700"
          />
          <input
            type="text"
            placeholder="Organizer"
            value={formData.organizer}
            onChange={(e) => handleChange(e, "organizer")}
            className="w-full p-2 rounded bg-gray-700"
          />
          <input
            type="text"
            placeholder="Venue"
            value={formData.venue}
            onChange={(e) => handleChange(e, "venue")}
            className="w-full p-2 rounded bg-gray-700"
          />
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-700 rounded px-4 py-2"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-green-600 rounded px-4 py-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AchievementModal;
