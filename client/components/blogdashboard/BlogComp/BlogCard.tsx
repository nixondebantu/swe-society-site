import React from "react";

interface CardProps {
  label: string;
  title: string;
  description: string;
  author: string | null;
  timeToRead?: string;
  image: string | null;
}

const Card: React.FC<CardProps> = ({
  label,
  title,
  description,
  author,
  timeToRead = "3 min read",
  image,
}) => {

    const extractText = (html: string): string => {
        const plainText = html.replace(/<\/?[^>]+(>|$)/g, "").trim();
        return plainText.length > 120 ? plainText.slice(0, 120) + "..." : plainText;
      };
      

      
  return (
    <div className="flex items-center justify-between bg-gray-900 text-white rounded-lg shadow-md p-6 space-x-4 ">
      {/* Left Content */}
      <div className="space-y-3 w-3/5">
        <span className="inline-block bg-red-600 text-xs font-semibold uppercase px-3 py-1 rounded">
          {label}
        </span>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-300">{extractText(description)}</p>
        <a
          href="#"
          className="text-red-400 font-medium inline-flex items-center gap-1 hover:underline"
        >
          Read more →
        </a>
        <div className="flex items-center justify-between space-x-2 text-sm text-gray-400">
          <span className="inline-flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="w-4 h-4"
            >
              <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm0 1a5.5 5.5 0 00-4.336 2.058.75.75 0 101.15.96A4 4 0 018 10.5c1.377 0 2.603.523 3.186 1.518a.75.75 0 101.147-.963A5.5 5.5 0 008 9z" />
            </svg>
            by {author || "Anonymous"}
          </span>
          <span>{timeToRead}</span>
        </div>
      </div>

      {/* Right Placeholder */}
      <div className="w-2/5 h-36 bg-gray-800 rounded-lg overflow-hidden">
  {image && (
    <img
      src={image}
      alt={title}
      className="w-full h-full object-cover rounded-lg"
    />
  )}
</div>
    </div>
  );
};

export default Card;
