import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import HeroWorkday from "@/components/HeroWorkday";
import MorningTicker from "@/components/MorningTicker";
import BreakfastClock from "@/components/BreakfastClock";
import MorningPlates from "@/components/MorningPlates";
import CoffeeCounter from "@/components/CoffeeCounter";
import LunchCounter from "@/components/LunchCounter";
import FocacciaStack from "@/components/FocacciaStack";
import MenuSection from "@/components/Menu/MenuSection";
import HotMeals from "@/components/HotMeals";
import PastryWindow from "@/components/PastryWindow";
import CateringTransition from "@/components/CateringTransition";
import CateringBuilder from "@/components/Catering/CateringBuilder";
import CateringPackage from "@/components/Catering/CateringPackage";
import OfficeRun from "@/components/OfficeRun";
import DietarySection from "@/components/DietarySection";
import PhotoContactSheet from "@/components/PhotoContactSheet";
import FeedbackWall from "@/components/FeedbackWall";
import HoursTimeline from "@/components/HoursTimeline";
import LocationDirectory from "@/components/LocationDirectory";
import FinalCateringCTA from "@/components/FinalCateringCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <HeroWorkday />
        <MorningTicker />
        <BreakfastClock />
        <MorningPlates />
        <CoffeeCounter />
        <LunchCounter />
        <FocacciaStack />
        <MenuSection />
        <HotMeals />
        <PastryWindow />
        <CateringTransition />
        <CateringBuilder />
        <CateringPackage />
        <OfficeRun />
        <DietarySection />
        <PhotoContactSheet />
        <FeedbackWall />
        <HoursTimeline />
        <LocationDirectory />
        <FinalCateringCTA />
      </main>
      <Footer />
    </>
  );
}
