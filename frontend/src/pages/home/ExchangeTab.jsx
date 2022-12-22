import React from "react";
import Button from "../../components/UI/Button";

const ExchangeTab = () => {
    return (
        <React.Fragment>
            <h3 className="font-bold">Exchange your used car for a brand new one</h3>
            <p>Benefit from our partnerships and exchange your used car</p>
            <Button type="submit" className="w-full" >Exchange your car</Button>
        </React.Fragment>
    )
}

export default ExchangeTab;