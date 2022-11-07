import s from './ImageGalleryItem.module.scss';

const ImageGalleryItem = ({ webformatURL, largeImageURL }) => {
  const notFoundImage =
    'https://www.google.com/url?sa=i&url=https%3A%2F%2Fbitsofco.de%2Fhandling-broken-images-with-service-worker%2F&psig=AOvVaw3tsZfp7Thk8aUvWs0oJWDE&ust=1667663793550000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCLDgyfLxlPsCFQAAAAAdAAAAABAJ';

  return (
    <li className={s.ImageGalleryItem}>
      <img
        className={s['ImageGalleryItem-image']}
        src={webformatURL ? webformatURL : notFoundImage}
        alt=""
      />
    </li>
  );
};

export default ImageGalleryItem;
