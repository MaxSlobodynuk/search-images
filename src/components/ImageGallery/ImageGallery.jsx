import React from 'react';
import css from 'styles.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ hits, openModal }) => {
  return (
    <ul className={css.ImageGallery}>
      {hits &&
        hits.map(item => (
          <ImageGalleryItem key={item.id} item={item} openModal={openModal} />
        ))}
    </ul>
  );
};

export default ImageGallery;
