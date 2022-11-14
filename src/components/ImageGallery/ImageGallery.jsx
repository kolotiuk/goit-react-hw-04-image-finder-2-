import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.scss';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';

import Loader from 'components/Loader';

class ImageGallery extends Component {
  render() {
    const {
      handleLoadMore,
      toggleModal,
      images,
      isLoading,
      error,
      searchImageText,
      totalHits,
    } = this.props;

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

ImageGallery.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.string.isRequired,
  ]),
  searchImageText: PropTypes.string.isRequired,
  totalHits: PropTypes.number.isRequired,
};
