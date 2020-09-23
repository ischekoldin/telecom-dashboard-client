import React from "react";

import profilePic from "./profile_pic.jpeg";

const Profile = ({records}) => {

    const {
        company_name,
        name,
        account_balance,
        city_name,
        registration_date} = records.content;

    return (
        <>
            <div>
                <img src={profilePic} alt="profile"/>
            </div>
            <div>
                <ul>
                    <li><h2>{company_name}</h2></li>
                    <li>Имя: {name}</li>
                    <li>Ваш баланс: {account_balance}</li>
                    <li>Город: {city_name}</li>
                    <li>Дата регистрации: {registration_date}</li>
                </ul>
            </div>
        </>
    )
};

export default Profile;