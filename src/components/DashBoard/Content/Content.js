import React, {useState} from "react";

import Calls from "./parts/Calls";
import Lines from "./parts/Lines";
import Profile from "./parts/Profile";

import "./Content.scss";

const Content = ({records}) => {

    const [section, setSection] = useState("profile");

    return (
            <>
                {section === "profile" && <Profile records={records} />}
                {section === "calls" && <Calls records={records} />}
                {section === "lines" && <Lines records={records} />}
            </>
    )

};

export default Content;