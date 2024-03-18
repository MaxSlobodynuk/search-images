const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '36861352-2474982a97ff1b570eda1c4c2';

export const fetchImages = (name, page, perPage) => {
  return fetch(
    `${BASE_URL}/?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  ).then(res => res.json());
};
