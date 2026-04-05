import { API_BASE_URL } from '../utils/apiConfig';

const BASE_URL = API_BASE_URL; // Uses utility for local/prod switching
const API_URL = `${BASE_URL}/api`;

export const medReminderApi = {
    async request(endpoint, method = 'GET', body = null) {
        const token = localStorage.getItem('med_token');
        const headers = {
            'Content-Type': 'application/json'
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const config = {
            method,
            headers
        };
        if (body) {
            config.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(`${API_URL}${endpoint}`, config);
            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('med_token');
                    window.dispatchEvent(new CustomEvent('med-auth-required'));
                }
                throw new Error(data.msg || 'Something went wrong');
            }
            return data;
        } catch (error) {
            console.error(`API Error (${endpoint}):`, error);
            throw error;
        }
    },

    login(username, password) {
        return this.request('/auth/login', 'POST', { username, password });
    },

    register(username, password) {
        return this.request('/auth/register', 'POST', { username, password });
    },

    getMedicines() {
        return this.request('/medicines');
    },

    addMedicine(medicine) {
        return this.request('/medicines', 'POST', medicine);
    },

    deleteMedicine(id) {
        return this.request(`/medicines/${id}`, 'DELETE');
    },

    getHealthProfile() {
        return this.request('/health-profile');
    },

    updateHealthProfile(profile) {
        return this.request('/health-profile', 'POST', profile);
    },

    getReminders() {
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        const timeStr = now.toTimeString().slice(0, 5);
        return this.request(`/reminders?date=${dateStr}&time=${timeStr}`);
    },

    async checkStatus() {
        try {
            const response = await fetch(`${API_BASE_URL}/`, { method: 'GET', mode: 'cors' });
            return response.ok;
        } catch (e) {
            return false;
        }
    }
};
