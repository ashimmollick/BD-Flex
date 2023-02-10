import React from 'react';
import useTitle from '../../../Hooks/UseTitle/UseTitle';
import Slider from '../IndexSlider/Slider';
import MostPopular from '../MostPopular/MostPopular';
import MoviesForYou from '../MoviesForYou/MoviesForYou';
import Filter from './Filter/Filter';
// import SeriesIndex from '../Series/SeriesIndex/SeriesIndex';

const HomePage = () => {
    useTitle('Home')
    return (
        <div>
            <Slider></Slider>
            <Filter></Filter>
            <MostPopular></MostPopular>
            <MoviesForYou></MoviesForYou><br /><br />
            {/* <SeriesIndex></SeriesIndex> */}
        </div>
    );
};

export default HomePage;