import { createSlice, createAction } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  tokenState: null,
  hasAccount: {
    state: false,
    address: null,
  },
  userDetails: {
    uid: null,
    name: null,
    initials: null,
    email: null,
    phone: null,
    photoURL: null,
  },
};

const essentialSlice = createSlice({
  name: 'essential',
  initialState,
  reducers: {
    setTokenState: (state, action) => {
      state.tokenState = action.payload;
    },
    setUserUID: (state, action) => {
      state.userDetails.uid = action.payload;
    },
    login: (state, action) => {
      state.isLoggedIn = true;
      //state.userDetails = action.payload;
      const { id, names, email, phone, photoUri, country } = action.payload;
      state.userDetails.id = id;
      state.userDetails.phone = phone;
      state.userDetails.country = country;
      if (email) state.userDetails.email = email;
      if (photoUri) state.userDetails.photoURL = photoUri;
      if (names) {
        state.userDetails.name = names;
        const initials = names
          .split(' ')
          .map((n) => n[0])
          .join('');
        state.userDetails.initials = initials;
      } else {
        state.userDetails.initials = phone.slice(11, 13);
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userDetails = initialState.userDetails;
    },
    setHasAccount: (state, action) => {
      state.hasAccount = action.payload;
    },
    updateUserDetails: (state, action) => {
      const { names, address, email } = action.payload;
      if (names) {
        state.userDetails.name = names;
        const initials = names
          .split(' ')
          .map((n) => n[0])
          .join('');
        state.userDetails.initials = initials;
      }
      if (email) state.userDetails.email = email;
      if (address) state.userDetails.address = address;
    },
  },
});

export const { setTokenState, setUserUID, login, logout, setHasAccount, updateUserDetails } =
  essentialSlice.actions;
export const setUserToken = createAction('essential/setUserToken');

export default essentialSlice.reducer;
