import { Component } from 'react';

import s from './Searchbar.module.scss';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleSearchImage = e => {
    this.setState({ query: e.target.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.query.trim() === '') {
      alert('Введыть');
      return;
    }

    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    const { handleSearchImage, handleSubmit } = this;

    return (
      <div>
        <header className={s.Searchbar}>
          <form className={s.SearchForm} onSubmit={handleSubmit}>
            <button type="submit" className={s['SearchForm-button']}>
              <span className={s['SearchForm-button-label']}>Search</span>
            </button>

            <input
              className={s['SearchForm-input']}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={query}
              onChange={handleSearchImage}
            />
          </form>
        </header>
      </div>
    );
  }
}

export default Searchbar;
