import React, { useState } from "react";

interface AchievementFormProps {
  onClose: () => void;
  onSubmit: (formData: any) => void;
}

const AchievementModal: React.FC<AchievementFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    teamname: "",
    mentor: "",
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black text-white p-8 rounded-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Add Achievement</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
