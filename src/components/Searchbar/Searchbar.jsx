import { useState } from 'react';
import css from 'styles.module.css';

import React from 'react'

const Searchbar = ({onSubmit}) => {
  const [value, setValue] = useState('');

  const handleChange = ({ target }) => {
      setValue(target.value.toLowerCase());
    };

    const handleSubmit = e => {
      e.preventDefault();

      if (value.trim() === '') {
        return;
      }

      onSubmit(value);
      setValue('')
    };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className="btn btn-warning">
          <span className="button-label">Search</span>
        </button>

        <input
          onChange={handleChange}
          className="form-control"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
        />
      </form>
    </header>
  );
}

export default Searchbar

// class Searchbar extends Component {
//   state = {
//     value: '',
//   };

//   handleChange = ({ target }) => {
//     this.setState({ value: target.value.toLowerCase() });
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     if (this.state.value.trim() === '') {
//       return;
//     }

//     this.props.onSubmit(this.state.value);
//     this.setState({ value: '' });
//   };

//   render() {
//     return (
//       <header className={css.Searchbar}>
//         <form className={css.SearchForm} onSubmit={this.handleSubmit}>
//           <button type="submit" className="btn btn-warning">
//             <span className="button-label">Search</span>
//           </button>

//           <input
//             onChange={this.handleChange}
//             className="form-control"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.value}
//           />
//         </form>
//       </header>
//     );
//   }
// }

// export default Searchbar;
