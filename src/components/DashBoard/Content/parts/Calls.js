import React from "react";
import PageNavigator from "./PageNavigator";

const Calls = ({records, getSearchVariables}) => {


    return (
        <div className="table-container">
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
                    <tr key={record.id + record.call_cost}>
                        <td>{record.line_type}</td>
                        <td>{record.calls_incoming
                            ? `Входящий ${record.incoming_cost}`
                            : `Исходящий ${record.outgoing_cost}`} р./мин.</td>
                        <td>{record.start_time}</td>
                        <td>{record.duration_secs}</td>
                        <td>{record.call_cost}</td>
                    </tr>)}
                </tbody>
            </table>

            {records.tabsCount > 1 &&
                <PageNavigator
                    pages={records.tabsCount}
                    getSearchVariables={getSearchVariables}
                />}
        </div>
    )
};

export default Calls;