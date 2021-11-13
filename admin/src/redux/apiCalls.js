import { loginFailure, loginStart, loginSuccess } from './userRedux';
import axios from 'axios';
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from './productRedux';

const BASE_URL = 'http://127.0.0.1:5000/api';
const TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
  .currentUser.token;

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await axios.get(`${BASE_URL}/product`, {
      headers: {
        authorization: 'Bearer ' + TOKEN,
      },
    });
    dispatch(getProductSuccess(res.data.products));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await axios.delete(`${BASE_URL}/product/${id}`, {
      headers: {
        authorization: 'Bearer ' + TOKEN,
      },
    });
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    const res = await axios.put(`${BASE_URL}/product/${id}`, product, {
      headers: {
        authorization: 'Bearer ' + TOKEN,
      },
    });
    const updatedProduct = res.data;

    dispatch(updateProductSuccess({ id, updatedProduct }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await axios.post(`${BASE_URL}/product`, product, {
      headers: {
        authorization: 'Bearer ' + TOKEN,
      },
    });

    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

// USERS
