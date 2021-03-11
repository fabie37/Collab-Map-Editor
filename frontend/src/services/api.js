import axios from 'axios';

export const config = {
    headers: {
        'Content-Type': 'application/json',
    },
};

export const api = axios.create({
    baseURL: 'http://localhost:8000',
});
