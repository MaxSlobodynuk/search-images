import { Component } from "react";
import css from 'styles.module.css'

class ImageGallery extends Component {
  state = {};
  render() {
    const hits = this.props.hits;
      return (
        <ul className={css.ImageGallery}>
          {hits &&
            hits.map(item => (
              <li key={item.id} className={css.ImageGalleryItem}>
                <img
                  className={css.ImageGalleryItemImage}
                  src={item.webformatURL}
                  alt={item.user}
                />
              </li>
            ))}
        </ul>
      );
  }
}

export default ImageGallery;
