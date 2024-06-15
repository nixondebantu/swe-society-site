"use client";

import sidebarItems from "@/data/getSidebarMenuItem";
import DashboardHeader from "./DashboardHeader";
import SidebarDesktop from "./SidebarDesktop";
import SidebarMobile from "./SidebarMobile";

function SideBar() {
  return (
    <>
      <DashboardHeader />
      <div className="lg:visible invisible">
        <SidebarDesktop sidebarItems={sidebarItems} />
      </div>
      <div className="lg:invisible visible z-10">
        <SidebarMobile sidebarItems={sidebarItems} />
      </div>
    </>
  );
}

export default SideBar;
