import React from "react";

import profilePic from "./profile_pic.jpeg";

const Profile = ({records}) => {

    const {
        company_name,
        name,
        account_balance,
        city_name,
        registration_date} = records.content;

    const toggleFieldEditing = (event) => {

    };


    return (
        <>
            <div>
                <img src={profilePic} alt="profile"/>
            </div>
            <div>
                <ul>
                    <li><h2>{company_name}</h2></li>
                    <li>Имя: <div onClick={toggleFieldEditing} id="profile-name">{name}</div></li>
                    <li>Ваш баланс: {account_balance}</li>
                    <li>Город: <div id="profile-city-name">{city_name}</div></li>
                    <li>Дата регистрации: {registration_date}</li>
                </ul>
            </div>
        </>
    )
};

export default Profile;