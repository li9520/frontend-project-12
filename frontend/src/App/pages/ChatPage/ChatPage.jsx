import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Spinner, Container, Row,
} from 'react-bootstrap';
import DataService from '../../services/DataService';
import { addChannels, updateCurrentChannel } from '../../../slices/channelsSlice';
import Channels from './components/Channels';
import Mesasages from './components/Messages';
import { addMessages } from '../../../slices/messagesSlice';
import getModal from './components/Modals';

const Modal = () => {
  const { type } = useSelector((state) => state.modals);
  if (!type) return null;
  const Component = getModal(type);
  return <Component />;
};

const ChatPage = () => {
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await DataService.fetchData();
      const { channels, currentChannelId, messages } = data;
      dispatch(addMessages(messages));
      dispatch(addChannels(channels));
      dispatch(updateCurrentChannel(currentChannelId));
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Mesasages />
        <Modal />
      </Row>
    </Container>
  );
};

export default ChatPage;
