import React from "react";

import { useHistory } from "react-router-dom";

const PageNavigator = ({pages, getSearchVariables}) => {

    const history = useHistory();

    const handleClick = (event) => {
        const target = event.target.id;

        if (target !== getSearchVariables("p")) {
            history.push({
                "search": `s=${getSearchVariables("s")}&p=${target}`
            })
        }

    };


    const arr = [];
    for (let i = 0; i < pages; i++) {
        arr.push(<button type="button" key={i} id={i+1} onClick={handleClick}> {i+1} </button>);
    }

    return (
        <nav className="page-navigator" >
           <div className="page-number">Текущая страница: {getSearchVariables("p")}</div>
           {arr}
        </nav>
    )
};

export default PageNavigator;