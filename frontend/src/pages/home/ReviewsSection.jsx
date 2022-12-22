import React from "react";
import Reviews from './Reviews';

const ReviewsSection = () => {
    return (
        <section>
            <div className="mx-auto max-w-6xl mt-8 mb-12 px-3 p-5 md:px-6 lg:px-32 xl:px-12">
                <div>
                    <h2 className="text-2xl font-bold pb-4 md:pr-[400px]">1000+ happy customers used CarFirst before you</h2>
                    <p className="pb-4">Don't take our word for it! Read our customer's reviews.</p>
                </div>
                <Reviews />
            </div>
        </section>
    )
}

export default ReviewsSection;