import axios from 'axios';
import { loginFailure, loginStart, loginSuccess } from './userRedux';

const BASE_URL = 'http://127.0.0.1:5000/api';
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, user);

    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
