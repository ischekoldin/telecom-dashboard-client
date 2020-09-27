import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import axios from "axios";

import "./LoginForm.scss";

const LoginForm = ({ENDPOINT, dispatch, history, toggleRegisterForm}) => {


    const handleSubmit = async (values, {setErrors}) => {

        const { email, password, rememberMe } = values;

        const CONFIG_LOGIN = {
            method: "post",
            url: `${ENDPOINT}/login`,
            headers: { "Content-Type": "application/json" },
            data: { email: email, password: password, rememberMe: rememberMe },
            withCredentials: true
        };

        try {
            const response = await axios(CONFIG_LOGIN);

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
        } catch (err) {
            if (err.message === "Request failed with status code 403") {
                setErrors({password: "Пароль неверный"});
            }

        }


    };



    return (
        <Formik
            initialValues={{ email: "", password: "", rememberMe: false }}
            onSubmit={handleSubmit}
        >

            {({ handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    <div className="form-head">Вход</div>
                    <div className="form-body">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field type="email" name="email"/>
                            <ErrorMessage name="email" className="warning" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Пароль</label>
                            <Field type="password" name="password"/>
                            <ErrorMessage name="password" className="warning" component="div" />
                        </div>
                        <div className="flex-row">
                            <label htmlFor="rememberMe">Оставаться в сети</label>
                            <Field type="checkbox" name="rememberMe"/>
                        </div>
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