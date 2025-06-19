import axios from 'axios';

const API = 'http://localhost:5000/api/auth';

export const register = async (user) =>
  await axios.post(`${API}/register`, user);

export const login = async (user) =>
  await axios.post(`${API}/login`, user);
