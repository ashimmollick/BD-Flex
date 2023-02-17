import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FaHome, FaVideo, FaToggleOn, FaToggleOff, FaUserAlt } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { AuthContext } from '../Context/Authprovider/Authprovider';
import logo from '../../images/brand.png';
import { MdPlayCircle } from "react-icons/md";
import { useEffect } from 'react';
import useAdmin from '../../Hooks/Admin/useAdmin';
const Navbar = () => {

    const [active, setActive] = useState('home');
    const [AllMoviesSearch, setData] = useState([]);
    const [searchApiData, setSearchApiData] = useState([])
    const [filterVal, setFilterVal] = useState('');
    const { user, logout, mode, Togglebutton } = useContext(AuthContext)
    const [isAdmin] = useAdmin(user?.email)

    useEffect(() => {
        fetch('https://bd-flix-server-emonkumardas.vercel.app/allsearch')
            .then(res => res.json())
            .then(res => {
                setData(res)
                setSearchApiData(res)

            });
    }, [])

    const handlelogout = () => {
        logout()
            .then(() => {

                // Navigate('/Welcome')
                window.location.replace("http://localhost:3000/Welcome")
            }).catch(error => console.error(error))
    }

    const nav = <>
        <li><Link to='/' className="text-white font-bold hover:text-green-400 focus:outline-none focus:shadow-outline">Home</Link></li>
        <li><Link to='/premium' className="text-white font-bold hover:text-green-400 focus:outline-none focus:shadow-outline">  Premium</Link></li>
        <li><Link to='/tvshows' className="text-white font-bold hover:text-green-400 focus:outline-none focus:shadow-outline">  Tv Shows</Link></li>
        <li><Link to='/movies' className="text-white font-bold hover:text-green-400 focus:outline-none focus:shadow-outline">  Movies</Link></li>



        {/* <button className={`text-white font-bold hover:text-green-400 focus:outline-none focus:shadow-outline`} onClick={Togglebutton}>{mode === "light" ? <FaToggleOn></FaToggleOn> : <FaToggleOff></FaToggleOff>}</button> */}

    </>

    const bottomNav = <>

        <Link to='/media'
            className={`text-2xl text-center py-2 px-2 rounded-full hover:bg-green-700 cursor-pointer ${active === 'media' ? 'bg-green-700' : ''}`}
            onClick={() => setActive('media')}
        >
            <FaVideo />
        </Link>
        <Link to='/media'
            className={`text-2xl text-center py-2 px-6 rounded-full hover:bg-green-700 cursor-pointer ${active === 'media' ? 'bg-green-700' : ''}`}
            onClick={() => setActive('media')}
        >
            <FaVideo />
        </Link>
        {/* middle ------------------------------- */}
        <Link to='/'
            className={`text-6xl relative bottom-7 text-center border-solid border-2 border-green-800  rounded-full bg-transparent cursor-pointer ${active === 'home' ? 'bg-green-700' : ''}`}
            onClick={() => setActive('home')}
        >

            <MdPlayCircle />
        </Link>
        {/* middle ------------------------------- */}
        <Link
            className={`text-2xl text-center py-2 px-6 rounded-full hover:bg-green-700 cursor-pointer ${active === 'message' ? 'bg-green-700' : ''}`}
            onClick={() => setActive('message')}
        >
            <FaEnvelope />
        </Link>

        {
            user?.uid ?

                <Link to="/profile">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={user?.photoURL} alt='' />
                        </div>
                    </label>
                </Link>
                :
                <Link to='/login'>
                    <FaUserAlt />
                </Link>
        }
    </>



    const handleFilter = (e) => {

        if (e.target.value === '') {
            setData(searchApiData)
        } else {

            const filterSearch = searchApiData.filter(it => it?.title?.toLowerCase().includes(e.target.value.toLowerCase()));
            setData(filterSearch)
        }
        setFilterVal(e.target.value)
    }
    return (
        <>


            <div
                className="navbar absolute w-full" style={{ zIndex: 1 }}>
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-slate-800 rounded-box w-52">
                            {nav}
                            {
                                user?.uid ?
                                    <>
                                        <li className="text-white font-bold hover:text-green-400 focus:outline-none focus:shadow-outline" onClick={handlelogout}><Link to='/login'>Logout</Link></li>
                                    </>
                                    :
                                    <li><Link to='/login' className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"> Login</Link></li>
                            }
                        </ul>
                    </div>
                    <Link to="/" className="normal-case lg:block md:block hidden text-xl">
                        <div className='btn rounded font-mono uppercase shadow-inner bg-transparent border-none text-sm lg:text-xl font-bold text-white'>
                            <img className='w-4 lg:w-12' src={logo} alt='' />-FLIX
                        </div>
                    </Link>
                    
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {nav}
                    </ul>
                </div>
                <div className="navbar-end overflow-hidden">

                    <div className="dropdown mx-8">
                        <label tabIndex={0} >
                            <input type='text' placeholder='Search' value={filterVal} onInput={(e) => handleFilter(e)} className="input hidden lg:block w-40 lg:w-full h-10 rounded-lg border-white bg-transparent" /></label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 ">
                            <li>{
                                AllMoviesSearch?.slice(0, 3).map(it => {
                                    return (
                                        <Link to={`/allmovie/${it.id}` && `/clickedvideo/${it.id}` && `/moviesforyou/${it.id}`} key={it.id}>
                                            {it.original_title.toLowerCase()}
                                        </Link>
                                    );
                                }
                                )
                            }</li>

                        </ul>
                    </div>


                    {
                        user?.uid ?
                            <>
                                {
                                    isAdmin && <>
                                        <Link to="/admin" className="text-white font-bold mr-10 hover:text-green-400 focus:outline-none focus:shadow-outline">  Admin</Link>

                                    </>
                                }

                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0}
                                        className="hidden lg:block btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={user?.photoURL} alt='' />
                                        </div>
                                    </label>
                                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                        <li className="text-white font-bold hover:text-green-400 focus:outline-none focus:shadow-outline" ><Link to='/profile'>Profile</Link></li>
                                        <li className="text-white font-bold hover:text-green-400 focus:outline-none focus:shadow-outline" onClick={handlelogout}><Link to='/login'>Logout</Link></li>
                                    </ul>
                                </div>

                            </>
                            :
                            <ul>
                                <li><Link to='/login' className="hidden lg:block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"> Login</Link></li>
                            </ul>

                    }
                </div>
            </div>



            <div className="lg:hidden md:hidden fixed bottom-0 z-50 w-full">
                <div className="bg-black shadow-lg px-6">
                    <div className="flex items-center justify-between">
                        {
                            bottomNav
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;