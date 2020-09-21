import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";


import LoginAndRegisterForm from "./LoginAndRegisterForm/LoginAndRegisterForm";
import ModalDialogue from "./ModalDialogue/ModalDialogue";

import "./LogIn.scss";

const LogIn = () => {


    const ENDPOINT = useSelector(state => state.endpoint);
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
        method: 'get',
        url: `${ENDPOINT}/token`,
        withCredentials: true
    };

    const CONFIG_LOGIN = {
        method: 'post',
        url: `${ENDPOINT}/login`,
        headers: { 'Content-Type': 'application/json' },
        data: { name: nameValue, password: passwordValue, rememberMe: rememberMeValue },
        withCredentials: true
    };


    const CONFIG_SIGNUP = {
        method: 'post',
        url: `${ENDPOINT}/signup`,
        data: { email: emailValue, password: passwordValue }
    };



    const handleChange = (event) => {
        let inputId = event.target.id;
        let value = event.target.value;

        switch (inputId) {
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
                setPasswordValue(value);
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

                if (rememberMeValue) {
                    let date = new Date();
                    date.setTime(date.setTime(date.getTime()+(14*24*60*60*1000)));
                    document.cookie = `telecom-dashboard-remember-me; expires=${date}`;
                }

                history.push({
                    pathname: '/dashboard',
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
                    history.push({
                        pathname: '/dashboard',
                        state:
                            {
                                token: newAccessToken.data.accessToken,
                                username: newAccessToken.data.name
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

                {feedback.length > 0 ? <ModalDialogue messages={feedback} /> : null }

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
                        />
                </div>

        </div>

    )

};

export default LogIn;