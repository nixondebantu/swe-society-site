"use client";
import { BACKENDURL } from "@/data/urls";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { DatePicker } from "../commons/DatePicker";
import { getJWT } from "@/data/cookies/getCookies";

interface ElectionModalProps {
  onClose: () => void;
  fetchData: () => void;
}

interface UserResponse {
  userid: number;
  regno: string;
  fullname: string;
}

interface MappedUser {
  id: number;
  value: number;
  label: string;
}

interface ElectionFormData {
  year: string;
  election_type: string;
  candidate_form_date: string;
  election_date: string;
  election_commissioner?: number;
  assistant_commissioner?: number;
}

const ElectionModal: React.FC<ElectionModalProps> = ({ onClose ,fetchData}) => {
  const [userList, setUserList] = useState<MappedUser[]>([]);
  const [formData, setFormData] = useState<ElectionFormData>({
    year: "",
    election_type: "",
    candidate_form_date: "",
    election_date: "",
  });

  const notify = () => toast('Election created successfully.');



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOption: MappedUser | null, field: keyof ElectionFormData) => {
    setFormData((prev) => ({ ...prev, [field]: selectedOption ? selectedOption.value : undefined }));
  };

  const handleDateChange = (date: string, field: keyof ElectionFormData) => {
    setFormData((prev) => ({ ...prev, [field]: date }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        console.log(formData);
        const response = await axios.post(
            `${BACKENDURL}election/newelection/create`, 
            formData,
            {
              headers: {
                Authorization: `Bearer ${getJWT()}`,
              },
            }
          );
      if (response.status === 201 || response.status === 200) {
        notify();
        onClose();
        fetchData();
      }
    } catch (error) {
      console.error("Error creating election:", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BACKENDURL}users/`);
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data: UserResponse[] = await response.json();
        const mappedData: MappedUser[] = data // Filter regno starting with "2000"
          .map((user) => ({
            id: user.userid,
            value: user.userid,
            label: `${user.fullname} - ${user.regno}`,
          }));
        setUserList(mappedData);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black text-white p-8 rounded-lg w-full max-w-lg">
       
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4">Create New Election</h2>
          <button
            onClick={onClose}
            className="bg-gray-200 p-1 w-5 h-5 flex justify-center items-center rounded-full text-black"
          >
            X
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleInputChange}
            className="w-full p-2 rounded border"
          />
          <select
  name="election_type"
  value={formData.election_type}
  onChange={handleInputChange}
  className="w-full p-2 rounded border"
>
  <option value="">Select Election Type</option>
  <option value="Society">Society</option>
  <option value="Batch">Batch</option>
</select>
          <div className="space-y-2">
            <label className="text-sm font-medium">Candidate Form Date</label>
            <DatePicker onDateChange={(date) => handleDateChange(date, "candidate_form_date")} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Election Date</label>
            <DatePicker onDateChange={(date) => handleDateChange(date, "election_date")} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Election Commissioner</label>
            <Select
              options={userList}
              onChange={(option) => handleSelectChange(option, "election_commissioner")}
              className="border rounded w-full text-gray-800 bg-gray-100 leading-tight focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Assistant Commissioner</label>
            <Select
              options={userList}
              onChange={(option) => handleSelectChange(option, "assistant_commissioner")}
              className="border rounded w-full text-gray-800 bg-gray-100 leading-tight focus:outline-none"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white rounded px-4 py-2"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-red-600 text-white rounded px-4 py-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ElectionModal;