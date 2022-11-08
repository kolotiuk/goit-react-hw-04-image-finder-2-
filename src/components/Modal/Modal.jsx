import { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.scss';

const modalRoot = document.querySelector('#modal');

class Modal extends Component {
  handleEsc = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleOvarlay = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
  }

  render() {
    return createPortal(
      <div className={s.Overlay} onClick={e => this.handleOvarlay(e)}>
        <div className={s.Modal}>
          <img src={this.props.largeImage} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
