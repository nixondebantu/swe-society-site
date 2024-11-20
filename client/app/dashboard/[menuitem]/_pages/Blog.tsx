"use client";

import { APIENDPOINTS, BACKENDURL } from "@/data/urls";
import React, { useEffect, useState } from "react";
import { getUserID, getUserReg } from "@/data/cookies/getCookies";

import ElectionModal from "@/components/electiondashboard/CreateElectionModal";
import ElectionMemberDetails from "@/components/electiondashboard/CommmitteeMembers";
import BlogModal from "@/components/blogdashboard/AddBlogModal";
import BlogCard from "@/components/blogdashboard/BlogComp/BlogCard";

interface Blog {
    blogid: number;
    userid: number;
    headline: string;
    designation: string | null;
    current_institution: string | null;
    article: string;
    photos: string[];
    blogtype: string;
    approval_status: boolean;
    fullname: string | null;
  }

const BlogForUsers: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isShowFullBlog, setShowFullBlog] = useState(false);
    const [selectedElectionId, setSelectedElectionId] = useState<number | null>(null);
    
    const fetchBlogs = async () => {
        try {
          const response = await fetch(`${BACKENDURL}blog`);
          const data: Blog[] = await response.json();
          setBlogs(data);
        } catch (error) {
          console.error("Error fetching blogs:", error);
        }
      };
    useEffect(() => {
 
    
        fetchBlogs();
      }, []);
    




  return (
    <div className="flex flex-col items-center space-y-2 py-16 mb-16 h-screen ">
     <div className="w-full  mt-4 ">
         <div className="text-3xl text-center font-bold">Blogs</div>
      </div>
      {!isShowFullBlog && <>
         <div className="w-full flex justify-end "> 
         <button 
          onClick={() => setIsModalOpen(true)}
         className="bg-red-700 rounded-lg px-4 mr-2">+ Add Blog</button>
          </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-3  mr-4">
       {blogs.map((blog) => (
        <BlogCard
          key={blog.blogid}
          label={blog.blogtype}
          title={blog.headline}
          description={blog.article}
          author={blog.fullname || "Anonymous"}
          image={blog.photos[0] || null}
        />
      ))}
      </div>
      {isModalOpen && (
         <BlogModal onClose={() => setIsModalOpen(false)} fetchDataAll={fetchBlogs} />
      )}
      </>}

      {isShowFullBlog && selectedElectionId && <div className="w-full">
        {/* <ElectionMemberDetails electionId={selectedElectionId} setShowFullBlog={setShowFullBlog}/> */}
        </div>}
    </div>
  );
};

export default BlogForUsers;
