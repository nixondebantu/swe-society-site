"use client";
import AddNotice from "@/components/dashboardpage/notice/AddNotice";
import Notice_Card from "@/components/dashboardpage/notice/notice_card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { getUserID } from "@/data/cookies/getCookies";
import { BACKENDURL } from "@/data/urls";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Notice: React.FC = () => {
  const [notices, setNotices] = useState<any[]>([]);
  const [onlyMyNotices, setOnlyMyNotices] = useState<boolean>(false);
  const userId: string | undefined = getUserID();
  const noticeData = {
    noticeid: 18,
    notice_provider: 2,
    notice_date: "2024-02-13T18:00:00.000Z",
    expire_date: "2025-06-03T18:00:00.000Z",
    headline: "Monthly fee for freshers",
    notice_body: "You guyz have to give fee",
    picture: "https://example.com/image.jpg",
    file: null,
  };
  const truncateText = (text: any, maxLength: any) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const fetch_notices = () => {
    axios.get(`${BACKENDURL}notice/`).then((res) => {
      setNotices(res.data);
    });
  };

  useEffect(() => {
    fetch_notices();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const filteredNotices = notices.filter(
    (notice) =>
      notice.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.notice_body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handle_dlt = (noticeid: any) => {
    axios
      .delete(`${BACKENDURL}notice/${noticeid}`)
      .then((res) => {
        console.log(res.data);
        setNotices((prevNotices) =>
          prevNotices.filter((notice) => notice.noticeid !== noticeid)
        );
      })
      .catch((err) => {
        console.error("Error deleting notice:", err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-start gap-4 space-y-2 pt-16 px-4 h-screen  ">
      <h1>Notices</h1>
      <div className="w-full flex justify-between  ">
        <Input
          placeholder="Search notices"
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <AddNotice fetch_notices={fetch_notices} />
        {/* <Button><IoIosAddCircleOutline className="h-full w-full" />  Add notice</Button> */}
      </div>
      <div className="w-full h-max grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice, index) => (
            <Notice_Card
              key={index}
              notice={notice}
              handle_dlt={handle_dlt}
              fetch_notices={fetch_notices}
            />
          ))
        ) : (
          <p className="text-white">No matching notices found.</p>
        )}
      </div>
      <div className="w-full h-full flex justify-center items-start ">
        {/* <div className="flex flex-wrap gap-4 justify-start ">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice, index) => (
              <Notice_Card
                key={index}
                notice={notice}
                handle_dlt={handle_dlt}
              />
              // <div
              //   key={index}
              //   className="w-full flex justify-center gap-2 text-white"
              // >
              //   <p className="w-3/12 ">{notice.headline}</p>
              //   <p className="w-6/12  ">{truncateText(notice.notice_body, 40)}</p>
              //   <Button className="bg-transparent text-primary hover:text-white hover:bg-transparent">

              //   </Button>
              //   <Button className="bg-transparent text-primary hover:text-white hover:bg-transparent">
              //     <AiFillDelete
              //       onClick={() => {
              //         handle_dlt(notice.noticeid);
              //       }}
              //       className="h-full w-10"
              //     />
              //   </Button>
              // </div>
            ))
          ) : (
            <p className="text-white">No matching notices found.</p>
          )}
        </div> */}
      </div>

      <div className="w-full flex justify-center items-center gap-2 mt-4">
        <Checkbox
          id="onlyMyNotices"
          onClick={() => {
            setOnlyMyNotices(!onlyMyNotices);
            console.log(onlyMyNotices);
          }}
        />
        <label
          htmlFor="onlyMyNotices"
          className="text-sm font-medium leading-none cursor-pointer"
        >
          See only your notices
        </label>
      </div>
    </div>
  );
};

export default Notice;