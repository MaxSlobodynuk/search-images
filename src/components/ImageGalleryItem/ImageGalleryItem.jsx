import React from 'react'
import css from 'styles.module.css';

const ImageGalleryItem = ({ item, openModal }) => {
  return (
    <li className={css.ImageGalleryItem} onClick={() => openModal(item.id)}>
      <img
        src={item.webformatURL}
        alt={item.tags}
        className={css.ImageGalleryItemImage}
      />
    </li>
  );
};

export default ImageGalleryItem