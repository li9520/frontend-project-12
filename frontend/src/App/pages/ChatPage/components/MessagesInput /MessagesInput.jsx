import React from 'react';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';

const MessagesInput = ({ onClick }) => {
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async () => {
      try {
        await onClick();
        formik.resetForm();
      } catch (err) {
        formik.setSubmitting(false);
        throw err;
      }
    },
  });
  return (
    <div className="mt-auto px-5 py-3">
      <Form className="py-1 border rounded-2" noValidate onSubmit={formik.handleSubmit}>
        <fieldset disabled={formik.isSubmitting}>
          <InputGroup>
            <Form.Control
              className="border-0 p-0 ps-2"
              autoFocus
              required
              type="text"
              name="body"
              aria-label="Новое сообщение"
              placeholder="Введите сообщение..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.body}
            />
            <Button variant="group-vertical" className="border-0" type="submit" disabled={!formik.isValid}>
              <ArrowRightSquare size={20} />
              <span className="visually-hidden">Отправить</span>
            </Button>
          </InputGroup>
        </fieldset>
      </Form>
    </div>
  );
};

export default MessagesInput;
