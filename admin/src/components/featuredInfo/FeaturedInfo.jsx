import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './featuredInfo.css';
const FeaturedInfo = () => {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  const [percPreviosMonth, setPercPreviosMonth] = useState(0);

  //  const [incomePerc, setPerc] = useState(0);
  const TOKEN = useSelector((state) => state.user.currentUser).token;
  const MONTHS = useMemo(
    () => [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    []
  );

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await axios.get(
          'https://web-shop-mern.herokuapp.com/api/order/income',
          {
            headers: { authorization: `Bearer ${TOKEN}` },
          }
        );

        setIncome(
          res.data.map((item, i) => {
            const obj = {
              ...item,
              name: MONTHS[item._id - 1],
            };
            return obj;
          })
        );
        setPerc((res.data[0].total * 100) / res.data[1].total - 100);
        setPercPreviosMonth(
          (res.data[1].total * 100) / res.data[2].total - 100
        );
      } catch (err) {
        console.log(err);
      }
    };
    getIncome();
  }, [TOKEN, MONTHS]);

  const Percentage = ({ perc }) => {
    return (
      <span className="featuredMoneyRate">
        % {Math.floor(perc)}
        {perc < 0 ? (
          <ArrowDownwardIcon className="featuredIcon negative" />
        ) : (
          <ArrowUpwardIcon className="featuredIcon" />
        )}
      </span>
    );
  };
  return (
    <div className="featured">
      {income.map((item, i) => (
        <div className="featuredItem" key={item._id}>
          <span className="featuredTitle">{item.name}</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">${item.total}</span>
            <Percentage
              perc={i === income.length - 2 ? percPreviosMonth : perc}
            />
          </div>
          <span className="featuredSub">Compared to last month</span>
        </div>
      ))}
    </div>
  );
};

export default FeaturedInfo;
