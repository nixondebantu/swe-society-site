import Achievement from "@/app/dashboard/[menuitem]/_pages/Achievement";
import { HomeAchievementCard } from "../achievementspage/homeAchievementCard";

function AchievementSection() {
  return (
    <div>
      {/* <h1 className="flex flex-col items-center">Achievements</h1> */}
      <HomeAchievementCard />
      
       <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
  );
}

export default AchievementSection;
