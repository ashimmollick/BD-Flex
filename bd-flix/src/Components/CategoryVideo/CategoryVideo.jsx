import React, { useEffect, useState } from 'react';
import { useLoaderData, useLocation } from 'react-router-dom';
import SplashScreen from '../../SplashScreen/SplashScreen';
import AllmoviesCard from '../Movies/AllmoviesCard';

const CategoryVideo = () => {
    const data = useLoaderData();
    const [allMovies, setAllMovies] = useState([]);
    // setAllMovies(data)


    const { state } = useLocation();
    const category = state ;
    console.log(category);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`https://bd-flix-server-i4wbktqxf-mohammad0076.vercel.app/allmovie/${category}`)
            .then(res => res.json())
            .then(res => {
                setAllMovies(res)
                setLoading(false)
            });
    }, [category])





    // console.log(allMovies);
    return (
        <div className='relative top-16' style={{clear:"both"}}>
            <h2 className='p-3 font-semibold text-white'> {category.toUpperCase()} </h2>

            {
                loading ? <><SplashScreen></SplashScreen></> :
                    <div className='grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2'>
                        <>
                            {
                                allMovies.map(data => <AllmoviesCard loading={false} allMovies={data}></AllmoviesCard>)

                            }

                        </>
                    </div>
            }


        </div>
    );
};

export default CategoryVideo;