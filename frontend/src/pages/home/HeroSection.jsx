import React from "react";
import HeroSectionList from './HeroSectionList';
import HeroSectionForms from './HeroSectionForms';

const HeroSection = () => {
    return (
        <section className="bg-[url('/images/hero-min.jpg')] bg-cover w-full">
            <div className="mx-auto max-w-6xl px-4 md:px-10 lg:px-32 xl:px-4 lg:flex">
                <HeroSectionList />
                <HeroSectionForms />
            </div>
        </section>
    )
}

export default HeroSection;