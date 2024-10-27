"use client";
import AchievementComponent from "@/components/achievementspage/AchievementCard";
import { APIENDPOINTS } from "@/data/urls";
import React, { useEffect, useState } from "react";

const Achievement: React.FC = () => {
    const [achievements, setAchievements] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${APIENDPOINTS.achievement.getUsersAllAchievement}/14`);
                const data = await response.json();
                setAchievements(data.achievement);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);


  return (
    <div className="flex flex-col items-center space-y-2 pt-16 h-screen">
     <div className="w-full  mt-4 ">
         <div className="text-3xl text-center font-bold">Achievements</div>
      </div>
         <div className="w-full flex justify-end "> 
         <button className="bg-red-700 rounded-lg px-4 mr-2">+ Add Achievement</button>
          </div>
      <AchievementComponent achievements={achievements} />
    </div>
  );
};

export default Achievement;
