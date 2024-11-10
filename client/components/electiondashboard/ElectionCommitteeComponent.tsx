"use client"
import React from "react";

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
}

const ElectionCommitteeComponent: React.FC<ElectionCommitteeProps> = ({ electionCommittees, setShowFullCommitteee, setSelectedElectionId }) => {

    const formatDate = (dateString: string | null) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB"); // Format as dd-mm-yyyy
      };

  return (
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
            <h4 className="text-lg font-bold text-red-300">Election Details</h4>
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
  );
};

export default ElectionCommitteeComponent;
