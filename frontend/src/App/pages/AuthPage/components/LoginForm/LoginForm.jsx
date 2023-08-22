import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useFormik } from 'formik';

const LoginForm = () => {
  const [authFailed] = useState(false);
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Form className="mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <fieldset disabled={formik.isSubmitting}>
        <h1 className="text-center mb-4">Войти</h1>
        <FloatingLabel
          controlId="userName"
          label="Ваш ник"
          className="mb-3"
        >
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.userName}
            placeholder="userName"
            type="text"
            autoFocus
            required
            isInvalid={authFailed}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="password"
          label="Пароль"
          className="mb-4"
        >
          <Form.Control
            required
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
            placeholder="Пароль"
            type="password"
            isInvalid={authFailed}
          />
        </FloatingLabel>
        <Button
          type="submit"
          className="w-100 mb-3"
          variant="outline-primary"
        >
          Войти
        </Button>
      </fieldset>
    </Form>
  );
};

export default LoginForm;
