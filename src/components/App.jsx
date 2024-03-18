import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    value: '',
    page: 1,
    data: null,
    // perPage: 12,
  };

  componentDidUpdate(prevProps, prevState) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '37016805-d1d678301f08548020cdd855a';
    if (prevProps.value !== this.state.value) {
      fetch(
        `${BASE_URL}/?q=${this.state.value}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      ).then(res => res.json()).then(data => this.setState({data}))
    }
  }

  onSubmit = value => {
    this.setState({ value });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery />
      </div>
    );
  }
}

export default App;
