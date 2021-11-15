import { useEffect, useState } from 'react';
import axios from 'axios';
import WidgetSmListItem from './widgetSmListItem/WidgetSmListItem';
import { useSelector } from 'react-redux';
import './widgetSm.css';

const WidgetSm = () => {
  const [users, setUsers] = useState([]);
  const TOKEN = useSelector((state) => state.user.currentUser).token;
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(
          'https://web-shop-mern.herokuapp.com/api/user?new=5',
          {
            headers: {
              authorization: `Bearer ${TOKEN}`,
            },
          }
        );
        setUsers(res.data.users);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, [TOKEN]);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <WidgetSmListItem
            key={user._id}
            name={user.username}
            title={user.email}
            img={
              user?.img ||
              'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'
            }
          />
        ))}
      </ul>
    </div>
  );
};
export default WidgetSm;
