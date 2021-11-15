import React from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PublishIcon from '@mui/icons-material/Publish';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './user.css';

const User = () => {
  const location = useLocation();
  const customerId = location.pathname.split('/')[2];
  const customer = useSelector((state) =>
    state.customer.customers.find((customer) => customer._id === customerId)
  );

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="data:image/jpeg;base64,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"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{customer.username}</span>
              <span className="userShowUserTitle">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentityIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{customer.email}</span>
            </div>
            <div className="userShowInfo">
              <CalendarTodayIcon className="userShowIcon" />
              <span className="userShowInfoTitle">
                {customer.isAdmin ? 'Admin' : 'Customer'}
              </span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroidIcon className="userShowIcon" />
              <span className="userShowInfoTitle">+286 4582 885</span>
            </div>
            <div className="userShowInfo">
              <MailOutlineIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{customer.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearchingIcon className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={customer.username}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder={customer.username}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={customer.email}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="+1 123 456 67"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="New York | USA"
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="data:image/jpeg;base64,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"
                  alt=""
                />
                <label htmlFor="file">
                  <PublishIcon className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: 'none' }} />
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default User;
