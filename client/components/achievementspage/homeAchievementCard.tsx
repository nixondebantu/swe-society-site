// "use client";
// import React from "react";
// import { BackgroundGradient } from "../ui/background-gradient";
// import { IconAppWindow } from "@tabler/icons-react";
// import Image from "next/image";

// export function AchievemenCard() {
//   return (
//     <div className="flex">
//       <div className="p-8">
//       <BackgroundGradient className=" rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
//         <Image
//           src={'/https://t4.ftcdn.net/jpg/03/88/30/69/360_F_388306986_HNTycrIKQQ3aSkce0Vod4WoESHedMmHT.jpg'}
//           alt="jordans"
//           height="400"
//           width="400"
//           className="object-contain"
//         />
//         <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
//           Achievement 1
//         </p>

//         <p className="text-sm text-neutral-600 dark:text-neutral-400">
//           The Air Jordan 4 Retro Reimagined Bred will release on Saturday,
//           February 17, 2024. Your best opportunity to get these right now is by
//           entering raffles and waiting for the official releases.
//         </p>
//         <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
//           <span>See more </span>
//           <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
//             $100
//           </span>
//         </button>
//       </BackgroundGradient>
//       </div>
//       <div className="p-8">
//       <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
//         <Image
//           src={'/https://t4.ftcdn.net/jpg/03/88/30/69/360_F_388306986_HNTycrIKQQ3aSkce0Vod4WoESHedMmHT.jpg'}
//           alt="jordans"
//           height="400"
//           width="400"
//           className="object-contain"
//         />
//         <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
//         Achievement 2
//         </p>

//         <p className="text-sm text-neutral-600 dark:text-neutral-400">
//           The Air Jordan 4 Retro Reimagined Bred will release on Saturday,
//           February 17, 2024. Your best opportunity to get these right now is by
//           entering raffles and waiting for the official releases.
//         </p>
//         <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
//           <span>See more </span>
//           <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
//             $100
//           </span>
//         </button>
//       </BackgroundGradient>
//       </div>
//       <div className="p-8">
//       <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
//         <Image
//           src={'/https://t4.ftcdn.net/jpg/03/88/30/69/360_F_388306986_HNTycrIKQQ3aSkce0Vod4WoESHedMmHT.jpg'}
//           alt="jordans"
//           height="400"
//           width="400"
//           className="object-contain"
//         />
//         <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
//         Achievement 3
//         </p>

//         <p className="text-sm text-neutral-600 dark:text-neutral-400">
//           The Air Jordan 4 Retro Reimagined Bred will release on Saturday,
//           February 17, 2024. Your best opportunity to get these right now is by
//           entering raffles and waiting for the official releases.
//         </p>
//         <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
//           <span>See more </span>
//           <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
//             $100
//           </span>
//         </button>
//       </BackgroundGradient>
//       </div>
//     </div>
//   );
// }
// Marking the file as a client component
// "use client";
// import React, { useState, useEffect } from "react";
// import { BackgroundGradient } from "../ui/background-gradient";
// import { IconAppWindow } from "@tabler/icons-react";
// import Image from "next/image";

// export function AchievementCard() {
//   const [achievements, setAchievements] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAchievements = async () => {
//       try {
//         const response = await fetch('http://localhost:5050/achievement/post');
//         if (!response.ok) {
//           throw new Error('Failed to fetch achievements');
//         }
//         const data = await response.json();
//         console.log(data)
//         setAchievements(data.achievements);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAchievements();
//   }, []);

//   if (loading) {
//     return <div className="text-center p-4">Loading achievements...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500 p-4">Error: {error}</div>;
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       {achievements.map((achievement, index) => (
//         <div key={index} className="w-full">
//           <BackgroundGradient className="rounded-[22px] p-4 sm:p-6 bg-white dark:bg-zinc-900">
//             <div className="flex flex-col h-full">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-2">
//                   <IconAppWindow className="w-6 h-6" />
//                   <h2 className="text-lg font-bold">
//                     {achievement.teamname} - {achievement.rank} - {achievement.eventname}
//                   </h2>
//                 </div>
//               </div>

//               {achievement.image && (
//                 <div className="relative w-full h-48 my-4">
//                   <Image
//                     src={achievement.image}
//                     alt={achievement.eventname}
//                     fill
//                     className="object-cover rounded-lg"
//                   />
//                 </div>
//               )}

//               <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
//                 {achievement.task}
//               </p>

//               <div className="flex items-center justify-between mt-6">
//               <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
//            <span>See more at {achievement.venue} ({achievement.organizer})</span>
//            <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
//              $100
//            </span>
//          </button>
//               </div>
//             </div>
//           </BackgroundGradient>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default AchievementCard;

"use client";
import React, { useState, useEffect } from "react";
import { BackgroundGradient } from "../ui/background-gradient";
import Image from "next/image";

// Component for Home Page (3 achievements)
export function HomeAchievementCard() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch('http://localhost:5050/achievement/post');
        if (!response.ok) {
          throw new Error('Failed to fetch achievements');
        }
        const data = await response.json();
        // Take only the first 3 achievements
        setAchievements(data.achievements.slice(0, 3));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading achievements...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {achievements.map((achievement, index) => (
        <div key={index} className="p-8">
          <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
            <Image
              src={achievement.image || '/https://t4.ftcdn.net/jpg/03/88/30/69/360_F_388306986_HNTycrIKQQ3aSkce0Vod4WoESHedMmHT.jpg'}
              alt={achievement.eventname || "achievement image"}
              height="400"
              width="400"
              className="object-contain"
            />
            <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
              {achievement.teamname} - {achievement.rank} - {achievement.eventname}
            </p>

            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {achievement.task}
            </p>
            
            <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
              <span>See more at {achievement.venue} ({achievement.organizer})</span>
              <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                $100
              </span>
            </button>
          </BackgroundGradient>
        </div>
      ))}
    </div>
  );
}