import React from "react";
import {useDispatch} from "react-redux";


import "./ModalDialog.scss";


const ModalDialog = ({message, status}) => {

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch({
            type: "auth/logout",
            payload: true
        });
    };

    return (
            <div className="modal-container">
                <form className="modal">

                    <div className="modal-head">Пользователь {status}</div>
                    <div className="modal-body">
                        {message}
                        <button className="form-button" onClick={handleLogout}>Выйти</button>
                    </div>
                </form>
            </div>
            )

};

export default ModalDialog;