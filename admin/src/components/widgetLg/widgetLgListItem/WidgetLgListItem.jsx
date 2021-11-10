import React from 'react';
import moment from 'moment';

import './widgetLgListItem.css';

const WidgetLgListItem = ({ name, date, price, type }) => {
  const Button = ({ type }) => {
    return <button className={'widgetLgButton ' + type}>{type}</button>;
  };
  return (
    <tr className="widgetLgTr">
      <td className="widgetLgUser">
        <span className="widgetLgName">{name}</span>
      </td>
      <td className="widgetLgDate"> {moment(date).fromNow()}</td>
      <td className="widgetLgAmount">${price}</td>
      <td className="widgetLgStatus">
        <Button type={type} />
      </td>
    </tr>
  );
};

export default WidgetLgListItem;
