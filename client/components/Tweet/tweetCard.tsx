// "use client";
// import React from "react";
// import { IconHeart, IconMessageCircle, IconRepeat, IconShare } from "@tabler/icons-react";

// const TweetCard = ({ 
//   avatar,
//   name,
//   username,
//   timestamp,
//   content,
//   image,
//   metrics = {
//     replies: 0,
//     retweets: 0,
//     likes: 0
//   }
// }) => {
//   return (
//     <div className="w-full max-w-xl border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
//       <div className="flex space-x-3">
//         {/* Avatar */}
//         <div className="flex-shrink-0">
//           <img
//             src={avatar}
//             alt={`${name}'s avatar`}
//             className="h-12 w-12 rounded-full object-cover"
//           />
//         </div>

//         {/* Content */}
//         <div className="flex-1">
//           {/* Header */}
//           <div className="flex items-center space-x-2">
//             <span className="font-medium text-gray-900 dark:text-gray-100">{name}</span>
//             <span className="text-gray-500 dark:text-gray-400">@{username}</span>
//             <span className="text-gray-500 dark:text-gray-400">·</span>
//             <span className="text-gray-500 dark:text-gray-400">{timestamp}</span>
//           </div>

//           {/* Tweet text */}
//           <p className="mt-2 text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
//             {content}
//           </p>

//           {/* Image (optional) */}
//           {image && (
//             <img
//               src={image}
//               alt="Tweet content"
//               className="mt-3 rounded-xl border border-gray-200 dark:border-gray-800"
//             />
//           )}

//           {/* Engagement metrics */}
//           <div className="mt-3 flex items-center justify-between text-gray-500 dark:text-gray-400">
//             <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
//               <IconMessageCircle className="h-5 w-5" />
//               <span>{metrics.replies}</span>
//             </button>
//             <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
//               <IconRepeat className="h-5 w-5" />
//               <span>{metrics.retweets}</span>
//             </button>
//             <button className="flex items-center space-x-2 hover:text-red-500 transition-colors">
//               <IconHeart className="h-5 w-5" />
//               <span>{metrics.likes}</span>
//             </button>
//             <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
//               <IconShare className="h-5 w-5" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TweetCard;
"use client";
import React, { useEffect, useState } from "react";
import { IconHeart, IconMessageCircle, IconRepeat, IconShare, IconCalendar, IconClock } from "@tabler/icons-react";
import { format } from "date-fns"; // Make sure to install date-fns for date formatting
import { BACKENDURL } from "@/data/urls";

const EventDetailsPage = ({ params }: { params: { id: string } }) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`${BACKENDURL}event/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event details');
        }
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [params.id]);

  if (loading) {
    return <div className="text-center p-4">Loading event details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">Error: {error}</div>;
  }

  if (!event) {
    return <div className="text-center p-4">Event not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="w-full border border-gray-200 dark:border-gray-800 rounded-xl p-4">
        <div className="flex space-x-3">
          {/* Event Creator Avatar */}
          <div className="flex-shrink-0">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl">
              {event.headline[0]}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {event.headline}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  Event #{event.eventid}
                </span>
              </div>
              <span className="text-gray-500 dark:text-gray-400">
                {format(new Date(event.created_time), 'MMM d, yyyy')}
              </span>
            </div>

            {/* Event Details */}
            <p className="mt-2 text-gray-900 dark:text-gray-100">
              {event.event_details}
            </p>

            {/* Time Details */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <IconCalendar className="h-5 w-5" />
                <span>
                  {format(new Date(event.start_time), 'MMMM d, yyyy')}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <IconClock className="h-5 w-5" />
                <span>
                  {format(new Date(event.start_time), 'h:mm a')} - {format(new Date(event.end_time), 'h:mm a')}
                </span>
              </div>
            </div>

            {/* Cover Photo */}
            {event.coverphoto && (
              <img
                src={event.coverphoto}
                alt={event.headline}
                className="mt-3 rounded-xl border border-gray-200 dark:border-gray-800 w-full object-cover max-h-64"
              />
            )}

            {/* Engagement Actions */}
            <div className="mt-4 flex items-center justify-between text-gray-500 dark:text-gray-400">
              <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                <IconMessageCircle className="h-5 w-5" />
                <span>Comment</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
                <IconRepeat className="h-5 w-5" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-red-500 transition-colors">
                <IconHeart className="h-5 w-5" />
                <span>Interested</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                <IconCalendar className="h-5 w-5" />
                <span>Add to Calendar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;