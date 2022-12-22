import React from "react";

const BrandsFooter = () => {
    const brandsList = [
        {
            brand: 'Daihatsu',
            model: ['Boon', 'Cuore', 'Esse', 'Mira', 'Move']
        },
        {
            brand: 'Honda',
            model: ['Accord', 'City', 'Civic', 'N']
        },
        {
            brand: 'Mitsubishi',
            model: ['EK']
        },
        {
            brand: 'Nissan',
            model: ['Dayz', 'Moco']
        },
        {
            brand: 'Suzuki',
            model: ['Alto', 'Cultus', 'Liana', 'Mehran', 'Swift', 'Wagon R']
        },
        {
            brand: 'Toyota',
            model: ['Aqua', 'Belta', 'Camry', 'Corolla Altis', 'Corolla Axio', 'Corolla', 'Passo', 'Pixis', 'Prius', 'Vitz']
        },
    ]
    
    return (
        <div className="py-4 md:py-6">
            <h4 className="font-bold pb-2 text-xs">Popular brands</h4>

            {brandsList.map((brandItem, brandIndex) =>
                <div className="text-xs inline" key={brandIndex}>{brandItem.brand}:{' '}
                    {brandItem.model.map((carItem, carIndex) =>
                        <div className="text-secondary inline" key={carIndex}>
                            <a href="#">{carItem}</a>
                            {carIndex < brandItem.model.length - 1 ? <span> / </span> : ' '}
                        </div>
                    )}
                </div>
            )}

        </div>
    )
}

export default BrandsFooter;