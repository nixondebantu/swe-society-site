"use client";
import { BACKENDURL } from "@/data/urls";
import React, { useEffect, useState } from "react";
import Select, { MultiValue } from "react-select";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { getJWT } from "@/data/cookies/getCookies";
import { CldUploadButton } from "next-cloudinary";
import { UploadCloud, Pencil } from "lucide-react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface BlogFormProps {
  onClose: () => void;
}

interface FormData {
  userid: number;
  headline: string;
  designation: string;
  current_institution: string;
  article: string;
  photos: string[];
  blogtype: string;
  approval_status: boolean;
}

const BlogModal: React.FC<BlogFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    userid: 2,  // Set a default or fetch as needed
    headline: "",
    designation: "",
    current_institution: "",
    article: "",
    photos: [],
    blogtype: "Technology",
    approval_status: true,
  });

  // Tiptap editor instance
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Write your article here...</p>",
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, article: editor.getHTML() }));
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleBlogImages = (result: any) => {
    const uploadedURL = result.info.secure_url;
    setFormData((prevData) => ({
      ...prevData,
      photos: [...prevData.photos, uploadedURL],
    }));
  };

  const removePhoto = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      photos: prevData.photos.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await axios.post(`${BACKENDURL}/blog/create`, formData, {
      headers: {
        Authorization: `Bearer ${getJWT()}`,
      },
    });

    if (response.status === 201) {
      toast.success("Blog created successfully!");
      onClose();
      window.location.reload();
    } else {
      toast.error("Failed to create blog. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white text-gray-800 p-8 rounded-lg w-full max-w-2xl">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4">Add Blog</h2>
          <button
            onClick={onClose}
            className="bg-gray-300 p-1 m-2 text-gray-700 w-5 h-5 flex justify-center items-center rounded-full"
          >
            X
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 h-[70vh] overflow-y-scroll px-2">
          <input
            type="text"
            placeholder="Headline"
            value={formData.headline}
            onChange={(e) => handleChange(e, "headline")}
            className="w-full p-2 rounded bg-gray-100 border"
          />
          <input
            type="text"
            placeholder="Designation"
            value={formData.designation}
            onChange={(e) => handleChange(e, "designation")}
            className="w-full p-2 rounded bg-gray-100 border"
          />
          <input
            type="text"
            placeholder="Current Institution"
            value={formData.current_institution}
            onChange={(e) => handleChange(e, "current_institution")}
            className="w-full p-2 rounded bg-gray-100 border"
          />

          <label className="text-lg font-semibold">Article</label>
          <EditorContent editor={editor} className="bg-gray-100 p-4 rounded border" />

          <div className="mt-4">
            <CldUploadButton
              onUpload={handleBlogImages}
              uploadPreset={process.env.NEXT_PUBLIC_IMG_UPLOAD_PRESET}
              className="flex items-center space-x-2 bg-blue-500 text-white rounded-full p-2"
            >
              <UploadCloud size={20} />
              <span>Upload Image</span>
              <Pencil size={20} />
            </CldUploadButton>
          </div>

          {formData.photos.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Uploaded Photos</h3>
              <div className="grid grid-cols-4 gap-4">
                {formData.photos.map((photoUrl, index) => (
                  <div key={index} className="relative">
                    <button
                      onClick={() => removePhoto(index)}
                      className="absolute top-2 left-2 bg-red-600 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                      aria-label="Remove photo"
                    >
                      &times;
                    </button>
                    <img src={photoUrl} alt={`Uploaded photo ${index + 1}`} className="w-full h-32 object-cover rounded" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white rounded px-4 py-2 mt-4"
          >
            Submit
          </button>
        </form>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default BlogModal;
