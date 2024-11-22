// 'use client'

// import { HoverEffect } from "../ui/card-hover-effect";

// export function NoticeCard() {
//   return (
//     <div className="max-w-5xl mx-auto px-8">
//       <HoverEffect items={projects} />
//     </div>
//   );
// }
// export const projects = [
//   {
//     title: "Notice 1",
//     description:
//       "A technology company that builds economic infrastructure for the internet.",
//     link: "https://stripe.com",
//   },
//   {
//     title: "Notice 2",
//     description:
//       "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
//     link: "https://netflix.com",
//   },
//   {
//     title: "Notice 3",
//     description:
//       "A multinational technology company that specializes in Internet-related services and products.",
//     link: "https://google.com",
//   },
//   {
//     title: "Notice 4",
//     description:
//       "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
//     link: "https://meta.com",
//   },
//   {
//     title: "Notice 5",
//     description:
//       "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
//     link: "https://amazon.com",
//   },
//   {
//     title: "Notice 6",
//     description:
//       "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
//     link: "https://microsoft.com",
//   },
// ];
"use client";

import { useEffect, useState } from "react";
import { HoverEffect } from "../ui/card-hover-effect";

export function NoticeCard() {
  const [notices, setNotices] = useState([]);

  // Fetch notices from API
  useEffect(() => {
    fetch("http://localhost:5050/notice")
      .then((response) => response.json())
      .then((data) => {
        // Map the API data to match the structure needed for HoverEffect
        const formattedNotices = data.map((notice: any) => ({
          title: notice.headline,
          description: notice.notice_body,
          link: notice.file || "#",
        }));
        setNotices(formattedNotices);
      })
      .catch((error) => console.error("Error fetching notices:", error));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={notices} />
    </div>
  );
}
