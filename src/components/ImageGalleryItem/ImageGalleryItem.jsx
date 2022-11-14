import PropTypes from 'prop-types';

import s from './ImageGalleryItem.module.scss';

const ImageGalleryItem = ({ webformatURL, largeImageURL, toggleModal }) => {
  const notFoundImage =
    'https://www.google.com/url?sa=i&url=https%3A%2F%2Fbitsofco.de%2Fhandling-broken-images-with-service-worker%2F&psig=AOvVaw3tsZfp7Thk8aUvWs0oJWDE&ust=1667663793550000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCLDgyfLxlPsCFQAAAAAdAAAAABAJ';
  const handleClick = image => {
    toggleModal(image);
  };

  return (
    <div>
      <li
        className={s.ImageGalleryItem}
        onClick={() => handleClick(largeImageURL)}
      >
        <img
          className={s['ImageGalleryItem-image']}
          src={webformatURL ? webformatURL : notFoundImage}
          alt=""
        />
      </li>
    </div>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
