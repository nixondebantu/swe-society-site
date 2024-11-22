// import EventSection from "@/components/homepage/EventSection";
// export default function page() {
//   return <div>

import { PaginatedEvents } from "@/components/eventspage/eventsection";


async function fetchEvents() {
  try {
    const res = await fetch('http://localhost:5050/event/', { 
      cache: 'no-store' // or 'force-cache' depending on your needs
    });
    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function EventsPage() {
  const events = await fetchEvents();
  return <PaginatedEvents events={events} itemsPerPage={6} />;
}