import React from "react";
import Card from "../../components/UI/Card";

const OfferSection = () => {
    const offerList = [
        {
            logo: 'images/buy-logo.png',
            heading: 'Buy a car',
            discription: 'Browse through 1000+ verified cars'
        },
        {
            logo: 'images/sell-logo.png',
            heading: 'Sell your car',
            discription: 'Sell your car instantly and safely within an hour'
        },
        {
            logo: 'images/exchange-logo.png',
            heading: 'Exchange your car',
            discription: 'Exchange for a new or used car'
        },
    ]

    return (
        <section>
            <div className="mx-auto max-w-6xl py-8 pl-3 md:py-10 lg:pl-32 xl:pl-0">
                <h2 className="text-2xl font-bold mb-2 md:pl-6 lg:ml-3">What does CarFirst offer?</h2>
                <p className="md:block md:pl-6 lg:pl-10 lg:w-[530px]">From begin to end, we will make sure that there are nearly zero efforts from the customer side. Sit back and relax while we handle the work.</p>
                <div className="flex flex-wrap space-x-6 space-y-3 md:space-y-0 justify-center lg:justify-start lg:ml-10">
                    {offerList.map((listItem, index) =>
                        <Card className="p-7 h-52 w-52 md:w-56" key={index}><a href="#" className="flex flex-col items-center">
                            <img src={listItem.logo} className="w-16 mt-4" alt="buy logo" />
                            <h4 className="font-bold text-secondary">{listItem.heading}</h4>
                            <p className="text-sm">{listItem.discription}</p>
                        </a></Card>
                    )}
                </div>
            </div>
        </section>
    )
}

export default OfferSection;