import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { Link } from 'react-router-dom';
import './userList.css';
import { getCustomers, deleteCustomer } from '../../redux/apiCalls';

const UserList = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customer.customers);
  useEffect(() => {
    getCustomers(dispatch);
  }, [dispatch]);
  const handleDelete = (id) => {
    deleteCustomer(id, dispatch);
  };

  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };

  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    {
      field: 'username',
      headerName: 'User',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src="data:image/jpeg;base64,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"
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'isAdmin',
      headerName: 'Is Admin',
      width: 150,
    },

    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/user/' + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="userList">
      <DataGrid
        rows={customers}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default UserList;
