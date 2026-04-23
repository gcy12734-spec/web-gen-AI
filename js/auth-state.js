document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Logic
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => mainNav.classList.toggle('active'));
    }

    // Auth State Logic
    const userStr = localStorage.getItem('currentUser');
    const user = userStr ? JSON.parse(userStr) : null;
    const isLoggedIn = user && user.isLoggedIn;

    document.querySelectorAll('.guest-only').forEach(el => isLoggedIn ? el.classList.add('hidden') : el.classList.remove('hidden'));
    document.querySelectorAll('.auth-required').forEach(el => isLoggedIn ? el.classList.remove('hidden') : el.classList.add('hidden'));

    const userAvatar = document.getElementById('userAvatar');
    const avatarDropdown = document.getElementById('avatarDropdown');
    
    if (userAvatar && avatarDropdown) {
        if (isLoggedIn) {
            avatarDropdown.innerHTML = `
                <div class="dropdown-text">Welcome back,<br><strong style="color:var(--text-dark);font-size:1.1rem;">${user.username}</strong></div>
                <button id="logoutBtn" class="dropdown-btn" style="background:#fee2e2; color:#ef4444;">Logout</button>
            `;
            document.getElementById('logoutBtn').addEventListener('click', () => {
                localStorage.removeItem('currentUser');
                window.location.href = 'index.html';
            });
        } else {
            avatarDropdown.innerHTML = `
                <div class="dropdown-text">Please log in to manage vehicles.</div>
                <a href="log-in.html" class="dropdown-btn btn-primary" style="color:white; background:var(--primary-color)">Log In</a>
            `;
        }

        userAvatar.addEventListener('click', (e) => {
            e.stopPropagation();
            avatarDropdown.classList.toggle('active');
        });
        document.addEventListener('click', (e) => {
            if (!userAvatar.contains(e.target) && !avatarDropdown.contains(e.target)) {
                avatarDropdown.classList.remove('active');
            }
        });
    }
});