import { useFormik } from 'formik';
import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../../../../slices/modalsSlice';
import { useSocket } from '../../../../hooks';

const RemoveChannel = () => {
  const dispatch = useDispatch();
  const emit = useSocket();
  const { item } = useSelector((state) => state.modals);
  const onHide = () => {
    dispatch(hideModal());
  };

  const f = useFormik({
    initialValues: item,
    onSubmit: async (value) => {
      try {
        await emit.removeChannel(value);
        onHide();
      } catch (err) {
        f.setSubmitting(false);
        throw err;
      }
    },
  });
  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <Form onSubmit={f.handleSubmit}>
          <fieldset className="d-flex justify-content-end" disabled={f.isSubmitting}>
            <Button className="me-2" variant="secondary" onClick={onHide}>Отменить</Button>
            <Button variant="danger" type="submit" autoFocus>Удалить</Button>
          </fieldset>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
