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
      width: 200,
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
      width: 140,
    },
    {
      field: 'size',
      headerName: 'Size',
      width: 120,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.size.map((s) => (
              <span>{s}</span>
            ))}
          </div>
        );
      },
    },
    {
      field: 'categories',
      headerName: 'Categories',
      width: 120,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.categories.map((category) => (
              <span>{category} </span>
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
