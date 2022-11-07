import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery';

import s from './App.module.scss';
import Modal from 'components/Modal';

export default class App extends Component {
  state = {
    query: '',
    modalShow: false,
    largeImage: null,
  };

  handleSubmit = query => {
    this.setState({ query });
  };

  toggleModal = (largeImage = null) => {
    this.setState(prev => ({
      modalShow: !prev.modalShow,
      largeImage: largeImage,
    }));
  };

  render() {
    const { handleSubmit, toggleModal } = this;
    const { query, modalShow, largeImage } = this.state;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery
          query={query}
          toggleModal={toggleModal}
          modalShow={modalShow}
        />
        {modalShow && (
          <Modal largeImage={largeImage} closeModal={toggleModal} />
        )}

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    );
  }
}
