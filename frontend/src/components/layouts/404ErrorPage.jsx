import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import Button from '../UI/Button';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return(
        <React.Fragment>
            <NavBar />
            <div className='flex flex-col bg-[#f2f4f8] px-5 md:flex-row lg:px-44 md:pt-24 md:pb-5'>
                <div className='flex flex-col py-12 lg:py-24 lg:w-1/2'>
                    <h2 className='font-bold text-2xl'>Oops! We're Lost!</h2>
                    <p className='mb-12 text-lg'>The requested page was not found</p>
                    <Link to='/'>
                        <Button className='w-52 h-12'>Take me back Home</Button>
                    </Link>
                </div>
                <div className='pb-2 lg:w-1/2'>
                    <img src="images/404error.png" className='xl:w-[33rem]' alt="404 image" />
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default ErrorPage;