import {Footer} from "@/components/global/Footer";
import Navbar from "@/components/global/Navbar";
import AchievementSection from "@/components/homepage/AchievementSection";
// import AchievementSection from "@/components/homepage/AchievementSection";
import BlogSection from "@/components/homepage/BlogSection";
import Carousel from "@/components/homepage/Carousel";
import ECMemberCarousel from "@/components/homepage/ECMemberCarousel";
import EventSection from "@/components/homepage/EventSection";
import GallerySection from "@/components/homepage/GallerySection";
import Hero from "@/components/homepage/Hero";
import NoticeSection from "@/components/homepage/NoticeSection";
import TweetCard from "@/components/Tweet/tweetCard";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      <Hero />
     
      {/* <Carousel /> */}
      <EventSection />
      <NoticeSection />
      <BlogSection />
      <AchievementSection />
      <ECMemberCarousel />
      <GallerySection />
      <Footer/>
      

{/* <TweetCard
  avatar="https://avatars.githubusercontent.com/u/1234567?v=4"
  name="John Doe"
  username="johndoe"
  timestamp="1h"
  content="Just launched my new project! Check it out and let me know what you think 🚀"
  image="https://picsum.photos/500/300"
  metrics={{
    replies: 24,
    retweets: 12,
    likes: 348
  }}
/> */}
    </main>
  );
}
