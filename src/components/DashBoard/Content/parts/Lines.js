import React from "react";
import PageNavigator from "./PageNavigator";

const Lines = ({records, getSearchVariables}) => {


    return (
        <>
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
                    <tr key={record.id + 1000}>
                        <td>{record.line_type}</td>
                        <td>{record.line_cli}</td>
                        <td>{record.line_city}</td>
                        <td>{record.tariff_name}</td>
                        <td>{record.line_recording === 1 ? "Да" : "нет"}</td>
                    </tr>)}
                </tbody>
            </table>

            {records.tabsCount > 1 &&
                <PageNavigator
                    pages={records.tabsCount}
                    getSearchVariables={getSearchVariables}
                />}

        </>
    )
};

export default Lines;