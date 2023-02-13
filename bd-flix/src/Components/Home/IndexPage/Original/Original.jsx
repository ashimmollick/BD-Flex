import React from 'react';
import { Link } from 'react-router-dom';

const Original = ({ images }) => {
    return (
        <Link className="w-full p-1" to={`/clickedvideo/${images.id}`}>
            <div className="carousel-item lg:h-full h-[250px]">
                <img src={images?.poster_path} className="rounded-md" alt="" />
            </div>

        </Link>
    );
};

export default Original;