import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import { messagesSelectors } from '../../../../../slices/messagesSlice';
import { channelsSelectors } from '../../../../../slices/channelsSlice';
import MessagesInput from '../MessagesInput /MessagesInput';

const Messages = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const messages = useSelector(messagesSelectors.selectAll)
    .filter(({ channelId }) => channelId === currentChannelId);
  // eslint-disable-next-line max-len
  const currentChannel = useSelector((state) => channelsSelectors.selectById(state, currentChannelId));
  const messagesRef = useRef(null);
  useEffect(() => {
    messagesRef.current
      ?.lastElementChild
      ?.scrollIntoView({ block: 'start', behavior: 'auto' });
  }, [currentChannelId, messages]);

  const messagesHeader = (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <div className="overflow-auto px-5">
        <p className="m-0">
          <b>
            {`# ${currentChannel.name}`}
          </b>
        </p>
        <span className="text-muted">{`${messages.length} сообщений`}</span>
      </div>
    </div>
  );

  const messagesBox = (
    <div ref={messagesRef} className="chat-messages overflow-auto px-5">
      {messages.map(({ username, body, id }) => (
        <div className="text-break mb-2" key={id}>
          <b>{`${username}: `}</b>
          <span>{body}</span>
        </div>
      ))}
    </div>
  );

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        { messagesHeader }
        { messagesBox }
        <MessagesInput />
      </div>
    </Col>
  );
};

export default Messages;
