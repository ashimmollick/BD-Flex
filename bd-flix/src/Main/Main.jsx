import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';
import Navbar from '../Components/Navbar/Navbar';
// import Slider from '../Components/Home/IndexSlider/Slider';
const Main = () => {
    return (
        <>
        <div className='relative'style={{clear:"both"}}>
            <Navbar></Navbar>
            <Outlet></Outlet>
            </div>
           <div className='' style={{clear:"both"}}>
           <Footer></Footer>
           </div>
           </>
    );
};

export default Main;


