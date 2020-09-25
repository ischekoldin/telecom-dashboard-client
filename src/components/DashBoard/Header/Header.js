import React from "react";
import {useDispatch, useSelector} from "react-redux";

import "./Header.scss";


const Header = () => {

    const email = useSelector (state => state.email);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch({
            type: "auth/logout",
            payload: true
        });
    };

    return (

        <header>
            <p><strong>AT&P</strong></p>
            <p>{email}</p>
            <button onClick={handleLogout}>Выйти</button>
        </header>

    )

};

export default Header;