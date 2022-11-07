import { Component } from 'react';

import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery';

import s from './App.module.scss';

export default class App extends Component {
  state = {
    query: '',
  };

  handleSubmit = query => {
    this.setState({ query });
  };

  render() {
    const { handleSubmit } = this;
    const { query } = this.state;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery query={query} />
      </div>
    );
  }
}
