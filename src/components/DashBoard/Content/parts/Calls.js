import React from "react";

const Calls = ({records}) => {

    const getSearchVariables = ((variable) => new URLSearchParams(window.location.search).get(variable));

    const mapPageLinks = (number) => {
        const arr = ["<td>"];
        for (let i = 0; i < number; i++) {
            arr.push(<div id={i + 1} > i + 1 </div>);
        }
        arr.push("</td>");
        return arr
    };

    return (
        <table>
            <thead>
            <tr>
                <th>Линия</th>
                <th>Направление</th>
                <th>Дата</th>
                <th>Продолжительность</th>
                <th>Стоимость</th>
            </tr>
            </thead>
            <tbody>
            {records.content.map(record =>
                <tr key={record.id}>
                    <td>{record.line_type}</td>
                    <td>{record.calls_incoming
                        ? `Входящий ${record.incoming_cost}`
                        : `Исходящий ${record.outgoing_cost}`} р./мин.</td>
                    <td>{record.start_time}</td>
                    <td>{record.duration_secs}</td>
                    <td>{record.call_cost}</td>
                </tr>)}
                <tr>
                    <td>Текущая страница: {getSearchVariables("p")}</td>
                    {records.tabsCount > 1 && mapPageLinks(records.tabsCount)}
                </tr>
            </tbody>

        </table>
    )
};

export default Calls;