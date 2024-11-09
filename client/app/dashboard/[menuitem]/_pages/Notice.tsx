"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { FaFile } from "react-icons/fa";

import AddNotice from "@/components/dashboardpage/notice/AddNotice";

import React, { useState } from "react";

const Notice: React.FC = () => {
  const truncateText = (text: any, maxLength: any) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };
  const notices = [
    {
      notice_provider: 1,
      notice_date: "2023-01-15",
      expire_date: "2023-06-15",
      headline: "Important Update",
      notice_body: "Please be informed of the upcoming system maintenance scheduled for this weekend.",
      picture: "update_image.jpg",
      file: "maintenance_details.pdf"
    },
    {
      notice_provider: 2,
      notice_date: "2023-03-20",
      expire_date: "2023-09-20",
      headline: "New Policy Changes",
      notice_body: "We have updated our privacy policy to include new regulations.",
      picture: "policy_changes.jpg",
      file: "privacy_policy.pdf"
    },
    {
      notice_provider: 3,
      notice_date: "2023-05-10",
      expire_date: "2023-12-10",
      headline: "Staff Meeting",
      notice_body: "There will be a mandatory staff meeting next Monday at 10 AM.",
      picture: "staff_meeting.jpg",
      file: "meeting_agenda.docx"
    },
    {
      notice_provider: 4,
      notice_date: "2023-07-01",
      expire_date: "2024-01-01",
      headline: "Holiday Schedule",
      notice_body: "Please review the holiday schedule for the upcoming year.",
      picture: "holiday_schedule.jpg",
      file: "holiday_schedule.pdf"
    },
    {
      notice_provider: 5,
      notice_date: "2023-09-05",
      expire_date: "2024-03-05",
      headline: "System Upgrade",
      notice_body: "Our system will undergo an upgrade next weekend. Expect intermittent downtimes.",
      picture: "system_upgrade.jpg",
      file: "upgrade_details.pdf"
    },
    {
      notice_provider: 6,
      notice_date: "2023-11-15",
      expire_date: "2024-05-15",
      headline: "Annual Performance Reviews",
      notice_body: "Annual performance reviews are scheduled to begin next month.",
      picture: "performance_reviews.jpg",
      file: "review_schedule.pdf"
    },
    {
      notice_provider: 7,
      notice_date: "2024-01-10",
      expire_date: "2024-07-10",
      headline: "New Software Release",
      notice_body: "We are excited to announce the release of our new software version.",
      picture: "software_release.jpg",
      file: "release_notes.pdf"
    },
    {
      notice_provider: 8,
      notice_date: "2024-03-22",
      expire_date: "2024-09-22",
      headline: "Quarterly Financial Results",
      notice_body: "The quarterly financial results will be published next week.",
      picture: "financial_results.jpg",
      file: "financial_report.pdf"
    },
    {
      notice_provider: 9,
      notice_date: "2024-05-18",
      expire_date: "2024-11-18",
      headline: "Customer Feedback",
      notice_body: "We value your feedback. Please take a moment to fill out our survey.",
      picture: "customer_feedback.jpg",
      file: "feedback_form.pdf"
    },
    {
      notice_provider: 10,
      notice_date: "2024-07-29",
      expire_date: "2025-01-29",
      headline: "New Partnership Announcement",
      notice_body: "We are thrilled to announce our new partnership with XYZ Corp.",
      picture: "partnership_announcement.jpg",
      file: "partnership_details.pdf"
    },
    {
      notice_provider: 10,
      notice_date: "2024-07-29",
      expire_date: "2025-01-29",
      headline: "New Partnership Announcement",
      notice_body: "We are thrilled to announce our new partnership with XYZ Corp.",
      picture: "partnership_announcement.jpg",
      file: "partnership_details.pdf"
    },
    {
      notice_provider: 10,
      notice_date: "2024-07-29",
      expire_date: "2025-01-29",
      headline: "New Partnership Announcement",
      notice_body: "We are thrilled to announce our new partnership with XYZ Corp.",
      picture: "partnership_announcement.jpg",
      file: "partnership_details.pdf"
    }
  ];

  // const notice = axios.get("http://localhost:5000/api/notices");
  
  const [searchQuery, setSearchQuery] = useState("");
  const filteredNotices = notices.filter((notice) =>
    notice.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notice.notice_body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-start gap-4 space-y-2 pt-16 px-4 h-screen  ">
      <h1>Notices</h1>
      <div className="w-full flex justify-between  ">
        <Input placeholder="Search notices" className="max-w-sm" value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} />
          <AddNotice />
        {/* <Button><IoIosAddCircleOutline className="h-full w-full" />  Add notice</Button> */}
      </div>
      <div className="w-full h-max ">
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice, index) => (
            <div key={index} className="w-full flex justify-center gap-2 text-white" >
              <p className="w-3/12 ">{notice.headline}</p>
              <p className="w-6/12  ">{truncateText(notice.notice_body, 40)}</p>
              <Button className="bg-transparent text-primary hover:text-white hover:bg-transparent">
                <FiEdit className=" h-full w-10" />
              </Button>
              <Button className="bg-transparent text-primary hover:text-white hover:bg-transparent">
                <AiFillDelete className="h-full w-10" />
              </Button>
            </div>
          ))
        ) : (
          <p className="text-white">No matching notices found.</p>
        )}
      </div>



    </div>

  );
};

export default Notice;