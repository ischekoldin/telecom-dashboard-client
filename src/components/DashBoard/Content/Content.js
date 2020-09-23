import React from "react";

import Calls from "./parts/Calls";
import Lines from "./parts/Lines";
import Profile from "./parts/Profile";
import Bills from "./parts/Bills";

import "./Content.scss";

const Content = ({records, getSearchVariables}) => {


    return (
            <section>
                {records.section === "profile" &&
                    <Profile
                        records={records}
                        getSearchVariables={getSearchVariables}
                    />}
                {records.section === "calls" &&
                    <Calls
                        records={records}
                        getSearchVariables={getSearchVariables}
                    />}
                {records.section === "lines" &&
                    <Lines
                        records={records}
                        getSearchVariables={getSearchVariables}
                    />}
                {records.section === "bills" &&
                    <Bills
                        records={records}
                        getSearchVariables={getSearchVariables}
                    />}
            </section>
    )

};

export default Content;