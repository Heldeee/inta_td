import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const getAllProfessionals = async () => {
    const response = await axios.get(`${BASE_URL}/professionals`);
    return response.data;
};