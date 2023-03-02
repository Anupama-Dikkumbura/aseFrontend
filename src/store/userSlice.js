import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    phoneNumber: '',
    firstName: '',
    lastName: '',
    role: '',
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.phoneNumber = action.payload.phoneNumber;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.role = action.payload.role;
    },
  },
});

export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;
