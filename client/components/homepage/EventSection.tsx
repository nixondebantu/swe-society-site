
import { Suspense } from 'react';
import { EventMarqueeDemo } from "../eventspage/EventCard";

function EventSection() {
  return (
    <div>
      <h1 className="flex flex-col justify-center items-center">Events</h1>
      <Suspense fallback={<div className="text-center py-10">Loading events...</div>}>
        <EventMarqueeDemo />
      </Suspense>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
  );
}

export default EventSection;