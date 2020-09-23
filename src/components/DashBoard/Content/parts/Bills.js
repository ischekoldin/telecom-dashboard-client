import React from "react";

import PageNavigator from "./PageNavigator";

const Bills = ({records, getSearchVariables}) => {

    console.log(records);
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Счет</th>
                        <th>Сумма</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                {records.content.map(record =>
                    <tr key={Date.now() + record.bill_id}>
                        <td className="text-left">
                            <p>{record.bill_id}: {record.bill_description} - {record.address}</p>
                            <p className="text-small" >{record.created}</p>
                        </td>
                        <td>{record.total_sum} р.</td>
                        <td>{record.status} </td>
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

export default Bills;