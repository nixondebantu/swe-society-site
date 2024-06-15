import React from 'react';

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
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 ">
            {achievements.map((achievement) => (
                <div key={achievement.achieveid} className="p-4 border rounded-lg shadow-md">
                    <div className="mb-4">
                        <img src={achievement.photos[0]} alt="Achievement" className="w-full h-auto rounded-lg" />
                    </div>
                    <div className="mb-2">
                        <p className="font-semibold text-2xl">{achievement.rank} in {achievement.eventname}</p>
                        <p className="font-semibold">Segment: {achievement.segment}</p>
                        <p className="font-semibold">Team Name: {achievement.teamname}</p>
                        <p className="font-semibold">Tech Stack: {achievement.techstack}</p>
                    </div>
                    <div className="mt-2">
                        <div className="font-semibold">Team Members:</div>
                        <div className='flex'>
                            {achievement.teammembers.map((member, index) => (
                                <div key={index} className='bg-white text-black px-2 rounded-lg mr-3'>{member.fullname} ({member.session})</div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AchievementComponent;

