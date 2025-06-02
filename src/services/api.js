import axios from 'axios';

const API_BASE = 'https://683dbe6b199a0039e9e6b7fe.mockapi.io/api/Discover';

// GET all articles (Discover)
export const getArticles = () => axios.get(API_BASE);

// GET an article by ID
export const getArticleById = (id) => axios.get(`${API_BASE}/${id}`);

// POST a new article
export const addArticle = (data) => axios.post(API_BASE, data);

// PUT update an article by ID
export const updateArticle = (id, data) => axios.put(`${API_BASE}/${id}`, data);

// DELETE an article by ID
export const deleteArticle = (id) => axios.delete(`${API_BASE}/${id}`);
