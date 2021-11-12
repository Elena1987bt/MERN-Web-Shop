import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './productList.css';
import { getProducts, deleteProduct } from '../../redux/apiCalls';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);
  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };
  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    {
      field: 'title',
      headerName: 'Product',
      width: 160,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: 'inStock',
      headerName: 'In Stock',
      width: 130,
    },
    {
      field: 'size',
      headerName: 'Size',
      width: 120,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.size.slice(0, 3).map((s, i) => (
              <span>{i === params.row.size.length - 1 ? s : s + ','}</span>
            ))}
          </div>
        );
      },
    },
    {
      field: 'categories',
      headerName: 'Categories',
      width: 160,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.categories.slice(0, 3).map((cat, i) => (
              <span>
                {i === params.row.categories.length - 1 ? cat : cat + ','}
              </span>
            ))}
          </div>
        );
      },
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 120,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <a href={'/product/' + params.row._id}>
              <button className="productListEdit">Edit</button>
            </a>
            <DeleteOutlineIcon
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default ProductList;
