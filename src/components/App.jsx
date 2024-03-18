import { Component } from 'react';
import { fetchImages } from '../servises/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import css from 'styles.module.css';

class App extends Component {
  state = {
    value: '',
    page: 1,
    hits: [],
    isLoading: false,
    totalPages: 0,
    perPage: 12,
    button: false,
  };

  getData = () => {
    const { value, page, perPage } = this.state;
    fetchImages(value, page, perPage)
      .then(data => {
        if (data.hits.length > 0) {
          const hits = data.hits.map(image => ({
            id: image.id,
            webformatURL: image.webformatURL,
            largeImageURL: image.largeImageURL,
          }));

          this.setState(prevState => ({
            hits: [...prevState.hits, ...hits],
            totalPages: Math.ceil(data.totalHits / perPage),
            button: hits.length >= 12 ? true : false,
          }));
        }
      })
      .catch(error => console.error('Error fetching data:', error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  componentDidUpdate(prevProps, prevState) {
    const { value, page } = this.state;
    if (prevState.value !== value || prevState.page !== page) {
      this.setState({ isLoading: true });
      this.getData();
    }
  }

  onSubmit = value => {
    this.setState({ value, page: 1, hits: [] });
  };

  handleButtonClick = () => {
    const { page, totalPages } = this.state;
    if (page < totalPages) {
      this.setState(prevState => ({ page: prevState.page + 1 }));
    } else {
      this.setState({ button: false });
    }
  };

  render() {
    const { isLoading, button, hits } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />
        {isLoading && <div>Loading...</div>}
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
        {button && <Button onClick={this.handleButtonClick} />}
      </div>
    );
  }
}

export default App;
