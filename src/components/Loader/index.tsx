import React from 'react';
import './index.scss';

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <div className="loader__spinner"></div>
      <div className="loader__text">Загрузка...</div>
    </div>
  );
};

export default Loader;
