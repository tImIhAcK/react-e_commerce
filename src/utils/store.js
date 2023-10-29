import api from './axios';


export const fetchProduct = async () => {
	const response = await api.get('store/products/')
	return response;
};

export const fetchOneProduct = async (id) => {
	const response = await api.get(`store/products/${id}`)
	return response;
}

export const fetchCategory = async () => {
	const response = await api.get('store/categories/');
	return response
}