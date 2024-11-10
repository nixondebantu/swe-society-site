"use client";

import { APIENDPOINTS } from "@/data/urls";
import React, { useEffect, useState } from "react";
import { getUserID, getUserReg } from "@/data/cookies/getCookies";

import ElectionModal from "@/components/electiondashboard/CreateElectionModal";
import ElectionMemberDetails from "@/components/electiondashboard/CommmitteeMembers";
import BlogModal from "@/components/blogdashboard/AddBlogModal";


const BlogForUsers: React.FC = () => {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isShowFullCommitteee, setShowFullCommitteee] = useState(false);
    const [selectedElectionId, setSelectedElectionId] = useState<number | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${APIENDPOINTS.election.getAllElection}`);
                const data = await response.json();
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);




  return (
    <div className="flex flex-col items-center space-y-2 pt-16 h-screen">
     <div className="w-full  mt-4 ">
         <div className="text-3xl text-center font-bold">Blogs</div>
      </div>
      {!isShowFullCommitteee && <>
         <div className="w-full flex justify-end "> 
         <button 
          onClick={() => setIsModalOpen(true)}
         className="bg-red-700 rounded-lg px-4 mr-2">+ Add Blog</button>
          </div>
       {/* <BlogComponent blogs={blogs} setShowFullCommitteee={setShowFullCommitteee} setSelectedElectionId={setSelectedElectionId}/> */}
      {isModalOpen && (
         <BlogModal onClose={() => setIsModalOpen(false)}  />
      )}
      </>}

      {isShowFullCommitteee && selectedElectionId && <div className="w-full">
        {/* <ElectionMemberDetails electionId={selectedElectionId} setShowFullCommitteee={setShowFullCommitteee}/> */}
        </div>}
    </div>
  );
};

export default BlogForUsers;
