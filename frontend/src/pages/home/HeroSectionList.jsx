import React from "react";

const HeroSectionList = () => {
    const heroSectionList = [
        'We will buy your used car, assist you in buying a new one or help you exchange it',
        'Secure, instant and online payments',
        'We arrange all the paperwork'
    ]

    return (
        <div className="space-y-2 pt-5 pb-12 lg:space-y-6 md:mr-14">
            <h1 className="text-white font-bold text-2xl lg:text-[43px] lg:leading-[55px]">Selling, buying and exchanging your car has never been this easy</h1>
            {heroSectionList.map((listItem, index) =>
                <div className="flex hero-list" key={index}><i className="fa fa-check-circle text-btnColor text-2xl mr-3 md:text-3xl" aria-hidden="true"></i>
                    <p className="text-white font-bold pt-1.5">{listItem}</p>
                </div>
            )}
        </div>
    )
}

export default HeroSectionList;