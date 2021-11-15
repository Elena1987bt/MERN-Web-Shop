import { createSlice } from '@reduxjs/toolkit';

export const customerSlice = createSlice({
  name: 'customers',
  initialState: {
    customers: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getCustomersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCustomersSuccess: (state, action) => {
      state.isFetching = false;
      state.customers = action.payload;
    },
    getCustomersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteCustomerStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteCustomerSuccess: (state, action) => {
      state.isFetching = false;
      state.customers.splice(
        state.customers.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteCustomerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getCustomersStart,
  getCustomersSuccess,
  getCustomersFailure,
  deleteCustomerStart,
  deleteCustomerSuccess,
  deleteCustomerFailure,
} = customerSlice.actions;

export default customerSlice.reducer;
