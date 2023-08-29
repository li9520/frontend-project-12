import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { deleteChannel } from './channelsSlice';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();
/* eslint no-param-reassign: ["error", { "props": false }] */
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
    removeMessage: () => messagesAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteChannel, (state, { payload }) => {
      const channelId = payload.id;
      const restEntities = Object.values(state.entities).filter((e) => e.channelId !== channelId);
      messagesAdapter.setAll(state, restEntities);
    });
  },
});

export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);
export const { addMessage, addMessages, removeMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
