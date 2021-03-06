import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartRedux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const data = location.state.stripeData;
  const cart = location.state.products;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await axios.post(
          'https://web-shop-mern.herokuapp.com/api/order',
          {
            userId: currentUser._id,
            products: cart.products.map((item) => ({
              productId: item._id,
              quantity: item._quantity,
            })),
            amount: cart.total,
            address: data.billing_details.address,
          },
          {
            headers: {
              authorization: `Bearer ${currentUser.token}`,
            },
          }
        );
        setOrderId(res.data._id);
      } catch (err) {
        console.log(err);
      }
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : ` Your order is being prepared...`}
      <Link
        to="/"
        style={{ padding: 10, marginTop: 20, border: '1px solid black' }}
        className="link"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default Success;
