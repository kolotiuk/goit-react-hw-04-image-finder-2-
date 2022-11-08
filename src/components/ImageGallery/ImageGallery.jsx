import { Component } from 'react';
import s from './ImageGallery.module.scss';
import { getImagesApi } from 'services/api';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';

import { toast } from 'react-toastify';
import Loader from 'components/Loader';

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    isLoading: false,
    error: null,
    totalHits: 0,
    searchImageText: 'Search image',
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    const { page } = this.state;

    if (prevProps.query !== query) {
      this.setState({ images: [], page: 1 });
    }

    if (prevState.page !== page || (prevProps.query !== query && page === 1)) {
      this.getImages();
    }
  }

  getImages = () => {
    this.setState({
      isLoading: true,
      searchImageText: '',
      error: null,
      totalHits: 0,
    });
    getImagesApi({ q: this.props.query, page: this.state.page })
      .then(data => {
        if (!data.hits.length) {
          toast.warn('No images by your request!');
        }
        if (data.hits.length < 12) {
          toast.warn('Its all images for your request!');
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          totalHits: data.totalHits,
        }));
      })
      .catch(error => {
        this.setState({ error });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1, isLoading: true }));
    this.handleWindowScrollBy();
  };

  handleWindowScrollBy = () => {
    setTimeout(() => {
      window.scrollBy({
        top: window.innerHeight - 72 + 16,
        left: 0,
        behavior: 'smooth',
      });
    }, 600);
  };

  render() {
    const { images, isLoading, error, searchImageText, totalHits } = this.state;
    const { handleLoadMore } = this;
    const { toggleModal } = this.props;

    return (
      <>
        {images.length === 0 && (
          <p className={s.SearchTextBlock}>{searchImageText}</p>
        )}
        {error && <p className={s.SearchTextBlock}>{error.message}</p>}
        {isLoading && <Loader />}
        <ul className={s.ImageGallery}>
          {images.length > 0 &&
            images.map(({ id, webformatURL, largeImageURL }, idx) => {
              return (
                <ImageGalleryItem
                  key={idx}
                  id={id}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  toggleModal={toggleModal}
                />
              );
            })}
        </ul>

        {images.length !== totalHits ? (
          <Button handleLoadMore={handleLoadMore} />
        ) : null}
      </>
    );
  }
}

export default ImageGallery;
