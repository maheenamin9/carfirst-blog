import { NavLink } from 'react-router-dom';

const LeftNavbar = () => {
    return (
        <div className="lg:flex lg:space-x-8">
            <NavLink to='/'><img src="/images/logo-pk-light.svg" alt="logo image" className="w-44" /></NavLink>
            <ul className="hidden lg:flex lg:space-x-4 items-center">
                <li>
                    <NavLink to='/aboutUs' >About us</NavLink>
                </li>
                <li>
                    <NavLink to='/location'>Locations</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default LeftNavbar;