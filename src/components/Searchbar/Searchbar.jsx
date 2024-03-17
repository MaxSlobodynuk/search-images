import { Component } from 'react';
import css from 'styles.module.css'

class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = ({ target }) => {
      this.setState({ value: target.value });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm}>
          <button type="submit" className="btn btn-warning">
            <span className="button-label">Search</span>
          </button>

          <input
            onChange={this.handleChange}
            className="form-control"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
