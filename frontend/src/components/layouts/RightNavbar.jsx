import { useState } from "react";
import { NavLink } from "react-router-dom";
import Card from "../UI/Card";
import SignOut from "./SignOut";
import Button from "../UI/Button";
import { useSelector } from "react-redux";
import { GiHamburgerMenu } from 'react-icons/gi';

const RightNavbar = () => {
    const [show, setShow] = useState(false);
    const isAdmin = useSelector(state => state.isAdmin);
    function showHandler() {
        setShow(!show);
    }

    return (
        <div className="lg:flex lg:space-x-10">
            <ul className="hidden lg:flex lg:space-x-10 items-center">
                {isAdmin &&
                    <NavLink to='/manageBlogs'><Button className="w-40 h-10 flex justify-center items-center">Manage Blogs</Button></NavLink>
                }
                {!isAdmin &&
                    <NavLink to='/blogs'><Button className="w-28 h-10 flex justify-center items-center">Blogs</Button></NavLink>

                }
                <li className={`active:font-bold`}>
                    <NavLink to="/contactUs">Contact</NavLink>
                </li>
            </ul>
            <div className="flex items-center">

            <div className={`cursor-pointer  relative ${show && "border-[3px] border-black"}`} onClick={showHandler}>
                <GiHamburgerMenu className="w-6 h-6" />
            </div>
            </div>
            {show ? <Card className="absolute top-14 z-30 right-7 bg-[#fafbfb]">
                <ul className="p-4 space-y-5 cursor-pointer">
                    <li>Exchange your car</li>
                    <li>Corporate</li>
                    <li>Dealers</li>
                    <li>Dost Program</li>
                    <SignOut />
                </ul>
            </Card> : ""}
        </div>
    )
}

export default RightNavbar;