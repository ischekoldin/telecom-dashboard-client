import React, {useState, useEffect, useCallback} from "react";
import { useHistory } from "react-router-dom";
import {useMediaQuery} from "react-responsive/src";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";

import Content from "./Content/Content";

import "./DashBoard.scss";


const DashBoard = ({ location }) => {

    const ENDPOINT = useSelector(state => state.endpoint);
    const [token, setToken] = useState((location.state && location.state.token) || '');
    const [records, setRecords] = useState([]);
    const isTokenRefreshRequired = useSelector(state => state.tokenRefreshRequired);
    const username = useSelector(state => state.user);
    const logout = useSelector(state => state.logout);
    const dispatch = useDispatch();
    const history = useHistory();
    const isScreenNarrow = useMediaQuery({query: '(max-width: 768px)'});



    const CONFIG_REFRESH_TOKEN = {
        method: 'get',
        url: `${ENDPOINT}/token`,
        withCredentials: true
    };

    const CONFIG_FETCH_RECORDS = {
        method: 'get',
        url: `${ENDPOINT}/dashboard`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };


    const updateUserName = useCallback ( () => {

        // recover user name if lost on refresh
        if (!username) {
            dispatch({
                type: 'user/set',
                payload: location.state.username
            });
        }

    },[username, dispatch, location.state.username]);


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
            const fetchRecordsResponse = await axios(CONFIG_FETCH_RECORDS);
            setRecords(fetchRecordsResponse.data);
        } catch (err) {
            console.error(err.message);
        }

    },[CONFIG_FETCH_RECORDS]);


    useEffect(() => {
        fetchRecords();
    },[location]);


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
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        };

        const CONFIG_LOGOUT = {
            method: 'delete',
            url: `${ENDPOINT}/logout`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true,
        };

        try {
            await axios(CONFIG_LOGOUT);
            deleteCookie('telecom-dashboard-remember-me');
            dispatch({
                type: 'auth/logout',
                payload: false
            });
            setToken('');
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
                {records.length > 0 && <Content records={records} />}
            </div>

    )

};

export default DashBoard;
