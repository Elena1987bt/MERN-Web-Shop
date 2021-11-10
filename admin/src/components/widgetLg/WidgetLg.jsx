import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './widgetLg.css';
import WidgetLgListItem from './widgetLgListItem/WidgetLgListItem';

const WidgetLg = () => {
  const [orders, setOrders] = useState([]);
  const TOKEN = useSelector((state) => state.user.currentUser).token;
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5000/api/order', {
          headers: {
            authorization: `Bearer ${TOKEN}`,
          },
        });
        setOrders(res.data.orders);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, [TOKEN, orders]);
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer ID</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
          {orders.map((order) => (
            <WidgetLgListItem
              name={order._id}
              price={order.amount}
              date={order.createdAt}
              type={order.status}
              key={order._id}
            />
          ))}
        </thead>
      </table>
    </div>
  );
};
export default WidgetLg;
