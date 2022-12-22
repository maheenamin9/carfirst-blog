import React from "react";
import LeftNavbar from './LeftNavbar';
import RightNavbar from './RightNavbar';

const Navbar = () => {
    return (
        <React.Fragment>
            <nav className="bg-[#fafbfb] p-4 lg:px-[21px] lg:py-4">
                <div className="flex justify-between items-center lg:flex-none">
                    <LeftNavbar />
                    <RightNavbar />               
                </div>
            </nav>
        </React.Fragment >
    );
}

export default Navbar;