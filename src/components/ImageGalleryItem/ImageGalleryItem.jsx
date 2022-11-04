import s from './ImageGalleryItem.module.scss';

const ImageGalleryItem = ({ webformatURL, largeImageURL }) => {
  return (
    <li className={s.ImageGalleryItem}>
      <img className={s['ImageGalleryItem-image']} src={webformatURL} alt="" />
    </li>
  );
};

export default ImageGalleryItem;
