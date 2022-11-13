import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { toast } from 'react-toastify';

import { getImagesApi } from 'services/api';

import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery';

import s from './App.module.scss';
import Modal from 'components/Modal';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [largeImage, setLargeImage] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(0);
  const [searchImageText, setSearchImageText] = useState('Search image');

  useEffect(() => {
    if (query !== '') {
      setIsLoading(true);
      setSearchImageText('');
      setError(null);
      setTotalHits(0);

      getImagesApi({ q: query, page: page })
        .then(data => {
          if (!data.hits.length) {
            toast.warn('No images by your request!');
            return;
          }
          if (data.hits.length < 12) {
            toast.warn('Its all images for your request!');
          }
          setImages([...images, ...data.hits]);
          setTotalHits(data.totalHits);
        })
        .catch(error => {
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]);

  const handleLoadMore = () => {
    setPage(page + 1);
    setIsLoading(true);
    handleWindowScrollBy();
  };

  const handleWindowScrollBy = () => {
    setTimeout(() => {
      window.scrollBy({
        top: window.innerHeight - 72 + 16,
        left: 0,
        behavior: 'smooth',
      });
    }, 600);
  };

  const handleSubmit = query => {
    setQuery(prev => {
      if (prev !== query) {
        setImages([]);
        setPage(1);
      }
    });
    setQuery(query);
  };

  const toggleModal = (largeImageClick = null) => {
    setModalShow(!modalShow);
    setLargeImage(largeImageClick);
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery
        handleLoadMore={handleLoadMore}
        totalHits={totalHits}
        searchImageText={searchImageText}
        error={error}
        isLoading={isLoading}
        images={images}
        query={query}
        toggleModal={toggleModal}
        modalShow={modalShow}
      />
      {modalShow && <Modal largeImage={largeImage} closeModal={toggleModal} />}

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
};

export default App;
