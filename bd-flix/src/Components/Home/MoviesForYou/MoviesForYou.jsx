import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { AiOutlineArrowRight } from "react-icons/ai"
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/Authprovider/Authprovider';
import './MovieForyou.css';

const MoviesForYou = () => {

    const navigate = useNavigate();


    const [MoviesForYou, setMoviesForYou] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('https://bd-flix-server-i4wbktqxf-mohammad0076.vercel.app/allmovie/MoviesForYou')
            .then(res => res.json())
            .then(res => {
                setMoviesForYou(res)
                setLoading(false)
            });
    }, [])

    // useEffect(() => {
    //     fetch('https://api.themoviedb.org/3/discover/movie?with_genres=878&with_cast=500&sort_by=vote_average.desc&api_key=eee5a0807cf7657a9864307cf8ff4c84')
    //         .then(res => res.json())
    //         .then(result => setMoviesForYou(result.results))
    // }, [])

    // let image = 'https://image.tmdb.org/t/p/w500/';

   

    const [arrowButtonVisibility, setArrowButtonVisibility] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevSlide = () => {
        setCurrentIndex(currentIndex - 1);
    };

    const handleNextSlide = () => {
        setCurrentIndex(currentIndex + 1);
    };


    const handleClickVideo = (movie) => {
        navigate('/clickedvideo', { state: { movie } })
    }

    return (
        <div className='relative my-8 p-4'>
            <div className='flex justify-between mb-3'>
                <h1 className='text-md font-bold text-white'>Movies For You</h1>
                <p className='text-white inline'>See all <AiOutlineArrowRight className='inline text-red-500'></AiOutlineArrowRight></p>
            </div>
            <>
                {
                    loading ? "Loading..." : <div className="carousel carousel-center space-x-4 lg:h-[40vh] h-[30vh]"
                        onMouseEnter={() => setArrowButtonVisibility(true)}
                        onMouseLeave={() => setArrowButtonVisibility(false)}
                    >
                        <div className="carousel-item">
                            {
                                MoviesForYou.map((images, index) => (
                                    <Link to={`/moviesforyou/${images.id}`}
                                        key={index}
                                        className={`carousel-item cursor-pointer ${index === currentIndex ? 'active' : ''}`}
                                        style={{
                                            transform: `translateX(${-100 * currentIndex}%)`,
                                            transition: 'transform 0.3s ease-in-out',
                                        }}>

                                        <div className="relative w-full overflow-hidden mr-5 cursor-pointer carousel-item">
                                            <div className='relative transition-transform duration-300 ease-in-out transform hover-zoom'>

                                                <img
                                                    className='rounded-md object-cover w-full h-full'
                                                    src={images.poster_path} alt=''
                                                ></img>
                                                <div className="movie-for-you-gradient absolute bottom-0 left-0 w-full h-2/6"></div>
                                            </div>

                                            {/* <h2 className="absolute bottom-[8%] text-center md:text-lg text-white mx-2 ">{images.original_title
}</h2> */}

                                        </div>
                                    </Link>
                                ))
                            }

                            {/* <button
                                className={`lg:block hidden absolute top-[40%] bg-white text-red-700 rounded-full left-0 p-4 ${arrowButtonVisibility ? '' : 'hidden'}`}
                                onClick={handlePrevSlide}
                            >
                                <FaAngleLeft />
                            </button>


                            <button
                                className={`lg:block hidden absolute top-[40%] bg-white rounded-full right-0 text-red-700 p-4 ${arrowButtonVisibility ? '' : 'hidden'}`}
                                onClick={handleNextSlide}
                            >
                                <FaAngleRight />
                            </button> */}
                        </div>
                    </div>
                }


            </>
        </div>
    );
};

export default MoviesForYou;