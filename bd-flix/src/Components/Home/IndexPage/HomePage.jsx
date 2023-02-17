import React from 'react';
import useTitle from '../../../Hooks/UseTitle/UseTitle';
import Brand from '../Brand';
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
<<<<<<< HEAD
            <MostPopular></MostPopular>
            <MoviesForYou></MoviesForYou><br /><br />
            {/* <SeriesIndex></SeriesIndex> */}
=======
            <Brand></Brand>
            <MostPopular></MostPopular>
            <MoviesForYou></MoviesForYou><br /><br />
>>>>>>> 6ffc755a12e49034e7ec62141af2654bb4928700
        </div>
    );
};

export default HomePage;