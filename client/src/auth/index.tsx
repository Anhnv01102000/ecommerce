import React, { Children, useEffect, useState } from "react";
import { useNavigate, useOutlet } from "react-router-dom";
import { refreshToken } from "../apis/apiUser";


const Auth = ({ children }) => {
    const navigate = useNavigate();
    const [status, setStatus] = useState(false)

    const checkAuth = async (getRefreshToken: String) => {
        try {
            // console.log(refreshToken);
            const dataForm = {
                refreshToken: getRefreshToken
            }
            const response = await refreshToken(dataForm)
            // console.log(response);
            localStorage.setItem("access-token", response.data.newAccessToken);
            setStatus(true)
        } catch (error) {
            console.log('error', error);
            setStatus(false)
            navigate('/login');
        }
    }

    useEffect(function () {
        const getRefreshToken = localStorage.getItem("refresh-token");
        if (getRefreshToken === null) {
            navigate('/login');
        } else {
            checkAuth(getRefreshToken);
        }
    }, []);

    const outlet = useOutlet();

    return (
        <>
            {status ? <>{children}</> : <></>}
        </>
    )

}

export default Auth;