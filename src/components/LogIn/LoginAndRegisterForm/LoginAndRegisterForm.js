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
        repeatPasswordValue,
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
                    <label htmlFor="name">Имя:</label>
                    <input className="form-control" value={nameValue} onChange={handleChange} id="name" type="text" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">email:</label>
                    <input className="form-control" value={emailValue} onChange={handleChange} id="email" type="email" required/>
                </div>

                <div className="form-group">
                    <label htmlFor="password">пароль:</label>
                    <input className="form-control" value={passwordValue} onChange={handleChange} id="password" type="password" required />
                </div>

                <div className="form-group">
                    <label htmlFor="password">повторите пароль:</label>
                    <input className="form-control" value={repeatPasswordValue} onChange={handleChange} id="repeat-password" type="password" required />
                </div>

                <div className="form-group-row">
                    <button className="btn btn-primary" type="submit" id="signUpBtn">Зарегистрироваться</button>
                    <button className="btn btn-primary" onClick={() => setIsRegisterForm(!isRegisterForm)} type="button" id="signInBtn">back</button>
                </div>
            </fieldset>
        </form>;


    } else {


        form = <form className="form" onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Авторизация</legend>
                    <div className="form-group">
                        <label htmlFor="email">email:</label>
                        <input className="form-control" value={emailValue}
                               onChange={handleChange} id="email" type="email" required />
                    </div>

                <div className="form-group">
                    <label htmlFor="password">пароль:</label>
                    <input className="form-control" value={passwordValue}
                           onChange={handleChange} id="password" type="password" required />
                </div>

                <div className="form-group-row">
                    <label htmlFor="rememberMe">оставаться в сети</label>
                    <input value={rememberMeValue}
                           onChange={handleChange} id="remember-me" type="checkbox" />
                </div>

                <div className="form-group-row">
                        <button className="form-button" onClick={() => setIsRegisterForm(!isRegisterForm)}
                                type="button" id="registerBtn">Зарегистрироваться</button>
                        <button className="form-button" type="submit" id="signInBtn">Войти</button>
                </div>

            </fieldset>
        </form>;
    }

    return form

};

export default LoginAndRegisterForm