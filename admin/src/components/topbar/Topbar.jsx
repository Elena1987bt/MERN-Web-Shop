import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/userRedux';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
import LanguageIcon from '@mui/icons-material/Language';
import Avatar from '@mui/material/Avatar';

import './topbar.css';

const Topbar = () => {
  const dispatch = useDispatch();
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin Panel</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNoneIcon />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <LanguageIcon />
          </div>
          <div className="topbarIconContainer">
            <SettingsIcon />
          </div>
          <Link to="/user/123233" className="link">
            <Avatar alt="Name" src="" className="topAvatar" />
          </Link>
          <div
            className="topbarIconContainer"
            onClick={() => dispatch(logout())}
          >
            <span className="logout">Log Out</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
