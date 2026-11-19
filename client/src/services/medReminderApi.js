import { API_BASE_URL } from '../utils/apiConfig';

const BASE_URL = API_BASE_URL; // Uses utility for local/prod switching
const API_URL = `${BASE_URL}/api`;

export const DEFAULT_MEDICINES = [
    {
        id: 'med-1',
        name: 'Amoxicillin Trihydrate',
        dosage: '500mg • 1 Capsule (Post-meal)',
        time_of_day: 'Morning',
        reminder_time: '08:00 AM',
        start_date: '2026-11-01',
        end_date: '2026-11-30'
    },
    {
        id: 'med-2',
        name: 'Vitamin D3 & Calcium',
        dosage: '1000 IU • 1 Tablet',
        time_of_day: 'Afternoon',
        reminder_time: '01:30 PM',
        start_date: '2026-10-15',
        end_date: '2026-12-31'
    },
    {
        id: 'med-3',
        name: 'Metformin HCl',
        dosage: '500mg • 1 Tablet (Dinner)',
        time_of_day: 'Night',
        reminder_time: '08:30 PM',
        start_date: '2026-09-01',
        end_date: '2026-12-31'
    },
    {
        id: 'med-4',
        name: 'Omega-3 Fish Oil',
        dosage: '1000mg • 1 Softgel',
        time_of_day: 'Night',
        reminder_time: '09:45 PM',
        start_date: '2026-11-10',
        end_date: '2026-12-15'
    },
    {
        id: 'med-5',
        name: 'Cetirizine HCl',
        dosage: '10mg • 1 Tablet (Bedtime)',
        time_of_day: 'Night',
        reminder_time: '10:15 PM',
        start_date: '2026-11-05',
        end_date: '2026-11-25'
    }
];

export const medReminderApi = {
    getDefaultMedicines() {
        const stored = localStorage.getItem('med_medicines');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) return parsed;
            } catch (e) {}
        }
        localStorage.setItem('med_medicines', JSON.stringify(DEFAULT_MEDICINES));
        return [...DEFAULT_MEDICINES];
    },

    resetDefaultMedicines() {
        localStorage.setItem('med_medicines', JSON.stringify(DEFAULT_MEDICINES));
        return [...DEFAULT_MEDICINES];
    },

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
            console.warn(`API request to ${endpoint} failed, falling back to local state:`, error.message);
            throw error;
        }
    },

    async login(username, password) {
        try {
            return await this.request('/auth/login', 'POST', { username, password });
        } catch (err) {
            return {
                access_token: 'demo-token-' + Date.now(),
                user: { username: username || 'Recruiter' }
            };
        }
    },

    async register(username, password) {
        try {
            return await this.request('/auth/register', 'POST', { username, password });
        } catch (err) {
            return { success: true };
        }
    },

    async getMedicines() {
        try {
            const data = await this.request('/medicines');
            if (Array.isArray(data) && data.length > 0) {
                localStorage.setItem('med_medicines', JSON.stringify(data));
                return data;
            }
        } catch (e) {}
        return this.getDefaultMedicines();
    },

    async addMedicine(medicine) {
        const newMed = {
            id: 'med-' + Date.now(),
            ...medicine
        };
        try {
            await this.request('/medicines', 'POST', medicine);
        } catch (e) {}
        const current = this.getDefaultMedicines();
        current.unshift(newMed);
        localStorage.setItem('med_medicines', JSON.stringify(current));
        return newMed;
    },

    async deleteMedicine(id) {
        try {
            await this.request(`/medicines/${id}`, 'DELETE');
        } catch (e) {}
        const current = this.getDefaultMedicines();
        const filtered = current.filter(m => String(m.id) !== String(id));
        localStorage.setItem('med_medicines', JSON.stringify(filtered));
        return { success: true };
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
