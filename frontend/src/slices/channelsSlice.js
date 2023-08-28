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
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    removeChannel: (state, { payload }) => {
      const { id } = payload;
      channelsAdapter.removeOne(state, payload);
      if (state.currentChannelId === id) {
        state.currentChannel.id = defaultCurrentChannelId;
      }
    },
    updateChannel: channelsAdapter.updateOne,
  },
});

export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export const {
  updateCurrentChannel, addChannel, addChannels, removeChannel, updateChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
