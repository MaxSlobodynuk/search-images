import React, { useEffect } from 'react';
import css from 'styles.module.css';

const Modal = ({ modalImage, toggleModal }) => {
  const closeModalOverlay = e => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  useEffect(() => {
    const closeModalESC = e => {
      if (e.code === 'Escape') {
        toggleModal();
      }
    };

    window.addEventListener('keydown', closeModalESC);

    return () => {
      window.removeEventListener('keydown', closeModalESC);
    };
  }, [toggleModal]);

  return (
    <div className={css.Overlay} onClick={closeModalOverlay}>
      <div className={css.Modal}>
        <img
          className={css.ModalImage}
          src={modalImage.largeImageURL}
          alt={modalImage.largeImageURL}
        />
      </div>
    </div>
  );
};

export default Modal;
