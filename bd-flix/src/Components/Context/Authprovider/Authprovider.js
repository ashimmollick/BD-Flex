import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { app } from '../../Firebase/firebase.config';


import React, { createContext, useState, useEffect } from 'react';

const auth = getAuth(app)
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setuser] = useState(null);
    const [loading, setloading] = useState(true);

    const createUser = (email, password) => {
        setloading(true)
        return createUserWithEmailAndPassword(auth, email, password);



    }

    const providerLogin = (provider) => {
        setloading(true)
        return signInWithPopup(auth, provider);
    }
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile);

    }
    const logout = () => {
        setloading(true)
        return signOut(auth);

    }
    const Resetpass = (email) => {
        return sendPasswordResetEmail(auth, email)

    }





    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setuser(currentUser)
            setloading(false);

        });
        return () => {
            unsubscribe();

        }
    })
    const authInfo = {
        user,
        loading, createUser, signIn, providerLogin, logout, updateUserProfile, Resetpass

    }



    return (

        < AuthContext.Provider value={authInfo} >
            {children}
        </AuthContext.Provider >
    );

}
export default AuthProvider;