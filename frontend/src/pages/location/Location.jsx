import React from "react";
import Navbar from "../../components/layouts/NavBar";
import ChooseCity from './ChooseCity';
import Map from './Map';

const Location = () => {
    return(
        <React.Fragment>
            <Navbar />
            <div className="h-80">
                <ChooseCity />
                <Map />
            </div>
        </React.Fragment>
    )
}

export default Location;