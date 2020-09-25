import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";


import LoginAndRegisterForm from "./LoginAndRegisterForm/LoginAndRegisterForm";

import "./LogIn.scss";

const LogIn = () => {


    const ENDPOINT = useSelector(state => state.endpoint);
    const dispatch = useDispatch();
    const [isRegisterForm, setIsRegisterForm] =useState(false);
    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [repeatPasswordValue, setRepeatPasswordValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [rememberMeValue, setRememberMeValue] = useState('');
    const [feedback, setFeedback] = useState([]);
    const history = useHistory();
    let errors = [];


    const CONFIG_REFRESH_TOKEN = {
        method: "get",
        url: `${ENDPOINT}/token`,
        withCredentials: true
    };

    const CONFIG_LOGIN = {
        method: "post",
        url: `${ENDPOINT}/login`,
        headers: { "Content-Type": "application/json" },
        data: { email: emailValue, password: passwordValue, rememberMe: rememberMeValue },
        withCredentials: true
    };

    const CONFIG_SIGNUP = {
        method: "post",
        url: `${ENDPOINT}/signup`,
        data: { name: nameValue, email: emailValue, password: passwordValue }
    };




    const handleChange = (event) => {
        let target = event.target.id;
        let value = event.target.value;

        switch (target) {
            case "name":  {
                setNameValue(value);
                break
            }
            case "email":  {
                setEmailValue(value);
                break
            }
            case "password":  {
                setPasswordValue(value);
                break
            }
            case "repeat-password":  {
                setRepeatPasswordValue(value);
                break
            }
            case "remember-me":  {
                setRememberMeValue(!rememberMeValue);
                break
            }
            default:
        }

    };


    const refreshToken = useCallback (async () => {

        try {

            return await axios(CONFIG_REFRESH_TOKEN);

        } catch (err) {

            errors.push({place:"refreshToken function", message: err.message});
        }

    },[CONFIG_REFRESH_TOKEN, errors]);


    // register or log in, depends on the form mode
    const handleSubmit = async (event) => {
        event.preventDefault();

        let response;

        if (isRegisterForm) {

            response = await axios(CONFIG_SIGNUP);

            if (typeof response === "string") {

                setFeedback(...feedback, response);

            }

            setIsRegisterForm(!isRegisterForm);

        } else {

            try {

                response = await axios(CONFIG_LOGIN);

                const date = new Date();
                date.setTime(date.getTime()+(14*24*60*60*1000));
                document.cookie = `telecom-dashboard-user-email=${emailValue}; expires=${date}; sameSite=lax`;

                if (rememberMeValue) {
                    document.cookie = `telecom-dashboard-remember-me=true; expires=${date}`;
                }


                dispatch({
                    "type": "auth/setEmail",
                    "payload": emailValue
                });

                history.push({
                    pathname: "/dashboard",
                    search: "s=profile",
                    state: {
                        token: response.data.accessToken,
                    }
                });

            } catch (err) {

                errors.push({place:"handleSubmit function", message: err.message});

            }
        }
    };



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
                        <LoginAndRegisterForm
                            isRegisterForm={isRegisterForm}
                            setIsRegisterForm={setIsRegisterForm}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            nameValue={nameValue}
                            emailValue={emailValue}
                            passwordValue={passwordValue}
                            repeatPasswordValue={repeatPasswordValue}
                            rememberMeValue={rememberMeValue}
                            ENDPOINT={ENDPOINT}
                        />
                </div>

        </div>

    )

};

export default LogIn;