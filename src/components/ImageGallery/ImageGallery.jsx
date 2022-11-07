import { Component } from 'react';
import s from './ImageGallery.module.scss';
import { getImagesApi } from 'services/api';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    isLoading: false,
    error: null,
    something: 'Search images...',
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
    this.setState({ isLoading: true, something: '' });
    getImagesApi({ q: this.props.query, page: this.state.page })
      .then(res =>
        this.setState(prevState => ({
          images: [...prevState.images, ...res],
        }))
      )
      .catch(error => {
        this.setState({ error });
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  render() {
    const { images, isLoading, error, something } = this.state;
    const { handleLoadMore } = this;

    return (
      <>
        {images.length === 0 && (
          <div className={s.SearchTextBlock}>{something}</div>
        )}
        {error && <div>{error.message}</div>}
        {isLoading && <div className={s.SearchTextBlock}>Donwloading...</div>}
        <ul className={s.ImageGallery}>
          {images.length > 0 &&
            images.map(({ id, webformatURL, largeImageURL }, idx) => (
              <ImageGalleryItem
                key={idx}
                id={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
              />
            ))}
        </ul>
        {images.length > 0 && <Button handleLoadMore={handleLoadMore} />}
      </>
    );
  }
}

export default ImageGallery;
