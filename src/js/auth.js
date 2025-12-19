import { signUp, signIn, signOut, getCurrentUser } from '../utils/supabase.js';

export function initializeAuth() {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const authModal = document.getElementById('authModal');
    const closeAuthModal = document.getElementById('closeAuthModal');
    const authContainer = document.getElementById('authContainer');

    loginBtn.addEventListener('click', () => showAuthModal('login'));
    signupBtn.addEventListener('click', () => showAuthModal('signup'));
    closeAuthModal.addEventListener('click', () => authModal.classList.add('hidden'));

    // Check if user is already logged in
    checkAuthStatus();

    function showAuthModal(mode) {
        authContainer.innerHTML = mode === 'login' ? renderLoginForm() : renderSignupForm();
        authModal.classList.remove('hidden');
        attachFormListeners(mode);
    }

    function renderLoginForm() {
        return `
      <h2 style="margin-bottom: 1.5rem; text-align: center;">Sign In to Longevity IQ</h2>
      <form id="loginForm">
        <div class="form-group">
          <label class="form-label" for="loginEmail">Email</label>
          <input type="email" id="loginEmail" class="form-input" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="loginPassword">Password</label>
          <input type="password" id="loginPassword" class="form-input" required>
        </div>
        <div id="loginError" class="form-error" style="display: none;"></div>
        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Sign In</button>
      </form>
      <p style="text-align: center; margin-top: 1rem; color: var(--color-text-secondary);">
        Don't have an account? <a href="#" id="switchToSignup" style="color: var(--color-teal);">Sign up</a>
      </p>
    `;
    }

    function renderSignupForm() {
        return `
      <h2 style="margin-bottom: 1.5rem; text-align: center;">Create Your Longevity Profile</h2>
      <form id="signupForm">
        <div class="form-group">
          <label class="form-label" for="signupName">Full Name</label>
          <input type="text" id="signupName" class="form-input" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="signupEmail">Email</label>
          <input type="email" id="signupEmail" class="form-input" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="signupPassword">Password</label>
          <input type="password" id="signupPassword" class="form-input" required minlength="6">
        </div>
        <div id="signupError" class="form-error" style="display: none;"></div>
        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Create Account</button>
      </form>
      <p style="text-align: center; margin-top: 1rem; color: var(--color-text-secondary);">
        Already have an account? <a href="#" id="switchToLogin" style="color: var(--color-teal);">Sign in</a>
      </p>
    `;
    }

    function attachFormListeners(mode) {
        if (mode === 'login') {
            const form = document.getElementById('loginForm');
            const switchBtn = document.getElementById('switchToSignup');

            form.addEventListener('submit', handleLogin);
            switchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showAuthModal('signup');
            });
        } else {
            const form = document.getElementById('signupForm');
            const switchBtn = document.getElementById('switchToLogin');

            form.addEventListener('submit', handleSignup);
            switchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showAuthModal('login');
            });
        }
    }

    async function handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const errorDiv = document.getElementById('loginError');

        try {
            await signIn(email, password);
            authModal.classList.add('hidden');
            updateUIForLoggedInUser();
            showNotification('Welcome back!', 'success');
        } catch (error) {
            errorDiv.textContent = error.message;
            errorDiv.style.display = 'block';
        }
    }

    async function handleSignup(e) {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const errorDiv = document.getElementById('signupError');

        try {
            await signUp(email, password, name);
            authModal.classList.add('hidden');
            showNotification('Account created! Please check your email to verify.', 'success');
            updateUIForLoggedInUser();
        } catch (error) {
            errorDiv.textContent = error.message;
            errorDiv.style.display = 'block';
        }
    }

    async function checkAuthStatus() {
        const user = await getCurrentUser();
        if (user) {
            updateUIForLoggedInUser();
        }
    }

    function updateUIForLoggedInUser() {
        loginBtn.style.display = 'none';
        signupBtn.textContent = 'Dashboard';
        signupBtn.onclick = () => {
            window.location.hash = '#dashboard';
            showDashboard();
        };
    }
}

export async function handleLogout() {
    try {
        await signOut();
        location.reload();
    } catch (error) {
        console.error('Logout error:', error);
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.9)'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showDashboard() {
    const dashboardModal = document.getElementById('dashboardModal');
    dashboardModal.classList.remove('hidden');

    // Dashboard will be rendered by dashboard.js
    import('./dashboard.js').then(module => {
        module.renderDashboard();
    });
}
