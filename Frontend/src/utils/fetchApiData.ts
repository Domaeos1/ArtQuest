import axios from "axios";

export const fetchClevelandApiData = (
  page: number,
  query?: string,
  filter?: string,
  sort?: string
) => {
  const url = "https://openaccess-api.clevelandart.org/api/artworks";
  const limit = 12;
  const params: { [key: string]: any } = {
    skip: 8 + (page - 1) * limit,
    limit: limit,
    has_image: 1,
  };

  if (query || filter || sort) {
    params["q"] = query;
    params["department"] = filter;
  }

  return axios.get(url, { params });
};

export const fetchChicagoApiData = (
  page: number,
  query?: string,
  filter?: string,
  sort?: string
) => {
  const url = "https://api.artic.edu/api/v1/artworks/search";
  const params: { [key: string]: any } = {
    page: page,
    limit: query ? 40 : 12,
    has_not_been_viewed_much: false,
  };

  if (query || filter || sort) {
    params["q"] = query;
    params["department"] = filter;
  }

  return axios.get(url, { params });
};
