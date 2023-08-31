import { createSlice } from '@reduxjs/toolkit';

/* eslint no-param-reassign: ["error", { "props": false }] */
const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    type: null,
    item: null,
  },
  reducers: {
    hideModal: (state) => {
      state.type = null;
      state.item = null;
    },
    showModal: (state, { payload }) => {
      const { type, item } = payload;
      console.log(type);
      state.type = type;
      state.item = item;
    },
  },
});

export const { hideModal, showModal } = modalsSlice.actions;
export default modalsSlice.reducer;
