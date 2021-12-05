import React, { useState, useEffect } from 'react'
import { AppRouter } from './router/AppRouter'
import { UserContext } from './components/authentication/UserContext'
import { getToken } from './firebaseConfig'

export const WebApp = () => {

    const [user, setUser] = useState({})

    const [isTokenFound, setTokenFound] = useState(false);
    console.log("Token found", isTokenFound);
    // To load once
    useEffect(() => {
        let data;
        async function tokenFunc() {
            data = await getToken(setTokenFound);
            if (data) {
                console.log("Token is", data);
            }
            return data;
        }
        tokenFunc();
    }, [setTokenFound]);

    return (

        <UserContext.Provider value={{ user, setUser }}  >
            <AppRouter />
        </UserContext.Provider >

    )
}

WebApp.propTypes = {};
