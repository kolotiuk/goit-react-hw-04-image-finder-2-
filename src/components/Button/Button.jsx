import React from 'react';
import s from './Button.module.scss';

const Button = ({ handleLoadMore }) => {
  return (
    <button type="button" className={s.Button} onClick={handleLoadMore}>
      Load more
    </button>
  );
};

export default Button;
