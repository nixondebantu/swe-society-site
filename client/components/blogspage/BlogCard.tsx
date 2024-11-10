
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
