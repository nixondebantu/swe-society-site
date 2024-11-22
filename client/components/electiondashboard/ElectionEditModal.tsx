import { BACKENDURL } from "@/data/urls";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { DatePicker } from "../commons/DatePicker";
import { getJWT } from "@/data/cookies/getCookies";
import { DatePickerOptimized } from "../commons/DatePickerOptimized";

interface ElectionModalProps {
  onClose: () => void;
  prevformData: ElectionFormData;
  electionId: number;
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

const ElectionEditModal: React.FC<ElectionModalProps> = ({fetchData, onClose, prevformData, electionId }) => {
  const [userList, setUserList] = useState<MappedUser[]>([]);
  const [isEditingCommissioner, setIsEditingCommissioner] = useState(false);
const [isEditingAssistant, setIsEditingAssistant] = useState(false);
const [commissionerName, setcommissionerName] = useState("");
const [assistantCommissionerName, setassistantCommissionerName]= useState("");
  const [formData, setFormData] = useState<ElectionFormData>({
    year: prevformData.year,
    election_type: prevformData.election_type,
    candidate_form_date: prevformData.candidate_form_date,
    election_date: prevformData.election_date,
    election_commissioner: prevformData.election_commissioner,
    assistant_commissioner: prevformData.assistant_commissioner
  });



  const notify = () => toast('Election Updated successfully.');

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
      const response = await axios.put(
        `${BACKENDURL}election/newelection/${electionId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getJWT()}`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        notify();
        onClose();
        fetchData();
      }
    } catch (error) {
      console.error("Error creating election:", error);
    }
  };

  useEffect(() => {
    console.log(prevformData);
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BACKENDURL}users/`);
        if (!response.ok) throw new Error("Network response was not ok");

        const data: UserResponse[] = await response.json();
        const mappedData: MappedUser[] = data.map((user) => ({
          id: user.userid,
          value: user.userid,
          label: `${user.fullname} - ${user.regno}`,
        }));
        setUserList(mappedData);
// console.log(data);
        const commissioner = data.find(user => user.userid === prevformData.election_commissioner);
      const assistantCommissioner = data.find(user => user.userid === prevformData.assistant_commissioner);
            console.log(commissioner);
            console.log("election commission", prevformData.election_commissioner);
      setcommissionerName(commissioner ? commissioner.fullname : "");
      setassistantCommissionerName(assistantCommissioner ? assistantCommissioner.fullname : "");

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
          <h2 className="text-2xl font-bold mb-4">Edit Election for the election id {electionId}</h2>
          <button onClick={onClose} className="bg-gray-200 p-1 w-5 h-5 flex justify-center items-center rounded-full text-black">
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
            <DatePickerOptimized
              onDateChange={(date) => handleDateChange(date, "candidate_form_date")}
              initialDate={formData.candidate_form_date}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Election Date</label>
            <DatePickerOptimized
              onDateChange={(date) => handleDateChange(date, "election_date")}
              initialDate={formData.election_date}
            />
          </div>

        

          <div className="space-y-2">
  <label className="text-sm font-medium">Election Commissioner</label>
  {!isEditingCommissioner && commissionerName  ? (
    <div className="flex items-center justify-between">
      <span>{commissionerName}</span>
      <button 
        onClick={() => setIsEditingCommissioner(true)} 
        className="ml-2 text-blue-500 underline">
        Edit
      </button>
    </div>
  ) : (
    <Select
      options={userList}
      onChange={(option) => handleSelectChange(option, "election_commissioner")}
      defaultValue={userList.find(user => user.value === prevformData.election_commissioner)}
      className="border rounded w-full text-gray-800 bg-gray-100 leading-tight focus:outline-none"
    />
  )}
</div>

<div className="space-y-2">
  <label className="text-sm font-medium">Assistant Commissioner</label>
  {!isEditingAssistant && assistantCommissionerName ? (
    <div className="flex items-center justify-between">
      <span>{assistantCommissionerName}</span>
      <button 
        onClick={() => setIsEditingAssistant(true)} 
        className="ml-2 text-blue-500 underline">
        Edit
      </button>
    </div>
  ) : (
    <Select
      options={userList}
      onChange={(option) => handleSelectChange(option, "assistant_commissioner")}
      defaultValue={userList.find(user => user.value === prevformData.assistant_commissioner)}
      className="border rounded w-full text-gray-800 bg-gray-100 leading-tight focus:outline-none"
    />
  )}
</div>


          <div className="flex justify-end">
            
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

export default ElectionEditModal;