import Button from "../UI/Button";

const PrimaryFooterBtns = () => {
    const primaryFooterBtns = ['Buy', 'Sell', 'Exchange' ]
    
    return (
        <div className="space-y-2 md:w-1/2">
            <h3 className="font-bold ">What do you want to do?</h3>
            <p className="">Choose from our range of services.</p>
            <div className="space-x-4">
                
                {primaryFooterBtns.map((listItem, index)=> 
                    <a href="#" key={index}><Button 
                        className="flex-start px-4 py-2 lg:w-40 lg:h-12" 
                    >{listItem}</Button></a>
                )}

            </div>
        </div>
    )
}

export default PrimaryFooterBtns;