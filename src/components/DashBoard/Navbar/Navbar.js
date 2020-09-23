import React from "react";
import { useHistory } from "react-router-dom";



import "./Navbar.scss";

const Navbar = () => {

    const history = useHistory();

    const handleClick = (event) => {
        event.preventDefault();
        const target = event.target.id;

        if (target === "lines") {
            history.push ("/dashboard?s=lines&p=1");
        }

        if (target === "calls") {
            history.push ("/dashboard?s=calls&p=1");
        }

        if (target === "profile") {
            history.push ("/dashboard?s=profile");
        }
        if (target === "bills") {
            history.push ("/dashboard?s=bills&p=1");
        }

    };



    return (

        <nav className="navbar">
            <button onClick={handleClick} type="button" id="profile">Профиль</button>
            <button onClick={handleClick} type="button" id="lines">Линии</button>
            <button onClick={handleClick} type="button" id="calls">Звонки</button>
            <button onClick={handleClick} type="button" id="bills">Счета</button>
        </nav>

    )

};

export default Navbar;