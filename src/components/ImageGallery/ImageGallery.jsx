import { Component } from 'react';
import s from './ImageGallery.module.scss';
import { fetchImages } from 'services/api';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';

class ImageGallery extends Component {
  state = {
    images: [],
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;

    if (prevProps.query !== query) {
      fetchImages(query).then(res => this.setState({ images: res }));
      return;
    }
  }

  render() {
    const { images } = this.state;

    return (
      <>
        <ul className={s.ImageGallery}>
          {images.length > 0 &&
            images.map(({ id, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                id={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
              />
            ))}
        </ul>
        {images.length > 0 && <Button />}
      </>
    );
  }
}

export default ImageGallery;
