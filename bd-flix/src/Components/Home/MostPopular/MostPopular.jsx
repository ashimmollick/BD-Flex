import React, { useState } from 'react';
import './poster.css';
import { AiOutlineArrowRight } from "react-icons/ai"
import { useEffect } from 'react';
import Original from '../IndexPage/Original/Original';
import { useContext } from 'react';
import { AuthContext } from '../../Context/Authprovider/Authprovider';

const MostPopular = () => {
    const [loading, setLoading] = useState(false);
    const [MostPopular, setMostPopular] = useState([]);
    const {userInfo} = useContext(AuthContext);
    // console.log("newuser", userInfo);

    useEffect(() => {
        setLoading(true);
        fetch('https://bd-flix-server-i4wbktqxf-mohammad0076.vercel.app/allmovie/MostPopularMovie')
            .then(res => res.json())
            .then(res => {
                setMostPopular(res)
                setLoading(false)
            })
    }, [])



    const [arrowButtonVisibility, setArrowButtonVisibility] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevSlide = () => {
        setCurrentIndex(currentIndex - 1);
    };

    const handleNextSlide = () => {
        setCurrentIndex(currentIndex + 1);
    };

    return (
        <>

            <div className='lg:my-2 p-4'>
                <div className='flex justify-between mb-3'>
                    <h1 className='text-md font-bold text-current text-white'>Most Popular</h1>
                    <p className='text-white inline'>See all <AiOutlineArrowRight className='inline text-red-500'></AiOutlineArrowRight></p>
                </div>

                <>
                    {
                        loading ? "Loding..." : <div className="carousel carousel-center lg:h-[20vw] h-full"
                            onMouseEnter={() => setArrowButtonVisibility(true)}
                            onMouseLeave={() => setArrowButtonVisibility(false)}>
                            <div className="carousel-item">
                                {
                                    MostPopular.map((images, index) => (
                                        <Original images={images}></Original>
                                       
                                    ))
                                }

                               
                            </div>
                        </div>
                    }


                </>
            </div>

        </>
    );
};

export default MostPopular;