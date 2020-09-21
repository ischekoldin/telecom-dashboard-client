import React from "react";

const Lines = ({records}) => {

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
            {records.map(record =>
                <tr key={record.id}>
                    <td>{record.line_type}</td>
                    <td>{record.line_cli}</td>
                    <td>{record.line_city}</td>
                    <td>{record.tariff_name}</td>
                    <td>{record.line_recording === 1 ? "Да" : "нет"}</td>
                </tr>)}
            </tbody>

            <tfoot>Текущая страница: </tfoot>
        </table>
    )
};

export default Lines;