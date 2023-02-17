import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';
import Navbar from '../Components/Navbar/Navbar';
// import Slider from '../Components/Home/IndexSlider/Slider';
const Main = () => {
    return (
<<<<<<< HEAD
        <div className='relative'>
            <Navbar></Navbar>
            <Outlet></Outlet>
           <div className='mt-20' style={{clear:"both"}}>
           <Footer></Footer>
           </div>
        </div>
=======
        <>
        <div className='relative'style={{clear:"both"}}>
            <Navbar></Navbar>
            <Outlet></Outlet>
            </div>
           <div className='' style={{clear:"both"}}>
           <Footer></Footer>
           </div>
           </>
>>>>>>> 6ffc755a12e49034e7ec62141af2654bb4928700
    );
};

export default Main;


