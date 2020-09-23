import React from "react";

const Lines = ({records, location}) => {

    const getSearchVariables = ((variable) => new URLSearchParams(window.location.search).get(variable));


    const mapPageLinks = (number) => {
        const arr = ["<td>"];
        for (let i = 0; i < number; i++) {
            arr.push(<div id={{i} + 1} >{{i} + 1}</div>);
        }
        arr.push("</td>");
        return arr
    };

    console.log(records.content);
    return (
        <table>
            <thead>
            <tr>
                <th>Тип линии</th>
                <th>CLI</th>
                <th>Город</th>
                <th>Тариф</th>
                <th>Запись взонков</th>
            </tr>
            </thead>
            <tbody>
            {records.content.map(record =>
                <tr key={record.id}>
                    <td>{record.line_type}</td>
                    <td>{record.line_cli}</td>
                    <td>{record.line_city}</td>
                    <td>{record.tariff_name}</td>
                    <td>{record.line_recording === 1 ? "Да" : "нет"}</td>
                </tr>)}

                <tr>
                    <td>Текущая страница: {getSearchVariables("p")}</td>
                    {records.tabsCount > 1 && mapPageLinks(records.tabsCount)}
                </tr>
            </tbody>

            <tfoot></tfoot>
        </table>
    )
};

export default Lines;