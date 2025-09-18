import axios from 'axios';

const USER_API = 'http://localhost:5000/api/user';

export const getFavorites = async (token) => {
  return await axios.get(`${USER_API}/favorites`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateFavorites = async (favorites, token) => {
  return await axios.put(
    `${USER_API}/favorites`,
    { favorites },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
