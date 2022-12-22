import React from "react";

const Reviews = () => {
    const reviewsList = [
        {
            author: 'Muhammad Hassan Rashid / Suzuki Wagon R',
            quote: 'CarFirst bought my car within two hours. It was the most swift transaction and helped me save a lot of time!'
        },
        {
            author: 'Huma Gailani / Honda Civic VTI Oriel 2011',
            quote: 'I was trying to sell my car for the last two months. CarFirst gave me the price I was looking for without any hassles.'
        },
        {
            author: 'Sajjid Mukhtar / Toyota Corolla GLI 2015',
            quote: 'Loved the car inspection! Within 20 minutes I knew the exact condition of my car and what its worth!'
        },
    ]

    return (
        <div className="flex flex-col space-y-10 lg:space-y-0 lg:flex-row lg:space-x-10">
            {reviewsList.map((listItem, index) =>
                <div className="text-[#343D51] p-6 shadow-xl rounded-br-[60px]" key={index}>
                    <cite className="font-bold not-italic lg:text-sm">{listItem.author}</cite>
                    <blockquote className="lg:text-sm">{listItem.quote}</blockquote>
                </div>
            )}
        </div>
    )
}

export default Reviews;