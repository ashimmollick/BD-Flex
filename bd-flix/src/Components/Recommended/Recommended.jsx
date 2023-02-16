import React from 'react';

const Recommended = ({ movies, video, setVideo }) => {
    const handleVideo = (newVideo) => {
        setVideo(newVideo);
       
    }
    return (
        <div style={{clear:"both"}} className="w-full cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110">
            <div className=''>
                <figure onClick={
                        () => handleVideo(movies.video)}>
                    <img className='h-60 w-full object-cover rounded-md'
                        src={movies.poster_path} alt="Shoes" />
                </figure>
                {/* <h2 className=" absolute bottom-2 text-center md:text-xl  font-bold text-white  mx-2 ">{movies.original_title}</h2> */}
            </div>
        </div>
    );
};

export default Recommended;