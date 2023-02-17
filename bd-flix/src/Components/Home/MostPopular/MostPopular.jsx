import React, { useState } from 'react';
import './poster.css';
import { AiOutlineArrowRight } from "react-icons/ai"
import { useEffect } from 'react';
import Original from '../IndexPage/Original/Original';
import { useContext } from 'react';
import { AuthContext } from '../../Context/Authprovider/Authprovider';
import { Link } from 'react-router-dom';

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

  
        {/* <div className='relative my-12 lg:my-2 p-4'>
            <div className='flex justify-between mb-3'>
                <h1 className='text-md   font-bold text-white'>Most Popular</h1> */}

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
  
                                        <div
                                            key={index}
                                            className={`carousel-item cursor-pointer ${index === currentIndex ? 'active' : ''}`}
                                            style={{
                                                transform: `translateX(${-100 * currentIndex}%)`,
                                                transition: 'transform 0.3s ease-in-out',
                                            }}>

                                            <Link to={`/clickedvideo/${images.id}`} className="carousel-item mr-3 overflow-hidden">
                                                <div className='relative transition-transform duration-300 ease-in-out transform hover-zoom'>

                                                    <img
                                                        className='object-cover rounded-sm lg:h-full h-[300px] w-full'
                                                        src={images.poster_path} alt=''
                                                    ></img>

                                                    {/* <h2 className=" absolute bottom-[8%] left-0 md:text-md text-md font-semibold text-white mx-2 ">{images.name}</h2> */}
                                                    <div className="most-popular-gradient absolute bottom-0 left-0 w-full h-2/6"></div>
                                                </div>

                                            </Link>
                                        </div>
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