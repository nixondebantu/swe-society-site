"use client"
import React, { useState } from "react";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import ElectionEditModal from "./ElectionEditModal";
import axios from "axios";
import { getJWT } from "@/data/cookies/getCookies";
import { BACKENDURL } from "@/data/urls";
import { useToast } from "../ui/use-toast";
import ConfirmationModal from "../commons/ConfirmationModal";

interface ElectionCommitteeProps {
  electionCommittees: {
    electionid: number;
    year?: string | null;
    election_type?: string | null;
    batch?: string | null;
    candidate_form_date?: string | null;
    election_date?: string | null;
    commissioner_userid?: number | null;
    commissioner_fullname?: string | null;
    commissioner_email?: string | null;
    commissioner_profile_picture?: string | null;
    assistant_userid?: number | null;
    assistant_fullname?: string | null;
    assistant_email?: string | null;
    assistant_profile_picture?: string | null;
  }[];
  setShowFullCommitteee: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedElectionId: React.Dispatch<React.SetStateAction<number | null>>;
  fetchData: () => void;
}

interface ElectionFormData {
    year: string;
    election_type: string;
    candidate_form_date: string;
    election_date: string;
    election_commissioner?: number;
    assistant_commissioner?: number;
  }

const ElectionCommitteeComponent: React.FC<ElectionCommitteeProps> = ({ fetchData, electionCommittees, setShowFullCommitteee, setSelectedElectionId }) => {
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const { toast } = useToast();
    const [editingElectionData, setEditingElectionData]= useState<ElectionFormData>({
        year: "",
        election_type: "",
        candidate_form_date: "",
        election_date: "",
        election_commissioner: 1,
        assistant_commissioner: 1
    });
    const [editElectionId, setEditElectionId] = useState<number>(0);
    const formatDate = (dateString: string | null) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB"); // Format as dd-mm-yyyy
      };

      const handleDeleteConfirm = async () => {
       
        try {
          const response = await axios.delete(
            `${BACKENDURL}election/newelection/${editElectionId}`,
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
              fetchData();
              
            
            // window.location.reload();
          }
        } catch (error) {
          console.error("Error creating election:", error);
        }
      };


  return (
    <>
    <div className="w-full p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {electionCommittees.map((election) => (
        <div
         onClick={()=>{
            setSelectedElectionId(election.electionid)
            setShowFullCommitteee(true);
         }}
          key={election.electionid}
          className="bg-gray-900 hover:bg-black cursor-pointer shadow-md rounded-lg p-6 flex flex-col space-y-4 border border-gray-700"
        >
                
          <div className="space-y-2">
            <div className="flex justify-between">
            <h4 className="text-lg font-bold text-red-300">Election Details</h4>
                <div className="flex space-x-3">
                    <button 
                     onClick={(event) => {
                        event.stopPropagation(); 
                        setEditingElectionData({
                            year: election.year || "",
                            election_type: election.election_type || "",
                            candidate_form_date: election.candidate_form_date || "",
                            election_date: election.election_date || "",
                            election_commissioner: election.commissioner_userid || 0 ,
    assistant_commissioner: election.assistant_userid || 0,
                        });
                        setEditElectionId(election.electionid)
                        setOpenEditModal(true);
                      }}
                    className="p-2 rounded border border-red-300  flex items-center justify-center">
                        <MdModeEditOutline className="text-red-300 text-sm"/>
                    </button>
                    <button
                   onClick={(event) => {
                    event.stopPropagation(); 
                        setEditElectionId(election.electionid)
                        setOpenDeleteModal(true);
                     }}
                    className="p-2 rounded border border-red-300  flex items-center justify-center">
                        <MdDelete className="text-red-300 text-sm"/>
                    </button>
                </div>
            </div>
           
            <p className="font-bold"> {election.election_type || ""} Election {election.year || ""}</p> 
           
            
            {election.batch && <p><span className="font-medium">Batch:</span> {election.batch || "N/A"}</p>}
            <p>
              <span className="font-medium">Registration Deadline:</span> {formatDate(election.candidate_form_date || "")}
            </p>
            <p>
              <span className="font-medium">Election Date:</span> {formatDate(election.election_date || "")}
            </p>
          </div>

        
        
                  {election.commissioner_fullname && (
            <div className="flex items-center space-x-4">
              <img
                src={election.commissioner_profile_picture || "/default-profile.png"}
                alt="Commissioner Profile"
                className="w-12 h-12 rounded-full border border-gray-300"
              />
              <div>
              <h5 className="text-sm font-bold text-red-300">Commissioner </h5>
                <h3 className="text-xl font-semibold">{election.commissioner_fullname}</h3>
                <p className="text-red-300 text-sm">{election.commissioner_email || "No email provided"}</p>
              </div>
            </div>
          )}
            {election.assistant_userid && (
            <div className="mt-4 flex items-center space-x-4">
              <img
                src={election.assistant_profile_picture || "/default-profile.png"}
                alt="Assistant Profile"
                className="w-12 h-12 rounded-full border border-gray-300"
              />
              <div>
              <h5 className="text-sm font-bold text-red-300">Assitant Commissioner </h5>
                <h3 className="text-lg font-semibold">{election.assistant_fullname || "N/A"}</h3>
                <p className="text-red-300 text-sm">{election.assistant_email || "No email provided"}</p>
              </div>
            </div>
          )}



        </div>
      ))}


     
    </div>
    {openEditModal && (
         <ElectionEditModal fetchData={fetchData} onClose={() => setOpenEditModal(false)}  prevformData={editingElectionData} electionId={editElectionId}/>
      )}

{openDeleteModal && (
        <ConfirmationModal
          title="Confirm Deletion"
          subtitle="Are you sure you want to delete the election? This action cannot be undone."
          confirmButtonTitle="Delete"
          onConfirm={handleDeleteConfirm}
          onCancel={()=>{setOpenDeleteModal(false)}}
        />
      )}
    </>
  );
};

export default ElectionCommitteeComponent;
