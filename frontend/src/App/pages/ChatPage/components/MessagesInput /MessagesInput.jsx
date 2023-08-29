import React from 'react';
import * as yup from 'yup';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useAuth, useSocket } from '../../../../hooks';

const MessagesInput = () => {
  const auth = useAuth();
  const channelId = useSelector((state) => state.channels.currentChannelId);
  const emit = useSocket();
  const username = auth.getUser();
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: yup.object().shape({
      body: yup
        .string()
        .trim()
        .required(),
    }),
    onSubmit: async ({ body }) => {
      console.log(body);
      try {
        await emit.sendMessage({ body, channelId, username });
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
