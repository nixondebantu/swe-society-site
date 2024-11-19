import React from 'react';
import { MdDelete, MdModeEditOutline } from "react-icons/md";
interface Achievement {
    achieveid: number;
    teamid: number;
    teamname: string;
    eventname: string;
    segment: string;
    rank: string;
    photos: string[];
    techstack: string;
    teammembers: {
        userid: number;
        fullname: string;
        session: string;
    }[];
}

interface Props {
    achievements: Achievement[];
}

const AchievementComponent: React.FC<Props> = ({ achievements }) => {
    // Check if there are any achievements to display
    if (!achievements || achievements.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-xl text-gray-500">No achievements available</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 px-4 h-[70vh] overflow-y-scroll">
            {achievements.map((achievement) => (
                <div key={achievement.achieveid} className="p-4 border rounded-lg shadow-md relative">
                    
                    <div className="flex justify-end w-full right-10 top-5 space-x-3 absolute">
                    <button 
                     onClick={(event) => {
                        event.stopPropagation(); 
                        
                      }}
                    className="p-2 rounded border bg-gray-200 border-black  flex items-center justify-center">
                        <MdModeEditOutline className="text-black text-sm"/>
                    </button>
                    <button
                   onClick={(event) => {
                    event.stopPropagation(); 
                      
                     }}
                    className="p-2 rounded border bg-gray-200 border-black  flex items-center justify-center">
                        <MdDelete className="text-black text-sm"/>
                    </button>
                </div>
                 
                     {achievement.photos && achievement.photos.length > 0 && (
        <div className="mb-4">
            <img src={achievement.photos[0]} alt="Achievement" className="w-full h-auto rounded-lg" />
        </div>
    )}
                    <div className="mb-2">
                        <p className="font-semibold text-xl md:text-2xl">{achievement.rank} in {achievement.eventname}</p>
                        <p className="font-semibold">Segment: {achievement.segment}</p>
                        <p className="font-semibold">Team Name: {achievement.teamname}</p>
                        <p className="font-semibold">Tech Stack: {achievement.techstack}</p>
                    </div>
                    <div className="mt-2">
                        <div className="font-semibold">Team Members:</div>
                        <div className="flex">
                            {achievement.teammembers.map((member, index) => (
                                <div key={index} className=" text-white bg-black  px-3 py-2 rounded-lg m-1 text-sm flex flex-col items-center">
                                    {member.fullname? member.fullname : "SWE student"} <span className='md:block hidden'> ({member.session})</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AchievementComponent;
