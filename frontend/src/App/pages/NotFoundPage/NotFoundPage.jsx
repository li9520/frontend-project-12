import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../../utils/routes';

const NotFoundPage = () => {
  const path = routes.rootPagePath();
  return (
    <div className="text-center p-5 mt-5">
      <h1 className="h4 text-muted p-5 mt-5">Страница не найдена</h1>
      <p className="text-muted">
        {'Но вы можете перейти '}
        <Link to={path}>на главную страницу</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
