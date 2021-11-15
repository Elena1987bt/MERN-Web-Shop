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
import {
  getCustomersFailure,
  getCustomersStart,
  getCustomersSuccess,
  deleteCustomerFailure,
  deleteCustomerStart,
  deleteCustomerSuccess,
} from './customerRedux';

const BASE_URL = 'https://web-shop-mern.herokuapp.com/api';
const user = JSON.parse(localStorage.getItem('persist:root'))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.token;

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
        authorization: `Bearer ${TOKEN}`,
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
        authorization: `Bearer ${TOKEN}`,
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
        authorization: `Bearer ${TOKEN}`,
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
        authorization: `Bearer ${TOKEN}`,
      },
    });

    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

// USERS
export const getCustomers = async (dispatch) => {
  dispatch(getCustomersStart());
  try {
    const res = await axios.get(`${BASE_URL}/user`, {
      headers: {
        authorization: `Bearer ${TOKEN}`,
      },
    });

    dispatch(getCustomersSuccess(res.data.users));
  } catch (err) {
    dispatch(getCustomersFailure());
  }
};
export const deleteCustomer = async (id, dispatch) => {
  dispatch(deleteCustomerStart());
  try {
    const res = await axios.delete(`${BASE_URL}/user/${id}`, {
      headers: {
        authorization: `Bearer ${TOKEN}`,
      },
    });
    dispatch(deleteCustomerSuccess(id));
  } catch (err) {
    dispatch(deleteCustomerFailure());
  }
};
