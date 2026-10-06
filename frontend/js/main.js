/**
 * MEDISAFE - Global JavaScript Utilities
 * Shared across all pages
 */

const API_BASE = 'http://localhost:5000/api';

// ─── AUTH UTILITIES ──────────────────────────────
const Auth = {
    getToken: () => localStorage.getItem('medisafe_token'),
    getUser: () => {
        try { return JSON.parse(localStorage.getItem('medisafe_user') || 'null'); } catch { return null; }
    },
    setSession: (token, user) => {
        localStorage.setItem('medisafe_token', token);
        localStorage.setItem('medisafe_user', JSON.stringify(user));
    },
    clearSession: () => {
        localStorage.removeItem('medisafe_token');
        localStorage.removeItem('medisafe_user');
    },
    isLoggedIn: () => !!localStorage.getItem('medisafe_token'),
    requireAuth: () => {
        if (!Auth.isLoggedIn()) {
            window.location.href = '/login.html';
            return false;
        }
        return true;
    },
    redirectIfLoggedIn: () => {
        if (Auth.isLoggedIn()) {
            window.location.href = '/dashboard.html';
            return true;
        }
        return false;
    }
};

// ─── API UTILITIES ──────────────────────────────
const API = {
    request: async (endpoint, options = {}) => {
        const token = Auth.getToken();
        const headers = {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            ...options.headers
        };

        try {
            const response = await fetch(`${API_BASE}${endpoint}`, {
                ...options,
                headers
            });

            const data = await response.json();

            if (!response.ok) {
                throw { status: response.status, message: data.message || 'Request failed' };
            }

            return data;
        } catch (error) {
            if (error.status === 401) {
                Auth.clearSession();
                window.location.href = '/login.html';
            }
            throw error;
        }
    },

    get: (endpoint) => API.request(endpoint, { method: 'GET' }),
    post: (endpoint, body) => API.request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
    put: (endpoint, body) => API.request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
    delete: (endpoint) => API.request(endpoint, { method: 'DELETE' }),

    postForm: async (endpoint, formData) => {
        const token = Auth.getToken();
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: 'POST',
            headers: token ? { 'Authorization': `Bearer ${token}` } : {},
            body: formData
        });
        const data = await response.json();
        if (!response.ok) throw { message: data.message || 'Upload failed' };
        return data;
    }
};

// ─── TOAST NOTIFICATIONS ──────────────────────────────
const Toast = {
    container: null,

    init: () => {
        if (!Toast.container) {
            Toast.container = document.createElement('div');
            Toast.container.className = 'toast-container';
            document.body.appendChild(Toast.container);
        }
    },

    show: (message, type = 'info', duration = 3500) => {
        Toast.init();
        const icons = { success: '✓', danger: '✕', warning: '⚠', info: 'ℹ' };
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || 'ℹ'}</span>
            <span class="toast-message">${message}</span>
            <span class="toast-close" onclick="this.parentElement.remove()">×</span>
        `;
        Toast.container.appendChild(toast);
        setTimeout(() => toast.style.opacity = '0', duration - 500);
        setTimeout(() => toast.remove(), duration);
    },

    success: (msg, d) => Toast.show(msg, 'success', d),
    error: (msg, d) => Toast.show(msg, 'danger', d),
    warning: (msg, d) => Toast.show(msg, 'warning', d),
    info: (msg, d) => Toast.show(msg, 'info', d)
};

// ─── FORM UTILITIES ──────────────────────────────
const Form = {
    validate: (formEl) => {
        let valid = true;
        formEl.querySelectorAll('[required]').forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                valid = false;
            } else {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            }
        });
        return valid;
    },

    getValues: (formEl) => {
        const data = {};
        new FormData(formEl).forEach((val, key) => { data[key] = val; });
        return data;
    },

    setLoading: (btn, loading) => {
        if (loading) {
            btn.dataset.originalText = btn.innerHTML;
            btn.innerHTML = '<span class="loading-spinner" style="width:18px;height:18px;border-width:3px"></span>';
            btn.disabled = true;
        } else {
            btn.innerHTML = btn.dataset.originalText || 'Submit';
            btn.disabled = false;
        }
    },

    showError: (formEl, message) => {
        let alert = formEl.querySelector('.form-alert');
        if (!alert) {
            alert = document.createElement('div');
            alert.className = 'alert alert-danger form-alert';
            formEl.prepend(alert);
        }
        alert.innerHTML = `<i>⚠</i><span>${message}</span>`;
        alert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },

    clearErrors: (formEl) => {
        formEl.querySelectorAll('.form-alert').forEach(el => el.remove());
        formEl.querySelectorAll('.is-invalid, .is-valid').forEach(el => {
            el.classList.remove('is-invalid', 'is-valid');
        });
    }
};

// ─── DATE UTILITIES ──────────────────────────────
const DateUtils = {
    format: (dateStr, options = {}) => {
        if (!dateStr) return 'N/A';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric', month: 'short', day: 'numeric',
            ...options
        });
    },
    formatTime: (timeStr) => {
        if (!timeStr) return '';
        const [h, m] = timeStr.split(':');
        const hour = parseInt(h);
        return `${hour > 12 ? hour - 12 : hour}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
    },
    isUpcoming: (dateStr) => new Date(dateStr) > new Date(),
    isFuture: (dateStr) => {
        const d = new Date(dateStr);
        const today = new Date();
        today.setHours(0,0,0,0);
        return d >= today;
    }
};

// ─── NAVBAR SETUP ──────────────────────────────
function setupNavbar() {
    const user = Auth.getUser();
    const navAuth = document.getElementById('nav-auth');
    const navUser = document.getElementById('nav-user');

    if (navAuth && navUser) {
        if (user) {
            navAuth.style.display = 'none';
            navUser.style.display = 'flex';
            const nameEl = document.getElementById('nav-user-name');
            if (nameEl) nameEl.textContent = user.name?.split(' ')[0] || 'User';
        } else {
            navAuth.style.display = 'flex';
            navUser.style.display = 'none';
        }
    }

    // Mobile menu
    const toggle = document.getElementById('mobile-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    if (toggle && mobileNav) {
        toggle.addEventListener('click', () => {
            mobileNav.classList.toggle('open');
        });
    }
}

function logout() {
    Auth.clearSession();
    window.location.href = '/index.html';
}

// ─── STATUS BADGE HELPER ──────────────────────────────
function statusBadge(status) {
    const classes = {
        pending: 'status-pending',
        confirmed: 'status-confirmed',
        completed: 'status-completed',
        cancelled: 'status-cancelled'
    };
    return `<span class="badge ${classes[status] || 'badge-secondary'}">${status?.charAt(0).toUpperCase() + status?.slice(1)}</span>`;
}

// ─── STARS HELPER ──────────────────────────────
function renderStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    let html = '<span class="stars">';
    for (let i = 0; i < full; i++) html += '★';
    if (half) html += '½';
    for (let i = full + (half ? 1 : 0); i < 5; i++) html += '☆';
    html += '</span>';
    return html;
}

// ─── ON DOM READY ──────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    setupNavbar();
});
