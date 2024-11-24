"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKENDURL } from "@/data/urls";
import { MdDelete, MdOutlineArrowBackIos } from "react-icons/md";
import AddCommitteeMemberModal from "./AddCommitteeMemberModal";
import ConfirmationModal from "../commons/ConfirmationModal";
import { getJWT } from "@/data/cookies/getCookies";
import { useToast } from "../ui/use-toast";

interface Member {
  year: string;
  fullname: string;
  profile_picture: string | null;
  email: string;
  regno: string;
  session: string;
  committee_post: string;
}

interface ElectionMemberDetailsProps {
  electionId: number;
  setShowFullCommitteee: React.Dispatch<React.SetStateAction<boolean>>;
  
}

const ElectionMemberDetails: React.FC<ElectionMemberDetailsProps> = ({ electionId, setShowFullCommitteee }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCommitteeMember, setSelectedCommitteMember]= useState<number>(0);
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const fetchMembers = async () => {
    try {
      const response = await axios.get(`${BACKENDURL}election/allmembers/${electionId}`);
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchMembers();
  }, [electionId]);

  if (loading) {
    return (
      <div className="text-white text-center py-4">Loading members...</div>
    );
  }

  const handleDeleteConfirm = async () => {
       
    try {
      const response = await axios.delete(
        `${BACKENDURL}election/members/${selectedCommitteeMember}`,
        {
          headers: {
            Authorization: `Bearer ${getJWT()}`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        toast({
            title: "Deleted Election Successfully",
            duration: 3000,
          });
          setOpenDeleteModal(false);
          fetchMembers();
          
        
        // window.location.reload();
      }
    } catch (error) {
      console.error("Error creating election:", error);
    }
  };

  return (
    <>
    <div className="flex justify-between items-center w-full">
    <button 
    onClick={()=>{
        setShowFullCommitteee(false);
    }}
    className="text-white flex items-center space-x-3 "> <MdOutlineArrowBackIos className="text-white"/><div>Back</div></button>


<button 
          onClick={() => setIsModalOpen(true)}
         className="bg-red-700 rounded-lg px-4 mr-2">+ Add Panel Member</button>
    </div>
    {members && members.length === 0 && <div className="text-center py-8">
                <p className="text-xl text-gray-500">No Panel Members Available</p>
            </div>

    }
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {members.map((member) => (
        <div
          key={member.regno}
          className="bg-gray-700 text-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow relative"
        >
            {/* <button
                   onClick={(event) => {
                    event.stopPropagation(); 
                       
                       // setSelectedCommitteMember(member.)
                     }}
                    className="p-2 rounded border border-red-300  flex items-center justify-center absolute right-2 top-2">
                        <MdDelete className="text-red-300 text-sm"/>
                    </button> */}
          <div className="flex items-center space-x-4">
            {member.profile_picture ? (
              <img
                src={member.profile_picture}
                alt={member.fullname}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-500 flex items-center justify-center">
                <span className="text-lg font-semibold">{member.fullname[0]}</span>
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold">{member.fullname}</h3>
              <p className="text-sm text-gray-300">{member.committee_post}</p>
            </div>
          </div>
          <div className="mt-2 text-sm">
            <p><strong>Reg No:</strong> {member.regno}</p>
            <p><strong>Email:</strong> {member.email}</p>
            {member.session && <p><strong>Session:</strong> {member.session}</p>}
          </div>
        </div>
      ))}
    </div>
    {openDeleteModal && (
        <ConfirmationModal
          title="Confirm Deletion"
          subtitle="Are you sure you want to delete the election? This action cannot be undone."
          confirmButtonTitle="Delete"
          onConfirm={handleDeleteConfirm}
          onCancel={()=>{setOpenDeleteModal(false)}}
        />
      )}
    {isModalOpen && (
         <AddCommitteeMemberModal electionId={electionId} onClose={() => setIsModalOpen(false)}  fetchMembers={fetchMembers}/>
      )}
    </>
  );
};

export default ElectionMemberDetails;
