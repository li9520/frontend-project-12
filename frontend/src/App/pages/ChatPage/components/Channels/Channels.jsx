import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Col, Button, Nav, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { channelsSelectors, updateCurrentChannel } from '../../../../../slices/channelsSlice';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const classButton = 'w-100 rounded-0 text-start btn text-truncate';
  const classBtnGroup = 'flex-grow-0 dropdown-toggle dropdown-toggle-split btn noborder-btn';

  const changeCurrentChannel = (id) => () => {
    dispatch(updateCurrentChannel(id));
  };

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button className="p-0 text-primary" variant="group-vertical">
          <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            height="20"
            width="20"
          >
            <path d="M14 1a1 1 0 011 1v12a1 1 0 01-1 1H2a1 1 0 01-1-1V2a1 1 0 011-1h12zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" />
            <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav
        fill
        variant="pills"
        className="flex-column px-2 overflow-auto mb-3 h-100 d-block"
      >
        {channels.map(({ id, name, removable }) => (
          <Nav.Item className="w-100" key={id}>
            <ButtonGroup className="d-flex dropdown btn-group channelsBtn">
              <Button
                onClick={changeCurrentChannel(id)}
                variant={(id === currentChannelId) ? 'secondary' : 'light'}
                type="button"
                className={classButton}
              >
                <span className="me-1">#</span>
                {name}
              </Button>
              {removable
                && (
                  <Dropdown>
                    <Dropdown.Toggle variant={(id === currentChannelId) ? 'secondary' : 'light'} id="dropdown-basic" className={classBtnGroup}>
                      <span className="visually-hidden">Управление каналом</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => {}} variant="light" eventKey="1">Удалить</Dropdown.Item>
                      <Dropdown.Item onClick={() => {}} variant="light" eventKey="2">Перекименовать</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
            </ButtonGroup>
          </Nav.Item>
        ))}
      </Nav>
    </Col>
  );
};

export default Channels;
