import React from 'react';
import PropTypes from 'prop-types';

import s from './Button.module.scss';

const Button = ({ handleLoadMore }) => {
  return (
    <button type="button" className={s.Button} onClick={handleLoadMore}>
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = { handleLoadMore: PropTypes.func.isRequired };
