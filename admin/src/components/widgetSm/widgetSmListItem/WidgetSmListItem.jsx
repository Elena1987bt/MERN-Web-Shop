import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';

import './widgetSmListItem.css';

const widgetSmListItem = ({ img, name, title }) => {
  return (
    <li className="widgetSmListItem">
      <img src={img} alt="" className="widgetSmImg" />
      <div className="widgetSmUser">
        <span className="widgetSmUsername">{name}</span>
        <span className="widgetSmUserTitle">{title}</span>
      </div>
      <button className="widgetSmButton">
        <VisibilityIcon className="widgetSmIcon" />
        Display
      </button>
    </li>
  );
};

export default widgetSmListItem;
