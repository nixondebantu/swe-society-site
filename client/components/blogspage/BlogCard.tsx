// "use client";
// import { CardStack } from "../ui/card-stack";
// import { cn } from "@/utils/cn";
// import Link from "next/link";
// export function BlogCard() {
//   return (
//     <div className="h-[40rem] flex items-center justify-center w-full">
//       <Link href={'/'}>
//       <CardStack items={CARDS} />
//       </Link>
//     </div>
//   );
// }

// // Small utility to highlight the content of specific section of a testimonial content
// export const Highlight = ({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => {
//   return (
//     <span
//       className={cn(
//         "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
//         className
//       )}
//     >
//       {children}
//     </span>
//   );
// };

// const CARDS = [
//   {
//     id: 0,
//     name: "EMON SIR",
//     designation: "Senior Software Engineer",
//     content: (
//       <p>
//         These cards are amazing, <Highlight>I want to use them</Highlight> in my
//         project. Framer motion is a godsend ngl tbh fam 🙏
//       </p>
//     ),
//   },
//   {
//     id: 1,
//     name: "RAKIB SIR",
//     designation: "Senior Shitposter",
//     content: (
//       <p>
//         I dont like this Twitter thing,{" "}
//         <Highlight>deleting it right away</Highlight> because yolo. Instead, I
//         would like to call it <Highlight>X.com</Highlight> so that it can easily
//         be confused with adult sites.
//       </p>
//     ),
//   },
//   {
//     id: 2,
//     name: "Partha SIR",
//     designation: "Manager Project Mayhem",
//     content: (
//       <p>
//         The first rule of
//         <Highlight>Fight Club</Highlight> is that you do not talk about fight
//         club. The second rule of
//         <Highlight>Fight club</Highlight> is that you DO NOT TALK about fight
//         club.
//       </p>
//     ),
//   },
// ];
"use client";
import { useState, useEffect } from "react";
import { CardStack } from "../ui/card-stack";
import { cn } from "@/utils/cn";
import Link from "next/link";

export function BlogCard() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("http://localhost:5050/blog");
        const data = await response.json();
        console.log(data);
        setBlogs(
          data.map((blog) => ({
            id: blog.blogid,
            name: blog.fullname || "Anonymous",
            designation: blog.designation,
            content: blog.article,
          }))
        );
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <div className="h-[40rem] flex items-center justify-center w-full">
      <Link href={'/'}>
        <CardStack items={blogs} />
      </Link>
    </div>
  );
}

// Small utility to highlight the content of a specific section
export const Highlight = ({ children, className }) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};




