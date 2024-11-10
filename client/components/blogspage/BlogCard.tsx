
// "use client";
// import { useState, useEffect } from "react";
// import { CardStack } from "../ui/card-stack";
// import { cn } from "@/utils/cn";
// import Link from "next/link";

// export function BlogCard() {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     async function fetchBlogs() {
//       try {
//         const response = await fetch("http://localhost:5050/blog");
//         const data = await response.json();
//         console.log(data);
//         setBlogs(
//           data.map((blog) => ({
//             id: blog.blogid,
//             name: blog.fullname || "Anonymous",
//             designation: blog.designation,
//             content: blog.article,
//           }))
//         );
//       } catch (error) {
//         console.error("Error fetching blogs:", error);
//       }
//     }
//     fetchBlogs();
//   }, []);

//   return (
//     <div className="h-[40rem] flex items-center justify-center w-full">
//       <Link href={'/'}>
//         <CardStack items={blogs} />
//       </Link>
//     </div>
//   );
// }

// // Small utility to highlight the content of a specific section
// export const Highlight = ({ children, className }) => {
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

"use client";
import { useState, useEffect } from "react";
import { CardStack } from "../ui/card-stack";
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
      <CardStack
        items={blogs.slice(0, 6).map((blog) => ({
          ...blog,
          content: (
            <Link href={`/blogs`} key={blog.id}>
              <div className="cursor-pointer">
                <h2>{blog.name}</h2>
                <p>{blog.designation}</p>
                <p>{blog.content}</p>
              </div>
            </Link>
          ),
        }))}
      />
    </div>
  );
}
