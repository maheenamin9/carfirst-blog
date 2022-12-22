import { useState } from "react";
import BuyTab from './BuyTab';
import SellTab from './SellTab';
import ExchangeTab from './ExchangeTab';

const HeroSectionForms = () => {
    const [selectedIndex, setIndex] = useState(1);
    function tabHandler(index) {
        setIndex(index);
    }
    const tabList = [
        {
            img: 'images/buy-logo.png',
            heading: 'Buy'
        },
        {
            img: 'images/sell-logo.png',
            heading: 'Sell'
        },
        {
            img: 'images/exchange-logo.png',
            heading: 'Exchange'
        },
    ]

    return (
        <div className="bg-white w-full">
            <div className="p-7">
                <ul className="flex">
                    {tabList.map((tabItem, index) =>
                        <li 
                            className={`flex flex-col w-32 md:w-60 lg:w-32 justify-center items-center cursor-pointer ${index === selectedIndex && "border-b-[3px] border-[#096C59]"}`} 
                            key={index} 
                            onClick={() => tabHandler(index)}>
                                <img className="w-7" src={tabItem.img} />
                                <p>{tabItem.heading}</p>
                        </li>
                    )}
                </ul>
                <hr />
                <div className="pt-9">
                    {selectedIndex === 0 && <BuyTab />}
                    {selectedIndex === 1 && <SellTab />}
                    {selectedIndex === 2 && <ExchangeTab />}
                </div>
            </div>
        </div>
    )
}

export default HeroSectionForms;
