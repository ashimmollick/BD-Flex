import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../Authprovider';

import { toast } from 'react-toastify';
import useTitle from '../../../../Hooks/UseTitle/UseTitle';
import { setAuthToken } from '../../../../Token/AuthToken';







const Login = () => {
    const [error, setError] = useState('')
    const [loading, setloading] = useState(false)

    useTitle('Login')







    const { signIn, user } = useContext(AuthContext)

    const navigate = useNavigate()
    const location = useLocation();
    const form = location?.state?.from?.pathname || '/';

    const handlelogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password).then(result => {
            const user = result.user;



            form.reset();
            setError('')
            navigate(form, { replace: true })
        }).catch(error => {
            console.log(error)
            setError(error.message)
            if (error === 'Firebase: Error (auth/user-not-found).') {
                toast.error('WRONG EMAIL')
            }


            else if (error === 'Firebase: Error (auth/wrong-password).') {
                toast.error('WRONG  Password')
            }

        })

    }
    const { providerLogin, Resetpass } = useContext(AuthContext)



    const reset = () => {
        Resetpass()
    }
    const googleProvider = new GoogleAuthProvider()

    const handlegoogle = () => {

        providerLogin(googleProvider)
            .then(result => {
                const user = result.user;


                navigate('/')
            })
            .catch(error => console.error(error))
    }





    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content md:grid-cols-2 flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6 hidden lg:block">I know all about this. For years I have been continuously improving, accumulating knowledge and experience.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handlelogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name="email" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="text" name="password" placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <Link to='/forget' className="label-text-alt link  text-green-700 hover:text-green-400">Forgot password?</Link>
                            </label>
                        </div>
                        <div>
                            {/* <h1 className='text-red-400 font-bold'>{error}</h1> */}
                            {/* Firebase: Error (auth/email-already-in-use) */}
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" className="btn btn-primary text-green-700 hover:text-green-400 lg:text-2xl  focus:outline-none " value={loading ? "loading..." : 'login'} />

                        </div>
                        <div className="form-control mt-6">
                            <input onClick={handlegoogle} type="submit" className="btn bg-green-700 text-white hover:text-green-400 lg:text-lg  focus:outline-none " value="Google login" />

                        </div>

                    </form>
                    <p className='text-center my-5'>new to BDFLIX? <Link className="label-text-alt link link-hover text-green-600 font-bold py-10 " to='/signup'>Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;