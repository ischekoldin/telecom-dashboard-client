import React, {useState} from "react";

import {useDispatch} from "react-redux";

const EditProfileDialog = ({company_name, user_name, city_name, user_email}) => {


    const [companyNameValue, setCompanyNameValue] = useState(company_name);
    const [userNameValue, setUserNameValue] = useState(user_name);
    const [cityNameValue, setCityNameValue] = useState(city_name);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();


    const toggleShow = () => {
        setShow(!show);
    };


    const handleChange = (event) => {
        const target = event.target.id;
        const value = event.target.value;

        console.log(event.target);

        if (target) {
            switch (target) {
                case "company-name": {
                    setCompanyNameValue(value);
                    break
                }
                case "user-name": {
                    setUserNameValue(value);
                    break
                }
                case "city-name": {
                    setCityNameValue(value);
                    break
                }
                default:
            }
        }


    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const fieldsToEdit = [];

        if (company_name !== companyNameValue) fieldsToEdit.push({"field": "company_name", "value": companyNameValue});
        if (user_name !== userNameValue) fieldsToEdit.push({"field": "user_name", "value": userNameValue});
        if (city_name !== cityNameValue) fieldsToEdit.push({"field": "city_name", "value": cityNameValue});

        if (fieldsToEdit.length > 0) {
            dispatch({
                "type": "auth/editProfile",
                "payload": {"edit": true, "fieldsToEdit": fieldsToEdit}
            });
        }

        toggleShow();

    };

    return (
        <>
            {show

                ?   <div className="dialog-container">
                        <form>
                            <fieldset>
                                <legend>Изменение профиля</legend>
                                <label htmlFor="company-name">Название компании</label>
                                <input value={companyNameValue} onChange={handleChange} type="text" id="company-name" required />
                                <label htmlFor="user-name">Имя</label>
                                <input value={userNameValue} onChange={handleChange} type="text" id="user-name" required />
                                <label htmlFor="user-name">Город</label>
                                <input value={cityNameValue} onChange={handleChange} type="text" id="city-name" required />
                                <button type="button" onClick={handleSubmit}>Сохранить</button>
                                <button type="button" onClick={toggleShow}>Закрыть</button>
                            </fieldset>
                        </form>
                    </div>

                :   <button type="button" onClick={toggleShow}>Редактировать профиль</button>
            }
        </>

    )
};

export default EditProfileDialog;