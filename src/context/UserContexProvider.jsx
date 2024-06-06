import React, { useEffect, useState } from 'react';
import UserContext from './UserContext.jsx';
import {jwtDecode} from 'jwt-decode';

function UserContextProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 > Date.now()) {
                    setIsLogin(true);
                    setUser(decoded); 
                } else {
                    localStorage.removeItem('token');
                    setIsLogin(false);
                }
            } catch (error) {
                console.error("Invalid token:", error);
                localStorage.removeItem('token');
                setIsLogin(false);
            }
        } else {
            setIsLogin(false);
        }
    }, []);

    const logout = () => {
        const confirmLogout = window.confirm('Want to LogOut?');
        if (confirmLogout) {
            setIsLogin(false);
            setUser(null);
            localStorage.removeItem('token');
        }
    };

    return (
        <UserContext.Provider value={{ isLogin, setIsLogin, user, setUser, logout}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
