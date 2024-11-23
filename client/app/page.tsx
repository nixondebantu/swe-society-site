import {Footer} from "@/components/global/Footer";
import Navbar from "@/components/global/Navbar";
import AchievementSection from "@/components/homepage/AchievementSection";
// import AchievementSection from "@/components/homepage/AchievementSection";
// import BlogSection from "@/components/homepage/BlogSection";
import Carousel from "@/components/homepage/Carousel";
import ECMemberCarousel from "@/components/homepage/ECMemberCarousel";
import EventSection from "@/components/homepage/EventSection";
import Hero from "@/components/homepage/Hero";
import NoticeSection from "@/components/homepage/NoticeSection";
import BlogSection from "@/components/blogspage/blogSection";
import HomeBlogSection from "@/components/blogspage/homeBlogSection";
import HomeNoticeSection from "@/components/noticespage/homeNoticeSection";
import HomeEvent from "@/components/homepage/EventSection";
export default function Home() {
  return (
    <main>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      <Hero />
     
      {/* <Carousel /> */}
      {/* <EventSection /> */}
    <HomeEvent/>
      <HomeNoticeSection/>
      {/* <BlogSection /> */}
     
      <HomeBlogSection/>
      <AchievementSection />
      <ECMemberCarousel />
      {/* <GallerySection /> */}
      <Footer/>
      


    </main>
  );
}
