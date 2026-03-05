import BestSellers from "../components/home/BestSellers";
import CategoryShowcase from "../components/home/Category";
import CustomCTABanner from "../components/home/CustomCTA";
import FAQ from "../components/home/FAQ";
import GiftingSection from "../components/home/GiftingSection";
import HeroSlider from "../components/home/HeroSlider";
import HowItsMade from "../components/home/HowMade";
import InstagramGallery from "../components/home/InstaGallery";
import NewArrivals from "../components/home/NewArrivals";
import Newsletter from "../components/home/NewsLetter";
import ProductsSection from "../components/home/ProductsSection";
import StatsBar from "../components/home/StatsBar";
import Testimonials from "../components/home/Testiminols";
import WhyChooseUs from "../components/home/WhyChooseUs";
import TagProductsSection from "../components/products/TagProductsSection";

export default function HeroPage() {
  return (
    <>
      <HeroSlider />
      <ProductsSection />
      <StatsBar />
      <CategoryShowcase />
      <BestSellers />
      <TagProductsSection
        tag="eid"
        heading="Eid Celebration Picks"
        subtitle="Premium decor selected for your festive gifting and home setup."
        viewMoreLabel="View Eid"
      />
      <WhyChooseUs />
      <CustomCTABanner/>
      <GiftingSection />
      <Testimonials />
      <InstagramGallery />
      <FAQ/>

      {/* <TagProductsSection
        tag="ramadan"
        heading="Ramadan Essentials"
        subtitle="Meaningful pieces curated for prayer corners and family spaces."
        viewMoreLabel="View Ramadan"
      /> */}
    </>
  );
}
