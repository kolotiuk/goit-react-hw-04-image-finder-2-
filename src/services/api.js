import axios from 'axios';

const API_KEY = '31087212-f51e4bc1d06c358e6f1ee293b';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getImagesApi = async ({ q, page }) => {
  axios.defaults.params = {
    q,
    key: API_KEY,
    per_page: 12,
    page,
  };

  return axios.get().then(({ data }) => {
    console.log(data);
    return data.hits;
  });
};

// .get(
//   `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
// )
