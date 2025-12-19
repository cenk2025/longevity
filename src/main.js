import { longevityTests, supplements, guides } from './utils/data.js';
import { setLanguage, getLanguage } from './utils/i18n.js';
import { initializeAuth } from './js/auth.js';
import { initializeChatbot } from './js/chatbot.js';
import { renderDashboard } from './js/dashboard.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeNavbar();
    initializeLanguageToggle();
    renderTests();
    renderSupplements();
    renderGuides();
    initializeAuth();
    initializeChatbot();
    initializeCTAButtons();
    initializeHashNavigation();
});

function initializeNavbar() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function initializeLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    let currentLang = 'en';

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'fi' : 'en';
        langToggle.textContent = currentLang.toUpperCase();
        setLanguage(currentLang);

        // Re-render dynamic content
        renderTests();
        renderSupplements();
        renderGuides();
    });
}

function renderTests() {
    const testsGrid = document.getElementById('testsGrid');
    const lang = getLanguage();

    testsGrid.innerHTML = longevityTests.map(test => `
    <div class="test-card" data-test-id="${test.id}">
      <div class="test-icon">${test.icon}</div>
      <h3>${lang === 'fi' ? test.titleFi : test.title}</h3>
      <p>${lang === 'fi' ? test.descriptionFi : test.description}</p>
      <span class="test-duration">${test.duration}</span>
    </div>
  `).join('');

    // Add click listeners to test cards
    document.querySelectorAll('.test-card').forEach(card => {
        card.addEventListener('click', () => {
            const testId = card.getAttribute('data-test-id');
            handleTestClick(testId);
        });
    });
}

function renderSupplements() {
    const supplementsGrid = document.getElementById('supplementsGrid');
    const lang = getLanguage();

    supplementsGrid.innerHTML = supplements.map(supplement => {
        const evidenceClass = `evidence-${supplement.evidence}`;
        const evidenceText = supplement.evidence.charAt(0).toUpperCase() + supplement.evidence.slice(1);

        return `
      <div class="supplement-card">
        <div class="supplement-header">
          <h3>${lang === 'fi' ? supplement.titleFi : supplement.title}</h3>
          <span class="evidence-badge ${evidenceClass}">${evidenceText}</span>
        </div>
        <p class="supplement-category">${lang === 'fi' ? supplement.categoryFi : supplement.category}</p>
        <p>${lang === 'fi' ? supplement.descriptionFi : supplement.description}</p>
        <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
          <p style="font-size: 0.875rem;"><strong>Timing:</strong> ${lang === 'fi' ? supplement.timingFi : supplement.timing}</p>
          <p style="font-size: 0.875rem; color: var(--color-text-muted);">${supplement.safety}</p>
        </div>
      </div>
    `;
    }).join('');
}

function renderGuides() {
    const guidesGrid = document.getElementById('guidesGrid');
    const lang = getLanguage();

    guidesGrid.innerHTML = guides.map(guide => `
    <div class="guide-card" data-guide-id="${guide.id}">
      <h3>${lang === 'fi' ? guide.titleFi : guide.title}</h3>
      <p>${lang === 'fi' ? guide.summaryFi : guide.summary}</p>
      <span class="read-more">Read more →</span>
    </div>
  `).join('');

    // Add click listeners
    document.querySelectorAll('.guide-card').forEach(card => {
        card.addEventListener('click', () => {
            const guideId = card.getAttribute('data-guide-id');
            showGuideModal(guideId);
        });
    });
}

function handleTestClick(testId) {
    // Check if user is logged in
    import('./utils/supabase.js').then(({ getCurrentUser }) => {
        getCurrentUser().then(user => {
            if (user) {
                // User is logged in, show dashboard and start test
                const dashboardModal = document.getElementById('dashboardModal');
                dashboardModal.classList.remove('hidden');
                renderDashboard();
            } else {
                // User not logged in, show auth modal
                document.getElementById('signupBtn').click();
            }
        });
    });
}

function showGuideModal(guideId) {
    const guide = guides.find(g => g.id === guideId);
    if (!guide) return;

    const lang = getLanguage();
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
    <div class="modal-content modal-large">
      <button class="modal-close" id="closeGuideModal">×</button>
      <h2>${lang === 'fi' ? guide.titleFi : guide.title}</h2>
      <p style="color: var(--color-text-secondary); margin-bottom: 2rem;">${lang === 'fi' ? guide.summaryFi : guide.summary}</p>
      <div style="line-height: 1.8;">
        <p>${guide.content}</p>
        <p style="margin-top: 2rem; padding: 1rem; background: rgba(255,255,255,0.05); border-radius: 0.5rem; font-style: italic;">
          This is educational content. For personalized advice, consult healthcare professionals.
        </p>
      </div>
    </div>
  `;

    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.id === 'closeGuideModal') {
            modal.remove();
        }
    });
}

function initializeCTAButtons() {
    const createProfileBtn = document.getElementById('createProfileBtn');
    const exploreTestsBtn = document.getElementById('exploreTestsBtn');

    createProfileBtn.addEventListener('click', () => {
        document.getElementById('signupBtn').click();
    });

    exploreTestsBtn.addEventListener('click', () => {
        document.querySelector('#tests').scrollIntoView({ behavior: 'smooth' });
    });
}

function initializeHashNavigation() {
    // Handle dashboard navigation from hash
    if (window.location.hash === '#dashboard') {
        import('./utils/supabase.js').then(({ getCurrentUser }) => {
            getCurrentUser().then(user => {
                if (user) {
                    const dashboardModal = document.getElementById('dashboardModal');
                    dashboardModal.classList.remove('hidden');
                    renderDashboard();
                }
            });
        });
    }

    // Close dashboard modal
    document.getElementById('closeDashboardModal').addEventListener('click', () => {
        document.getElementById('dashboardModal').classList.add('hidden');
        window.location.hash = '';
    });
}

// Add placeholder video if not exists
window.addEventListener('load', () => {
    const video = document.querySelector('.hero-video');
    if (video) {
        video.addEventListener('error', () => {
            // If video fails to load, hide it and show gradient background
            video.style.display = 'none';
            document.querySelector('.hero').style.background = 'var(--gradient-dark)';
        });
    }
});
