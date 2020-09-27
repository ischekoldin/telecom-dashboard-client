import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import axios from "axios";

import "./RegisterForm.scss";

const RegisterForm = (
    {
        ENDPOINT,
        toggleRegisterForm,
    }) => {


    const handleSubmit = async (values, {setErrors}) => {

        const { name, email, password } = values;

        const CONFIG_SIGNUP = {
            method: "post",
            url: `${ENDPOINT}/signup`,
            data: { name: name, email: email, password: password }
        };

        const response = await axios(CONFIG_SIGNUP);

        if(response.data.error) setErrors({email: "Польщователь с таким email уже существует"});

        toggleRegisterForm();

    };


    return (
        <Formik initialValues={{ name: "", email: "", password: "", repeatPassword: "" }} onSubmit={handleSubmit}>

            {({ handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    <div className="form-head">Регистрация</div>
                    <div className="form-body">
                        <div className="form-group">
                            <label htmlFor="name">Имя*</label>
                            <Field type="text" name="name"/>
                            <ErrorMessage name="name" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email*</label>
                            <Field type="email" name="email"/>
                            <ErrorMessage name="email" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Пароль*</label>
                            <Field type="password" name="password"/>
                            <ErrorMessage name="password" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="repeatPassword">Повторить пароль*</label>
                            <Field type="password" name="repeatPassword"/>
                            <ErrorMessage name="repeatPassword" component="div" />
                        </div>
                        <div className="button-group">
                            <button disabled={isSubmitting} type="submit">Зарегистрироваться</button>
                            <button type="button" onClick={toggleRegisterForm}>Назад</button>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    )

};

export default RegisterForm;