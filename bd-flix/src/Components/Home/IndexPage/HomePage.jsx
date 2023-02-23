import React from 'react';
import useTitle from '../../../Hooks/UseTitle/UseTitle';
import Brand from '../Brand';
import Slider from '../IndexSlider/Slider';
import MostPopular from '../MostPopular/MostPopular';
import MoviesForYou from '../MostPopular/MoviesForYou';
import SiFi from '../MostPopular/SiFi';
import Thriller from '../MostPopular/Thriller';
import Adventure from '../MostPopular/Adventure';
import Action from '../MostPopular/Action';
import Romantic from '../MostPopular/Romantic';
import Comedy from '../MostPopular/Comedy';
import Filter from './Filter/Filter';


const HomePage = () => {
    useTitle('Home')
    return (
        <div>
            <Slider></Slider>
            <Filter></Filter>
            <Brand></Brand>
            <MostPopular></MostPopular>
            <SiFi></SiFi>
            <Thriller></Thriller>
            <Adventure></Adventure>
            <Action></Action>
            <Romantic></Romantic>
            {/* <MoviesForYou></MoviesForYou> */}
            <Comedy></Comedy>
        </div>
    );
};

export default HomePage;