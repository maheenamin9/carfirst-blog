import React from "react";
import FeatureSectionRightCol from './FeatureSectionRightCol';

const FeatureSection = () => {
    return (
        <section className="bg-gray-100">
            <div className="mx-auto max-w-6xl py-4 md:py-12 lg:px-32 xl:px-4">
                <div className="pl-3 md:pl-6 lg:pl-9">
                    <h2 className="text-2xl font-bold mb-2">What to expect</h2>
                    <p className="mb-2">How do we compare with other ways to sell?</p>
                </div>
                <div className="flex flex-col-reverse lg:flex-row lg:space-x-20">
                    <div className="left-col md:mx-2 lg:pl-8">
                        <img className="md:w-full lg:w-[80rem] xl:w-[65rem]" src="./images/whychooseus-pk.jpg" alt="why choose us" />
                    </div>
                    <div className="right-col">
                        <FeatureSectionRightCol />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FeatureSection;