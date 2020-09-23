import React, {useState} from "react";

import Calls from "./parts/Calls";
import Lines from "./parts/Lines";
import Profile from "./parts/Profile";

import "./Content.scss";

const Content = ({records}) => {

    return (
            <section>
                {records.section === "profile" && <Profile records={records} />}
                {records.section === "calls" && <Calls records={records} />}
                {records.section === "lines" && <Lines records={records} />}
            </section>
    )

};

export default Content;