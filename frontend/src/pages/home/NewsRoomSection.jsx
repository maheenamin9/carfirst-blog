import React from "react";

const NewsRoomSection = () => {
    const newsRoomPics = [
        { img: 'images/dawn.jpg', width: 'w-20' },
        { img: 'images/the-news.jpg', width: 'w-28' },
        { img: 'images/express-tribune.png', width: 'w-28' },
        { img: 'images/the-nation.png', width: 'w-24' },
        { img: 'images/geo-news.jpg', width: 'w-11' },
        { img: 'images/business-recorder.png', width: 'w-28' },
    ]

    return (
        <section>
            <div className="pt-10 pb-6 bg-gradient-to-b from-gray-50 to-white">
                <div className="flex flex-col items-center space-y-8 md:flex-row md:mx-4 md:space-x-[75px] md:space-y-0 flex-wrap md:justify-center">
                    {newsRoomPics.map((listItem, index) =>
                        <div key={index}>
                            <img 
                                src={listItem.img} 
                                className={listItem.width + " opacity-50 grayscale hover:opacity-100 hover:grayscale-0"} alt="newsRoom pic" 
                            />
                        </div>
                    )}
                </div>
                <div className="flex justify-center pt-6">
                    <a href="#"><button className="border-2 border-green-900 p-3 text-base rounded-3xl font-bold">Views News Room</button></a>
                </div>
            </div>
        </section>
    )
}

export default NewsRoomSection;