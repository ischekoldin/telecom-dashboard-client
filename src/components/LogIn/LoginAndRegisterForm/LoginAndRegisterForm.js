import React from "react";

import "./LoginAndRegisterForm.scss";

const LoginAndRegisterForm = (
    {
        isRegisterForm,
        setIsRegisterForm,
        handleSubmit,
        handleChange,
        nameValue,
        passwordValue,
        emailValue,
        rememberMeValue,
    }
    ) => {




    let form;

    if (isRegisterForm) {
        form = <form className="form" onSubmit={handleSubmit}>
            <fieldset>
                <legend>Регистрация</legend>
                <div className="form-group">
                    <label htmlFor="name">name</label>
                    <input className="form-control" value={nameValue} onChange={handleChange} id="name" type="text" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">email</label>
                    <input className="form-control" value={emailValue} onChange={handleChange} id="email" type="email" required/>
                </div>

                <div className="form-group">
                    <label htmlFor="password">password</label>
                    <input className="form-control" value={passwordValue} onChange={handleChange} id="password" type="password" required />
                </div>

                <div className="form-group-row">
                    <button className="btn btn-primary" type="submit" id="signUpBtn">Register</button>
                    <button className="btn btn-primary" onClick={() => setIsRegisterForm(!isRegisterForm)} type="button" id="signInBtn">back</button>
                </div>
            </fieldset>
        </form>;
    } else {
        form = <form className="form" onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Авторизация</legend>
                    <div className="form-group">
                        <label htmlFor="name">name</label>
                        <input className="form-control" value={nameValue}
                               onChange={handleChange} id="name" type="text" required />
                    </div>

                <div className="form-group">
                    <label htmlFor="password">password</label>
                    <input className="form-control" value={passwordValue}
                           onChange={handleChange} id="password" type="password" required />
                </div>

                <div className="form-group-row">
                    <label htmlFor="rememberMe">remember me</label>
                    <input value={rememberMeValue}
                           onChange={handleChange} id="remember-me" type="checkbox" />
                </div>

                <div className="form-group-row">
                        <button className="form-button" onClick={() => setIsRegisterForm(!isRegisterForm)}
                                type="button" id="registerBtn">Register</button>
                        <button className="form-button" type="submit" id="signInBtn">Log in</button>
                </div>

            </fieldset>
        </form>;
    }

    return form

};

export default LoginAndRegisterForm