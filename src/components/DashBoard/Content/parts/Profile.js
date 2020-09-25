import React from "react";
import moment from "moment";

import profilePic from "./profile_pic.jpeg";
import EditProfileDialog from "./EditProfileDialog";
import ModalDialog from "../ModalDialog/ModalDialog";

const Profile = ({records}) => {

    let status;
    let message;


    if (records.content.user_status && records.content.user_status === "неактивен") {
        status = records.content.user_status;
        message = records.content.message;
    }


    const {
        company_name,
        user_name,
        account_balance,
        city_name,
        registration_date,
        user_email

    } = records.content;



    return (


        !message

            ?   <div className="profile-container">
                    <div>
                        <img src={profilePic} alt="profile"/>
                    </div>
                    <div>
                        <ul>
                            <li><strong>{company_name}</strong></li>
                            <li>Имя: {user_name}</li>
                            <li>Адрес электронной почты: {user_email}</li>
                            <li>Ваш баланс: {account_balance}</li>
                            <li>Город: {city_name}</li>
                            <li>Дата регистрации: {moment(registration_date).format("DD.MM.YYYY HH:MM")}</li>
                        </ul>
                        <EditProfileDialog
                            city_name={city_name}
                            company_name={company_name}
                            user_name={user_name}
                            user_email={user_email}
                        />
                    </div>
                </div>

            :   <ModalDialog message={message} status={status} />

    )
};

export default Profile;