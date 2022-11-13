import { Component } from 'react';
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
