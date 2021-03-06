import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";


import LogIn from "./components/LogIn/LogIn";
import DashBoard from "./components/DashBoard/DashBoard";
import {useDispatch} from "react-redux";

const App = () => {

    const dispatch = useDispatch();

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        dispatch({
            type: 'backend/endpoint',
            payload: "http://localhost:5000"
        });
    } else {
        dispatch({
            type: 'backend/endpoint',
            // adjust this to match the backend endpoint you use
            payload: "https://telecom-dashboard-server.herokuapp.com"
        });
    }

    return (

        <Router>
            <Route path="/" exact component={LogIn}/>
            <Route path="/:dashboard" component={DashBoard}/>
        </Router>
    )


};

export default App;