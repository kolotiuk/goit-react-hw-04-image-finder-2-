import { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery';

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
      <div>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery query={query} />
      </div>
    );
  }
}
