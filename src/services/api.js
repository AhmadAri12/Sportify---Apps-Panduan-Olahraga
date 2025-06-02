import axios from 'axios';
const API_BASE = 'https://683dbe6b199a0039e9e6b7fe.mockapi.io/api/Discover';
export const getArticles = () => axios.get(API_BASE);
export const getArticleById = (id) => axios.get(`${API_BASE}/${id}`);
export const addArticle = (data) => axios.post(API_BASE, data);
export const updateArticle = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteArticle = (id) => axios.delete(`${API_BASE}/${id}`);
