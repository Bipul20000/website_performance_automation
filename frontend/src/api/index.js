import api from './axios';

// Products
export const getProducts = (category) => {
  const params = category ? { category } : {};
  return api.get('/products', { params });
};

export const getFeaturedProducts = () => api.get('/products/featured');

export const getProductBySlug = (slug) => api.get(`/products/${slug}`);

// Dealers
export const getDealers = (city) => {
  const params = city ? { city } : {};
  return api.get('/dealers', { params });
};

// News
export const getNews = () => api.get('/news');

export const getNewsBySlug = (slug) => api.get(`/news/${slug}`);

// Offers
export const getActiveOffers = () => api.get('/offers');

// Health
export const getHealth = () => api.get('/health');
