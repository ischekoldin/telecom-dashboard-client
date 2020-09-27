import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
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

        try {
            await axios(CONFIG_SIGNUP);
            toggleRegisterForm();
        } catch (err) {
            if (err.message === "Request failed with status code 403") {
                setErrors({email: "Пользователь с таким email уже существует"});
            }
        }

    };


    const signupSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, "Имя пользователя слишком короткое")
            .max(50, "Имя пользователя слишком длинное")
            .required("Необходимо ввести имя пользователя"),
        email: Yup.string().email("Неверный email").required('Введите email'),
        password: Yup.string()
            .min(8, "Пароль слишком короткий")
            .max(32, "Пароль слишком длинный")
            .required("Необходимо ввести пароль"),
        repeatPassword: Yup
            .string()
            .required("Введите пароль еще паз")
            .when("password", {
                is: password => (!!(password && password.length > 0)),
                then: Yup.string().oneOf([Yup.ref("password")], "Пароли должны совпадать")
            })
    });

    return (
        <Formik initialValues={{ name: "", email: "", password: "", repeatPassword: "" }}
                onSubmit={handleSubmit}
                validationSchema={signupSchema}
        >

            {({ handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    <div className="form-head">Регистрация</div>
                    <div className="form-body">
                        <div className="form-group">
                            <label htmlFor="name">Имя*</label>
                            <Field type="text" name="name"/>
                            <ErrorMessage name="name" className="warning" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email*</label>
                            <Field type="email" name="email"/>
                            <ErrorMessage name="email" className="warning" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Пароль*</label>
                            <Field type="password" name="password"/>
                            <ErrorMessage name="password" className="warning" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="repeatPassword">Повторить пароль*</label>
                            <Field type="password" name="repeatPassword"/>
                            <ErrorMessage name="repeatPassword" className="warning" component="div" />
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