import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";



import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";

import "./LogIn.scss";

const LogIn = () => {

    const ENDPOINT = useSelector(state => state.endpoint);
    const dispatch = useDispatch();
    const [isRegisterForm, setIsRegisterForm] = useState(false);
    const history = useHistory();
    let errors = [];


    const toggleRegisterForm = () => {
        setIsRegisterForm(!isRegisterForm);
    };

    const CONFIG_REFRESH_TOKEN = {
        method: "get",
        url: `${ENDPOINT}/token`,
        withCredentials: true
    };


    const refreshToken = useCallback (async () => {

        try {

            return await axios(CONFIG_REFRESH_TOKEN);

        } catch (err) {

            errors.push({place:"refreshToken function", message: err.message});
        }

    },[CONFIG_REFRESH_TOKEN, errors]);



    const rememberMe = document.cookie
        .replace(/(?:(?:^|.*;\s*)telecom-dashboard-remember-me\s*=\s*([^;]*).*$)|^.*$/, "$1");
    if (rememberMe) {
        refreshToken().then(
            (newAccessToken) => {
                if (newAccessToken) {

                    const date = new Date();
                    date.setTime(date.getTime()+(14*24*60*60*1000));
                    document.cookie = `telecom-dashboard-user-email=${newAccessToken.data.email}; expires=${date}; sameSite=lax`;

                    history.push({
                        pathname: "/dashboard",
                        search: "s=profile",
                        state:
                            {
                                token: newAccessToken.data.accessToken,
                            }
                    });
                }
            }
        ).catch();
    }

    // spew some errors in dev environment
    if (ENDPOINT === "http://localhost:5000" && errors.length > 0) {
        console.info(errors);
    }

    return (
        <div className="login-container">


                <div className="login-form-container">
                    {isRegisterForm
                    ?   <RegisterForm
                            ENDPOINT={ENDPOINT}
                            dispatch={dispatch}
                            history={history}
                            toggleRegisterForm={toggleRegisterForm}
                        />
                    :   <LoginForm
                            ENDPOINT={ENDPOINT}
                            dispatch={dispatch}
                            history={history}
                            toggleRegisterForm={toggleRegisterForm}
                        />}
                </div>

        </div>

    )

};

export default LogIn;