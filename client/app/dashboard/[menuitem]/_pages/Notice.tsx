"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiFillDelete } from "react-icons/ai";
import AddNotice from "@/components/dashboardpage/notice/AddNotice";
import { Checkbox } from "@/components/ui/checkbox"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUserID } from "@/data/cookies/getCookies";
import EditNotice from "@/components/dashboardpage/notice/EditNotice";
import { set } from "date-fns";

const Notice: React.FC = () => {
  const [notices, setNotices] = useState<any[]>([]);
  const [onlyMyNotices, setOnlyMyNotices] = useState<boolean>(false);
  const userId: string | undefined = getUserID();

  const truncateText = (text: any, maxLength: any) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };

  useEffect(() => {

    if (!onlyMyNotices) {
      axios.get("http://localhost:5050/notice/").then((res) => {
        setNotices(res.data)
      })
    }
    // else {
    //   axios.get(`http://localhost:5050/notice/${userId}`).then((res) => {
    //     setNotices(res.data)
    //   })
    // }
    console.log(onlyMyNotices)
  }, [onlyMyNotices])

  const [searchQuery, setSearchQuery] = useState("");
  const filteredNotices = notices.filter((notice) =>
    notice.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notice.notice_body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handle_dlt = (noticeid: any) => {
    axios.delete(`http://localhost:5050/notice/${noticeid}`).then((res) => {
      console.log(res.data)
    })
  }

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
              <EditNotice noticeid={notice.noticeid} notice_provider={userId} notice_date={notice.notice_date} expire_date={notice.expire_date} headline={notice.headline} notice_body={notice.notice_body} file={notice.file} picture={notice.picture} />
              </Button>
              <Button className="bg-transparent text-primary hover:text-white hover:bg-transparent">
              <AiFillDelete   onClick={() => { handle_dlt(notice.noticeid) }} className="h-full w-10" />
              </Button>
            </div>
          ))
        ) : (
          <p className="text-white">No matching notices found.</p>
        )}
      </div>

      <div className="w-full flex justify-center items-center gap-2 mt-4">
  <Checkbox 
    id="onlyMyNotices" 
    onClick={()=>{setOnlyMyNotices(!onlyMyNotices);console.log(onlyMyNotices)}}
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