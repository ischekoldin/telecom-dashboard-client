import React from "react";

import PageNavigator from "./PageNavigator";

const Bills = ({records, getSearchVariables}) => {

    const paymentForm = () => {

        return (
            <>
                Не оплачен
                <script src = "https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js" />
                <form name="TinkoffPayForm" onSubmit="pay(this); return false;">
                    <input className="tinkoffPayRow" type="hidden" name="terminalkey" value="TinkoffBankTest" />
                    <input className="tinkoffPayRow" type="hidden" name="frame" value="true" />
                    <input className="tinkoffPayRow" type="hidden" name="language" value="ru" />
                    <input className="tinkoffPayRow" type="text" placeholder="Сумма заказа" name="amount" required />
                    <input className="tinkoffPayRow" type="text" placeholder="Номер заказа" name="order" />
                    <input className="tinkoffPayRow" type="text" placeholder="Описание заказа"
                       name="description" />
                    <input className="tinkoffPayRow" type="text" placeholder="ФИО плательщика"
                       name="name" />
                    <input className="tinkoffPayRow" type="text" placeholder="E-mail" name="email" />
                    <input className="tinkoffPayRow" type="text"
                       placeholder="Контактный телефон" name="phone" />
                    <input className="tinkoffPayRow" type="submit" value="Оплатить" />
                </form>
            </>
        )

    };



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
                        <td>{record.status === 0
                                ? "Не оплачен"
                                : "Оплачен"} </td>
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