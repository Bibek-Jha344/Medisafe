/**
 * MEDISAFE - Shared Navbar Component
 * Inject into pages via initNavbar()
 */

function getNavbarHTML(activePage = '') {
    return `
    <nav class="navbar">
        <a href="/index.html" class="navbar-brand">
            <div class="brand-icon">🏥</div>
            MEDI<span>SAFE</span>
        </a>
        <div class="navbar-nav" id="desktop-nav">
            <a href="/index.html" class="nav-link ${activePage === 'home' ? 'active' : ''}">Home</a>
            <a href="/doctors.html" class="nav-link ${activePage === 'doctors' ? 'active' : ''}">Doctors</a>
            <a href="/physiotherapy.html" class="nav-link ${activePage === 'physio' ? 'active' : ''}">Physiotherapy</a>
            <div id="nav-auth" style="display:flex;gap:8px;align-items:center">
                <a href="/login.html" class="nav-btn btn-nav-outline">Login</a>
                <a href="/register.html" class="nav-btn btn-nav-primary">Register</a>
            </div>
            <div id="nav-user" style="display:none;gap:8px;align-items:center">
                <a href="/dashboard.html" class="nav-link ${activePage === 'dashboard' ? 'active' : ''}">Dashboard</a>
                <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#0d6efd,#20c997);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;cursor:pointer;font-size:14px" id="nav-avatar" onclick="window.location='/profile.html'">
                    <span id="nav-user-name">U</span>
                </div>
                <button onclick="logout()" class="nav-btn btn-nav-outline" style="color:#dc3545;border-color:#dc3545">Logout</button>
            </div>
        </div>
        <button class="navbar-mobile-toggle" id="mobile-toggle">☰</button>
    </nav>
    <!-- Mobile Menu Overlay -->
    <div id="mobile-nav" class="mobile-overlay" style="display:none"></div>
    `;
}

function initNavbar(activePage) {
    const placeholder = document.getElementById('navbar-placeholder');
    if (placeholder) {
        placeholder.innerHTML = getNavbarHTML(activePage);
        setupNavbar();
    }
}
