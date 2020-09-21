import React from "react";

const Calls = ({records}) => {

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
            {records.map(record =>
                <tr key={record.id}>
                    <td>{record.line_type}</td>
                    <td>{record.calls_incoming
                        ? `Входящий ${record.incoming_cost}`
                        : `Исходящий ${record.outgoing_cost}`} р./мин.</td>
                    <td>{record.start_time}</td>
                    <td>{record.duration_secs}</td>
                    <td>{record.call_cost}</td>
                </tr>)}
            </tbody>

            <tfoot>Текущая страница: </tfoot>
        </table>
    )
};

export default Calls;