import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import s from './Modal.module.scss';

const modalRoot = document.querySelector('#modal');

const Modal = ({ closeModal, largeImage }) => {
  useEffect(() => {
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEsc = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleOvarlay = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={e => handleOvarlay(e)}>
      <div className={s.Modal}>
        <img src={largeImage} alt="" />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};
