import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const defaultCurrentChannelId = 1;
const initialState = channelsAdapter.getInitialState(
  { currentChannelId: defaultCurrentChannelId },
);
/* eslint no-param-reassign: ["error", { "props": false }] */
const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    updateCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: (state, { payload }) => {
      channelsAdapter.addOne(state, payload);
      state.currentChannelId = payload.id;
    },
    addChannels: channelsAdapter.addMany,
    deleteChannel: (state, { payload }) => {
      const { id } = payload;
      channelsAdapter.removeOne(state, id);
      if (state.currentChannelId === id) {
        state.currentChannelId = defaultCurrentChannelId;
      }
    },
    updateChannel: (state, { payload }) => {
      const { id, name } = payload;
      channelsAdapter.updateOne(state, { id, changes: { name } });
    },
  },
});

export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export const {
  updateCurrentChannel, addChannel, addChannels, deleteChannel, updateChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
