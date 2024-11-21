"use client";

import { APIENDPOINTS, BACKENDURL } from "@/data/urls";
import React, { useEffect, useState } from "react";
import { getJWT, getUserID, getUserReg } from "@/data/cookies/getCookies";

import ElectionModal from "@/components/electiondashboard/CreateElectionModal";
import ElectionMemberDetails from "@/components/electiondashboard/CommmitteeMembers";
import BlogModal from "@/components/blogdashboard/AddBlogModal";
import BlogCard from "@/components/blogdashboard/BlogComp/BlogCard";
import ConfirmationModal from "@/components/commons/ConfirmationModal";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import BlogEditModal from "@/components/blogdashboard/BlogComp/BlogEditModal";
import FullBlogCard from "@/components/blogdashboard/BlogComp/FullBlog";

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

  interface FormData {
    blogid: number;
    userid: number;
    headline: string;
    designation: string;
    current_institution: string;
    article: string;
    photos: string[];
    blogtype: string;
    approval_status: boolean;
  }

const AdminBlogManage: React.FC = () => {
  const userids = Number(getUserID()) || 2;
  const [selecteBlogId, setSelecteBlogId] = useState<number | null>(null);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [selectedBlog, setSelectedBlog] = useState<FormData>({
      blogid: selecteBlogId || 2,
      userid: userids,
      headline: "",
      designation: "",
      current_institution: "",
      article: "",
      photos: [],
      blogtype: "",
      approval_status: false,
    });

    const [selectedFUllBlog, setselectedFUllBlog] = useState<Blog>({
      blogid: selecteBlogId || 2,
      userid: userids,
      headline: "",
      designation: "",
      current_institution: "",
      article: "",
      photos: [],
      blogtype: "",
      approval_status: false,
      fullname: ""
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isShowFullBlog, setShowFullBlog] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [approvalStatusModal, setApprovalStatusModal] = useState(false);
    const [isApproved, setIsApproved] = useState<boolean>(false);
    
    const { toast } = useToast();
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
        if (selecteBlogId !== null) {
          const matchedBlog = blogs.find((blog) => blog.blogid === selecteBlogId);
          if (matchedBlog) {
            // Transform `Blog` into `FormData` type
            setSelectedBlog({
              blogid: matchedBlog.blogid,
              userid: matchedBlog.userid,
              headline: matchedBlog.headline,
              designation: matchedBlog.designation || "", // Ensure non-null value
              current_institution: matchedBlog.current_institution || "", // Ensure non-null value
              article: matchedBlog.article,
              photos: matchedBlog.photos,
              blogtype: matchedBlog.blogtype,
              approval_status: matchedBlog.approval_status,
            });
          }
        }

        if (selecteBlogId !== null) {
          const matchedBloging = blogs.find((blog) => blog.blogid === selecteBlogId);
          if (matchedBloging) {
            setselectedFUllBlog(matchedBloging);
          }
        }
        console.log("Selected full blog", selectedFUllBlog)
      }, [selecteBlogId]);

     
      

    useEffect(() => {
 
    
        fetchBlogs();
      }, []);
      const handleDeleteConfirm = async () => {
       
        try {
          const response = await axios.delete(
            `${BACKENDURL}blog/${selecteBlogId}`,
            {
              headers: {
                Authorization: `Bearer ${getJWT()}`,
              },
            }
          );
          if (response.status === 200 || response.status === 201) {
            toast({
                title: "Deleted Blog Successfully",
                duration: 3000,
              });
              setOpenDeleteModal(false);
              fetchBlogs();
              
             
            
            // window.location.reload();
          }
        } catch (error) {
          console.error("Error creating election:", error);
        }
      };

      const handleApprovalStatus = async () => {
       
        try {
          const response = await axios.put(
            `${BACKENDURL}blog/status/${selecteBlogId}`,
            { approval_status: !isApproved },
            {
              headers: {
                Authorization: `Bearer ${getJWT()}`,
              },
            }
          );
          if (response.status === 200 || response.status === 201) {
            toast({
                title: "Status Updated Successfully",
                duration: 3000,
              });
              setApprovalStatusModal(false);
              fetchBlogs();
              
             
            
            // window.location.reload();
          }
        } catch (error) {
          console.error("Error creating election:", error);
        }
      };
      

    




  return (
    <div className="flex flex-col items-center space-y-2 py-16 mb-16  ">
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
        <div className="w-full relative">
            <div className="absolute top-4 right-32">
                <button 
                onClick={()=>{
                    setSelecteBlogId(blog.blogid);
                    setIsApproved(blog.approval_status);
                    setApprovalStatusModal(true);
                }}
                className={`p-2 ${blog.approval_status ? 'text-gray-400 border border-gray-600' : 'bg-white text-black'}  rounded  text-xs`}>{blog.approval_status ? "Approved" : "Approve"}</button>
                </div> 
        <BlogCard
          key={blog.blogid}
          blogid={blog.blogid}
          label={blog.blogtype}
          title={blog.headline}
          description={blog.article}
          author={blog.fullname || "Anonymous"}
          image={blog.photos[0] || null}
          setBlogId={setSelecteBlogId}
          setOpenDeleteModal={setOpenDeleteModal}
          setOpenEditModal={setOpenEditModal}
          setShowFullBlog={setShowFullBlog}
        />
        </div>
      ))}
      </div>
      {isModalOpen && (
         <BlogModal onClose={() => setIsModalOpen(false)} fetchDataAll={fetchBlogs} />
      )}
      </>}

      {isShowFullBlog && <FullBlogCard 
      blogDetails={selectedFUllBlog}
      setShowFullBlog={setShowFullBlog}
      />}

      {openDeleteModal && (
        <ConfirmationModal
          title="Confirm Deletion"
          subtitle="Are you sure you want to delete the Blog? This action cannot be undone."
          confirmButtonTitle="Delete"
          onConfirm={handleDeleteConfirm}
          onCancel={()=>{setOpenDeleteModal(false)}}
        />
      )}

{approvalStatusModal && (
        <ConfirmationModal
          title="Confirm Approval Status"
          subtitle={`Are you sure you want to ${isApproved ? 'Disapprove' : 'Approve'} the Blog? This action cannot be undone.`}
          confirmButtonTitle={`${isApproved ? 'Disapprove' : 'Approve'}`}
          onConfirm={handleApprovalStatus}
          onCancel={()=>{setApprovalStatusModal(false)}}
        />
      )}

      {isShowFullBlog  && <div className="w-full">
        {/* <ElectionMemberDetails electionId={selectedElectionId} setShowFullBlog={setShowFullBlog}/> */}
        </div>}
        {openEditModal && (
          <BlogEditModal
          onClose={()=>{setOpenEditModal(false)}}
          fetchDataAll={fetchBlogs}
          formDataPrev={selectedBlog}
          />
        )}
    </div>
  );
};

export default AdminBlogManage;
