import axios from 'axios';

const API_URL = 'https://reqres.in/api/groups';
export const fetchGroups = async () => {
  const res = await axios.get(API_URL);
  return res.data.data || res.data;
};

export const getGroups = async () => {
  const res = await axios.get(API_URL);
  return res.data.data || res.data;
};

export const createGroup = async (group) => {
  const res = await axios.post(API_URL, group);
  return res.data;
};

export const getGroupById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data.data || res.data;
};

export const updateGroup = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteGroup = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
