import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { FaHome, FaVideo, FaToggleOn, FaToggleOff } from 'react-icons/fa';

import { FaHome, FaVideo, FaToggleOn, FaToggleOff, FaUserAlt } from 'react-icons/fa';

import { FaEnvelope } from 'react-icons/fa';
import { AuthContext } from '../Context/Authprovider/Authprovider';
import logo from '../../images/brand.png'
import { useEffect } from 'react';
const Navbar = () => {

    const [active, setActive] = useState('home');
    const [AllMoviesSearch, setData] = useState([]);
    const [searchApiData, setSearchApiData] = useState([])
    const [filterVal, setFilterVal] = useState('');
    const { user, logout, mode, Togglebutton } = useContext(AuthContext)

    useEffect(() => {
        fetch('http://localhost:5000/allsearch')
            .then(res => res.json())
            .then(res => {
                setData(res)
                setSearchApiData(res)

            });
    }, [])

    const handlelogout = () => {
        logout()
            .then(() => {

                Navigate('/')
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
        <Link to='/'
            className={`text-2xl text-center py-2 px-6 rounded-full hover:bg-green-700 cursor-pointer ${active === 'home' ? 'bg-green-700' : ''}`}
            onClick={() => setActive('home')}
        >
            <FaHome />
        </Link>
        <Link to='/media'
            className={`text-2xl text-center py-2 px-6 rounded-full hover:bg-green-700 cursor-pointer ${active === 'media' ? 'bg-green-700' : ''}`}
            onClick={() => setActive('media')}
        >
            <FaVideo />
        </Link>
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

            {/* <div className={`navbar bg-black`}>

            {/* <div className={`navbar bg-transparent absolute`} style={{ zIndex: 1 }}>


                <div className="navbar-start">

                    <div className='flex gap-2'>
                        <div className='btn rounded font-mono uppercase bg-none shadow-inner bg-transparent border-none text-xl font-bold text-white'><img src={logo} alt=''></img>-FLIX</div>
                         <div className='font-serif text-xl font-bold text-white'>BD-<span  className="text-green-600">FL</span>IX</div> 
                    </div>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal flex justify-between px-1">
                        {nav}
                    </ul>
                </div>

                <div className="navbar-end">
                    
                    <div className="dropdown">
                        <label tabIndex={0} ><input type='text' placeholder='Search' value={filterVal} onInput={(e) => handleFilter(e)} className="input block w-40 lg:w-full h-10 rounded-xl border-white bg-transparent" /></label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
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
                   
                    {user?.uid ?
                        <>


                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user?.photoURL} />

                            <Link to="/admin" className="hidden lg:block text-white font-bold mx-2 hover:text-green-400 focus:outline-none focus:shadow-outline border-white">Admin</Link>

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
                        <li><Link to='/login' className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">  Login</Link></li>

                    }
                </div>
            </div> */}

            <div className="navbar bg-[#2c2642]">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            {/* <svg xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg> */}
                            <div className='btn rounded font-mono uppercase bg-none shadow-inner text-sm lg:text-xl font-bold text-white'><img className='w-12' src={logo} alt=''></img>-FLIX</div>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {nav}
                        </ul>
                    </div>

                    <div className='hidden lg:block'>
                        <div className='btn rounded font-mono uppercase bg-none shadow-inner text-sm lg:text-xl font-bold text-white'><img className='w-12' src={logo} alt=''></img>-FLIX</div>
                    </div>


                        </>
                        :
                        <ul>
                            <li><Link to='/login' className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"> Login</Link></li>
                        </ul>

                    }
                </div>
            </div>  */}

            <div
                className="navbar bg-transparent absolute" style={{ zIndex: 1 }}>
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {nav}

                            {
                                user?.uid ?
                                    <>
                                        <li>
                                            <Link to="/admin" className="text-white font-bold mx-2 hover:text-green-400 focus:outline-none focus:shadow-outline border-white">Admin</Link>
                                        </li>

                                        <li className="text-white font-bold hover:text-green-400 focus:outline-none focus:shadow-outline" onClick={handlelogout}><Link to='/login'>Logout</Link></li>
                                    </>
                                    :
                                    <li><Link to='/login' className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"> Login</Link></li>
                            }
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-xs btn-ghost normal-case text-xl mx-20">
                        <div className='btn btn-xs rounded font-mono uppercase bg-none shadow-inner bg-transparent border-none text-sm lg:text-xl font-bold text-white'>
                            <img className='w-4 lg:w-12' src={logo} alt='' />-FLIX
                        </div>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {nav}
                    </ul>
                </div>
                <div className="navbar-end">

                    <div className="dropdown">
                        <label tabIndex={0} ><input type='text' placeholder='Search' value={filterVal} onInput={(e) => handleFilter(e)} className="input hidden lg:block w-40 lg:w-full h-10 rounded-xl border-white bg-transparent" /></label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
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

                    <div className="dropdown">
                        <label tabIndex={0} ><input type='text' placeholder='Search' value={filterVal} onInput={(e) => handleFilter(e)} className="input block w-48 lg:w-full h-8 lg:h-10 rounded-3xl bg-[#3a3b3c]" /></label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
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


                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {nav}
                    </ul>
                </div>

                <div className="navbar-end">
                    {user?.uid ?
                        <>
                            <li><Link to="/admin" className="text-white font-bold mr-10 hover:text-green-400 focus:outline-none focus:shadow-outline">  Admin</Link></li>

                    {user?.uid ?
                        <>

                            <Link to="/admin" className="hidden lg:block text-white font-bold mx-2 hover:text-green-400 focus:outline-none focus:shadow-outline border-white">Admin</Link>


                            <div className="dropdown dropdown-end">
                                <label tabIndex={0}
                                    className="hidden lg:block btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">

                                        <img src={user?.photoURL} alt="UserImage" />

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



            {/* ****************************************************************** */}
            {/* bottom navigation bar */}
            {/* ****************************************************************** */}


            <div className="lg:hidden md:hidden fixed bottom-0 w-full z-50">
                <div className="bg-[#2c2642] shadow-lg px-6">

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