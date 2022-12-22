import React from "react";

const FeatureSectionRightCol = () => {

    const featureSectionList = [
        { 
            heading: 'Fair prices', 
            discription: 'Whether you sell, buy or exchange your car, we can assure market-conform and fair prices.' 
        },
        {
            heading: 'A clear and transparent process', 
            discription: 'We offer a clear and transparent process for all of our clients using any of our services. We will help you in every step on the way.' 
        },
        { 
            heading: 'Secure and safe transactions', 
            discription: 'Never need to worry anymore about unsafe payments. We got your back with our secure and certified RC transfers.' 
        },
        { 
            heading: 'We arrange your paperwork', 
            discription: 'Never worry about the hassle of doing paperwork. Just bring the required documents and we will do the rest.' 
        },
    ]

    return (
        <React.Fragment>
            {featureSectionList.map((listItem, index) =>
                <div className="mb-5 px-3 md:px-6 lg:pr-20" key={index}>
                    <h4 className="font-bold mb-2"><i className="text-[#8AB25D] text-xl fa fa-check-circle mr-3" aria-hidden="true"></i>
                        {listItem.heading}
                    </h4>
                    <p className="pl-7">{listItem.discription}</p>
                </div>
            )}
        </React.Fragment>
    )
}

export default FeatureSectionRightCol;