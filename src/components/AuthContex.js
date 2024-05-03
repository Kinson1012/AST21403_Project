import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const verifySession = async () => {
            const sessionIsActive = await checkSession();
            setIsLoggedIn(sessionIsActive);
        };

        verifySession();
    }, []);

    const checkSession = async () => {
        try {
            const response = await fetch('/api/session', {
                credentials: 'include'
            });
            const data = await response.json();

            return data.isLoggedIn;
        } catch (error) {
            console.error('Failed to check session', error);
            return false;
        }
    };

    const login = () => {
        console.log("Logging in, setting isLoggedIn to true");
        setIsLoggedIn(true);
    };
    const logout = () => {
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);