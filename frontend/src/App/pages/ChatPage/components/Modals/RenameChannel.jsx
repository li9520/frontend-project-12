import { useFormik } from 'formik';
import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../../../../slices/modalsSlice';
import { useSocket } from '../../../../hooks';

const RenameChannel = () => {
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
        await emit.renameChannel(value);
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
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={f.handleSubmit}>
          <fieldset disabled={f.isSubmitting}>
            <Form.Group controlId="name">
              <Form.Label visuallyHidden>Имя канала</Form.Label>
              <Form.Control
                className="mb-2"
                autoFocus
                required
                type="text"
                name="name"
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                value={f.values.name}
                isInvalid={f.errors.name && f.touched.name}
              />
              <Form.Control.Feedback type="invalid">{f.errors.name}</Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button className="me-2" variant="secondary" onClick={onHide}>Отменить</Button>
              <Button variant="primary" type="submit">Отправить</Button>
            </div>
          </fieldset>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
