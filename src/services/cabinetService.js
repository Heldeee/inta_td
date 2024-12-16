import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const getAllCabinets = async () => {
    const response = await axios.get(`${BASE_URL}/cabinets`);
    return response.data;
};

export const getCabinet = async (id) => {
    const response = await axios.get(`${BASE_URL}/cabinets/${id}`);
    return response.data;
};