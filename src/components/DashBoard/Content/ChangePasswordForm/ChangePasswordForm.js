import React, { useState } from "react";
import {useSelector} from "react-redux";
import axios from "axios";


import "./ChangePasswordForm.css";


const ChangePasswordForm = () => {

    const [isShown, setIsShown] = useState(false);
    const [feedback, setFeedback] = useState([]);
    const [oldPassword, setOldPassword] = useState(' ');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const email = useSelector(state => state.email);

    const ENDPOINT = useSelector(state => state.endpoint);

    const CONFIG_CHANGE_PASSWORD = {
        method: "post",
        url: `${ENDPOINT}/auth/change_password`,
        headers: { 'Content-Type': 'application/json' },
        data: { email: email, oldPassword: oldPassword, newPassword: newPassword }
    };


    const handleToggleForm = () => {
        setIsShown(!isShown);
    };

    const handleChange = (event) => {
        const inputChanged = event.currentTarget.name;
        const inputValue = event.currentTarget.value.trim();
        switch (inputChanged) {
            case "oldPassword": {
                setOldPassword(inputValue);
                break
            }
            case "newPassword": {
                setNewPassword(inputValue);
                break
            }
            case "repeatNewPassword": {
                setRepeatNewPassword(inputValue);
                break
            }
            default:
        }
    };


    // TODO: barebone, implement feedback
    const handleClick = async (event) => {
        const target = event.currentTarget.id;
        if (target === "changePasswordButton") {

            try {
               const changePasswordResponse = await axios(CONFIG_CHANGE_PASSWORD);
               if (changePasswordResponse.data === "OK") {
                    handleToggleForm();
               }
            } catch (err) {
                setFeedback([...feedback, err.message]);
            }


        } else if (target === "closePasswordFormButton") {
            handleToggleForm();
        }
    };


    return (
        isShown
        ?   <div className="modal-container">
                {feedback.length > 0 && feedback.map(elem => <p>{elem}</p>)}
                <form className="modal">
                    <span className="modal-head">Изменить пароль</span>

                    <div className="modal-body">
                        <div className="form-group">
                            <label>Старый пароль:</label>
                            <input onChange={handleChange} type="password" name="oldPassword" className="form-control" required />
                        </div>

                        <div className="form-group">
                            <label>Новый пароль:</label>
                            <input onChange={handleChange} type="password" name="newPassword" className="form-control" required />
                        </div>

                        <div className="form-group">
                            <label>Новый пароль еще раз:</label>
                            {
                                newPassword !== repeatNewPassword
                                    ? <div className="alert alert-warning" role="alert">Пароли не совпадают</div>
                                    : null
                            }
                            <input onChange={handleChange} type="password" name="repeatNewPassword" className="form-control" required />
                        </div>

                        <div className="flex-row">
                            <button id="changePasswordButton"
                                    className="form-button"
                                    onClick={handleClick}
                                    type="button">Изменить пароль</button>

                            <button id="closePasswordFormButton"
                                    className="form-button"
                                    onClick={handleClick}
                                    type="button">Назад</button>
                        </div>

                    </div>


                </form>
            </div>


        :   <button type="button" onClick={handleToggleForm}>Изменить пароль</button>


    )

};

export default ChangePasswordForm;