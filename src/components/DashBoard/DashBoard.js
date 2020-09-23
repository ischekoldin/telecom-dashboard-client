import React, {useState, useEffect, useCallback} from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import queryString from "querystring";

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
    const username = useSelector(state => state.username);
    const logout = useSelector(state => state.logout);
    const dispatch = useDispatch();
    const history = useHistory();


    const getSearchVariables = ((variable) => new URLSearchParams(location.search).get(variable));



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


    const CONFIG_REFRESH_TOKEN = {
        method: "get",
        url: `${ENDPOINT}/token`,
        withCredentials: true
    };



    const updateUserName = useCallback ( () => {

        // recover user name if lost on refresh
        if (!username) {

            const cookieUserName = document.cookie
                .replace(/(?:(?:^|.*;\s*)telecom-dashboard-remember-me\s*=\s*([^;]*).*$)|^.*$/,
                    "$1");

            cookieUserName && dispatch({
                type: "user/set",
                payload: cookieUserName
            });

        }

    },[username, dispatch]);


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

            if (records.section !== getSearchVariables("s")) {
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

    },[CONFIG_FETCH_RECORDS, refreshAccessToken, dispatch, getSearchVariables, records.section]);


    useEffect(() => {
        fetchRecords();
    },[location, fetchRecords]);


    useEffect(() => {
        updateUserName();
    },[updateUserName]);


    useEffect(() => {
        if (isTokenRefreshRequired) {
            refreshAccessToken();
        }
    },[isTokenRefreshRequired, refreshAccessToken]);



    const logOut = useCallback(async () => {

        const deleteCookie = (name) => {
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
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
            deleteCookie("telecom-dashboard-remember-me");
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
                    <Content records={records} />}
                <Footer />
            </div>

    )

};

export default DashBoard;
