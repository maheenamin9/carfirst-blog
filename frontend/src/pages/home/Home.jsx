import React from "react";
import NavBar from '../../components/layouts/NavBar';
import HeroSection from './HeroSection';
import OfferSection from './OfferSection';
import FeatureSection from './FeatureSection';
import ReviewsSection from './ReviewsSection';
import NewsRoomSection from './NewsRoomSection';
import Footer from '../../components/layouts/Footer';

const Home = () => {
    return (
        <React.Fragment>
            <NavBar />
            <HeroSection />
            <OfferSection />
            <FeatureSection />
            <ReviewsSection />
            <NewsRoomSection />
            <Footer />
        </React.Fragment>
    )
}
export default Home;