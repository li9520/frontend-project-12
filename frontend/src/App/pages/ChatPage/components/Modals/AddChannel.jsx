import { useFormik } from 'formik';
import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { hideModal } from '../../../../../slices/modalsSlice';
import { useSocket } from '../../../../hooks';

const AddChannel = () => {
  const dispatch = useDispatch();
  const emit = useSocket();
  const onHide = () => {
    dispatch(hideModal());
  };

  const f = useFormik({
    initialValues: { name: '' },
    onSubmit: async (value) => {
      try {
        await emit.createChannel(value);
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
        <Modal.Title>Добавить канал</Modal.Title>
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

export default AddChannel;
