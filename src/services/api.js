import axios from 'axios';

export const fetchImages = query => {
  const res = axios
    .get(
      `https://pixabay.com/api/?key=31087212-f51e4bc1d06c358e6f1ee293b&q=${query}&image_type=photo`
    )
    .then(res => res.data.hits);
  return res;
};
