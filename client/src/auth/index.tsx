import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { refreshToken } from "../apis/apiUser";


const Auth = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();

    const checkAuth = async (getRefreshToken: String) => {
        try {
            // console.log(refreshToken);
            const dataForm = {
                refreshToken: getRefreshToken
            }
            const response = await refreshToken(dataForm)
            console.log(response);
            localStorage.setItem("access-token", response.data.newAccessToken);
        } catch (error) {
            console.log('error', error);
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

    return <>{children}</>;
}

export default Auth;