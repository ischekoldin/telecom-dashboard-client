import React from "react";

import "./ModalDialog.scss";

const ModalDialog = ({message, status}) => {

    return (
            <div className="modal-container">
                <form className="modal">

                    <div className="modal-head">Пользователь {status}</div>
                    <div className="modal-body">{message}</div>
                </form>
            </div>

            )

};

export default ModalDialog;