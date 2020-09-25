import React, {useState, useEffect, useCallback} from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";

import Content from "./Content/Content";

import "./DashBoard.scss";
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";


const DashBoard = ({ location }) => {

    const ENDPOINT = useSelector(state => state.endpoint);
    const [token, setToken] = useState((location.state && location.state.token) || "");
    const records = useSelector(state => state.records);
    const isTokenRefreshRequired = useSelector(state => state.tokenRefreshRequired);
    const email = useSelector(state => state.email);
    const editProfileData = useSelector(state => state.editProfileData);
    const logout = useSelector(state => state.logout);
    const dispatch = useDispatch();
    const history = useHistory();



    const getSearchVariables = useCallback ( (variable) => {
        return new URLSearchParams(window.location.search).get(variable)
    },[]);


    const CONFIG_FETCH_RECORDS = {
        method: 'post',
        url: `${ENDPOINT}/dashboard`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        data: {
            "section": getSearchVariables("s"),
            "page": getSearchVariables("p")|| 0
        }
    };

    const CONFIG_EDIT_USER_PROFILE = {
        method: "post",
        url: `${ENDPOINT}/dashboard/edit-user-profile`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        data: {
            fieldsToEdit: editProfileData.fieldsToEdit,
            email: email
        }
    };


    const CONFIG_REFRESH_TOKEN = {
        method: "get",
        url: `${ENDPOINT}/token`,
        withCredentials: true
    };



    const updateEmail = useCallback ( () => {

        // recover user name if lost on refresh
        if (!email) {

            const cookieEmail = document.cookie
                .replace(/(?:(?:^|.*;\s*)telecom-dashboard-user-email\s*=\s*([^;]*).*$)|^.*$/,
                    "$1");

            cookieEmail && dispatch({
                type: "auth/setEmail",
                payload: cookieEmail
            });

        }

    },[email, dispatch]);




    const sendProfileChanges = useCallback (async () => {

        if (editProfileData.edit)
            try {

                const response = await axios(CONFIG_EDIT_USER_PROFILE);

                if (response.data === "profile edit success") {

                    dispatch({
                        type: "auth/editProfile",
                        payload: {edit: false, fieldsToEdit: []}
                    });

                    const fetchRecordsResponse = await axios(CONFIG_FETCH_RECORDS);

                    if (fetchRecordsResponse.data) {
                        dispatch({
                            "type": "records/fetch",
                            "payload": fetchRecordsResponse.data
                        });
                    }

                }



            } catch (err) {
                console.error(err.message);
            }

    },[CONFIG_EDIT_USER_PROFILE, editProfileData, dispatch]);


    const refreshAccessToken = useCallback (async () => {

        try {
            const newAccessToken = await axios(CONFIG_REFRESH_TOKEN);

            await setToken(newAccessToken.data.accessToken);
            await dispatch({
                type: 'auth/tokenRefreshRequired',
                payload: false
            });
        } catch (err) {
            console.error(err.message);
        }

    },[CONFIG_REFRESH_TOKEN, dispatch]);



    const fetchRecords = useCallback (async () => {


        try {

            if (records.section === getSearchVariables("s")) {

                if (records.tab && records.tab !== getSearchVariables("p")) {
                    const fetchRecordsResponse = await axios(CONFIG_FETCH_RECORDS);

                    if (fetchRecordsResponse.data) {
                        dispatch({
                            "type": "records/fetch",
                            "payload": fetchRecordsResponse.data
                        });
                    }
                }


            } else {
                const fetchRecordsResponse = await axios(CONFIG_FETCH_RECORDS);

                if (fetchRecordsResponse.data) {
                    dispatch({
                        "type": "records/fetch",
                        "payload": fetchRecordsResponse.data
                    });
                }
            }


        } catch (err) {
            console.error(err.message);
            refreshAccessToken();
        }

    },[CONFIG_FETCH_RECORDS, refreshAccessToken, dispatch, getSearchVariables, records]);


    useEffect(() => {
        sendProfileChanges();
    },[sendProfileChanges]);

    useEffect(() => {
        fetchRecords();
    },[location, fetchRecords]);


    useEffect(() => {
        updateEmail();
    },[updateEmail]);


    useEffect(() => {
        if (isTokenRefreshRequired) {
            refreshAccessToken();
        }
    },[isTokenRefreshRequired, refreshAccessToken]);



    const logOut = useCallback(async () => {

        const deleteCookie = (email) => {
            document.cookie = email + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        };

        const CONFIG_LOGOUT = {
            method: "delete",
            url: `${ENDPOINT}/logout`,
            headers: {
                "Authorization": `Bearer ${token}`
            },
            withCredentials: true,
        };

        try {
            await axios(CONFIG_LOGOUT);
            deleteCookie("telecom-dashboard-user-email");
            dispatch({
                type: "auth/logout",
                payload: false
            });
            setToken("");
            history.push({
                pathname: "/"
            });
        } catch (err) {
            console.error(err.message);
        }

    }, [token, ENDPOINT, dispatch, history]);



    useEffect(() => {
        if (logout) {
            logOut();
        }
    },[logout, logOut]);


    //
    // if (!token) {
    //     refreshAccessToken().then(history.push('/dashboard')).catch(history.push('/'));
    //
    // }


    return (

            <div className="root-container">
                <Header />
                <Navbar />
                {records.content &&
                    <Content records={records} getSearchVariables={getSearchVariables} />}
                <Footer />
            </div>

    )

};

export default DashBoard;
