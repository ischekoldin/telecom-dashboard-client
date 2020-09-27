import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import axios from "axios";

import "./LoginForm.scss";

const LoginForm = ({ENDPOINT, dispatch, history, toggleRegisterForm}) => {


    const handleSubmit = async (data) => {

        const { email, password, rememberMe } = data;

        const CONFIG_LOGIN = {
            method: "post",
            url: `${ENDPOINT}/login`,
            headers: { "Content-Type": "application/json" },
            data: { email: email, password: password, rememberMe: rememberMe },
            withCredentials: true
        };


        const response = await axios(CONFIG_LOGIN);

        if (response.data === "password is incorrect") {
            new Error("password is incorrect");
        }

        const date = new Date();
        date.setTime(date.getTime()+(14*24*60*60*1000));
        document.cookie = `telecom-dashboard-user-email=${email}; expires=${date}; sameSite=lax`;

        if (rememberMe) {
            document.cookie = `telecom-dashboard-remember-me=true; expires=${date}`;
        }


        dispatch({
            "type": "auth/setEmail",
            "payload": email
        });

        history.push({
            pathname: "/dashboard",
            search: "s=profile",
            state: {
                token: response.data.accessToken,
            }
        });

    };



    return (
        <Formik
            initialValues={{ email: "", password: "", rememberMe: false }}
            onSubmit={data => handleSubmit(data)}
        >

            {({ handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    <div className="form-head">Вход</div>
                    <div className="form-body">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field type="email" name="email"/>
                            <ErrorMessage name="email" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Пароль</label>
                            <Field type="password" name="password"/>
                            <ErrorMessage name="password" component="div" />
                        </div>
                        <div className="flex-row">
                            <label htmlFor="rememberMe">Оставаться в сети</label>
                            <Field type="checkbox" name="rememberMe"/>
                        </div>
                        <ErrorMessage name="rememberM" component="div" />
                        <div className="button-group">
                            <button disabled={isSubmitting} type="submit">Войти</button>
                            <button type="button" onClick={toggleRegisterForm}>Зарегистрироваться</button>
                        </div>

                    </div>
                </form>
            )}
        </Formik>
    )

};

export default LoginForm;