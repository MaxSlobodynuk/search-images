import React from 'react';
import css from 'styles.module.css';

const Button = ({onClick}) => {
  return (
    <button type="button" className={css.Button} onClick={onClick}>
      Load more
    </button>
  );
};

export default Button;
