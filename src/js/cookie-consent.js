// Cookie Consent Management
// Compliant with Finnish ePrivacy Directive and GDPR

const COOKIE_CONSENT_KEY = 'longevity-iq-cookie-consent';
const COOKIE_CONSENT_VERSION = '1.0';

export function initCookieConsent() {
    // Check if user has already made a choice
    const consent = getCookieConsent();

    if (!consent || consent.version !== COOKIE_CONSENT_VERSION) {
        showCookieConsent();
    } else {
        applyCookiePreferences(consent);
    }
}

export function showCookieConsent() {
    // Remove existing banner if any
    const existingBanner = document.getElementById('cookie-consent-banner');
    if (existingBanner) {
        existingBanner.remove();
    }

    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.innerHTML = `
        <div class="cookie-consent-overlay"></div>
        <div class="cookie-consent-modal">
            <div class="cookie-consent-header">
                <h2>🍪 Evästeasetukset / Cookie Settings</h2>
            </div>
            
            <div class="cookie-consent-body">
                <p class="cookie-consent-intro">
                    Käytämme evästeitä parantaaksemme käyttökokemustasi ja analysoidaksemme sivuston käyttöä Suomen ja EU:n tietosuojalainsäädännön mukaisesti.
                </p>
                <p class="cookie-consent-intro-en">
                    We use cookies to improve your experience and analyze site usage in accordance with Finnish and EU data protection laws.
                </p>

                <div class="cookie-consent-options">
                    <div class="cookie-option">
                        <div class="cookie-option-header">
                            <input type="checkbox" id="cookie-essential" checked disabled>
                            <label for="cookie-essential">
                                <strong>Välttämättömät evästeet / Essential Cookies</strong>
                            </label>
                        </div>
                        <p class="cookie-option-description">
                            Nämä evästeet ovat välttämättömiä sivuston toiminnalle (kirjautuminen, istunnon hallinta).
                            These cookies are necessary for the website to function (authentication, session management).
                        </p>
                    </div>

                    <div class="cookie-option">
                        <div class="cookie-option-header">
                            <input type="checkbox" id="cookie-functional" checked>
                            <label for="cookie-functional">
                                <strong>Toiminnalliset evästeet / Functional Cookies</strong>
                            </label>
                        </div>
                        <p class="cookie-option-description">
                            Muistavat asetuksesi ja mieltymyksesi (teema, kieli).
                            Remember your settings and preferences (theme, language).
                        </p>
                    </div>

                    <div class="cookie-option">
                        <div class="cookie-option-header">
                            <input type="checkbox" id="cookie-analytics" checked>
                            <label for="cookie-analytics">
                                <strong>Analytiikkaevästeet / Analytics Cookies</strong>
                            </label>
                        </div>
                        <p class="cookie-option-description">
                            Auttavat meitä ymmärtämään, miten käytät sivustoa (anonyymi data).
                            Help us understand how you use the site (anonymous data).
                        </p>
                    </div>
                </div>

                <div class="cookie-consent-links">
                    <a href="/privacy-policy.html" target="_blank">Tietosuojaseloste / Privacy Policy</a>
                    <a href="/cookie-policy.html" target="_blank">Evästekäytäntö / Cookie Policy</a>
                </div>
            </div>

            <div class="cookie-consent-footer">
                <button class="btn-cookie btn-cookie-reject" id="cookie-reject">
                    Hylkää valinnaiset / Reject Optional
                </button>
                <button class="btn-cookie btn-cookie-customize" id="cookie-customize">
                    Muokkaa / Customize
                </button>
                <button class="btn-cookie btn-cookie-accept" id="cookie-accept">
                    Hyväksy kaikki / Accept All
                </button>
            </div>
        </div>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .cookie-consent-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(4px);
            z-index: 9998;
            animation: fadeIn 0.3s ease;
        }

        .cookie-consent-modal {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            border-radius: 1rem 1rem 0 0;
            box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.3);
            z-index: 9999;
            max-width: 800px;
            margin: 0 auto;
            animation: slideUp 0.3s ease;
        }

        @media (min-width: 768px) {
            .cookie-consent-modal {
                bottom: 2rem;
                left: 2rem;
                right: auto;
                border-radius: 1rem;
                max-width: 500px;
            }
        }

        .cookie-consent-header {
            padding: 1.5rem;
            border-bottom: 2px solid var(--color-teal);
        }

        .cookie-consent-header h2 {
            margin: 0;
            color: var(--color-teal);
            font-size: 1.5rem;
        }

        .cookie-consent-body {
            padding: 1.5rem;
            max-height: 60vh;
            overflow-y: auto;
        }

        .cookie-consent-intro,
        .cookie-consent-intro-en {
            margin-bottom: 1rem;
            line-height: 1.6;
            color: var(--color-text-primary);
        }

        .cookie-consent-intro-en {
            font-size: 0.9rem;
            color: var(--color-text-secondary);
        }

        .cookie-consent-options {
            margin: 1.5rem 0;
        }

        .cookie-option {
            margin-bottom: 1.5rem;
            padding: 1rem;
            background: rgba(34, 211, 238, 0.05);
            border-radius: 0.5rem;
            border-left: 3px solid var(--color-teal);
        }

        .cookie-option-header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 0.5rem;
        }

        .cookie-option-header input[type="checkbox"] {
            width: 20px;
            height: 20px;
            cursor: pointer;
        }

        .cookie-option-header input[type="checkbox"]:disabled {
            cursor: not-allowed;
            opacity: 0.6;
        }

        .cookie-option-header label {
            cursor: pointer;
            flex: 1;
            color: var(--color-text-primary);
        }

        .cookie-option-description {
            margin: 0;
            padding-left: 2.5rem;
            font-size: 0.9rem;
            line-height: 1.5;
            color: var(--color-text-secondary);
        }

        .cookie-consent-links {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        .cookie-consent-links a {
            color: var(--color-teal);
            text-decoration: none;
            font-size: 0.9rem;
            transition: color 0.3s ease;
        }

        .cookie-consent-links a:hover {
            color: var(--color-purple);
            text-decoration: underline;
        }

        .cookie-consent-footer {
            padding: 1.5rem;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            display: flex;
            gap: 0.75rem;
            flex-wrap: wrap;
            justify-content: flex-end;
        }

        .btn-cookie {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 0.5rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.9rem;
        }

        .btn-cookie-reject {
            background: #e5e7eb;
            color: #374151;
        }

        .btn-cookie-reject:hover {
            background: #d1d5db;
        }

        .btn-cookie-customize {
            background: white;
            color: var(--color-teal);
            border: 2px solid var(--color-teal);
        }

        .btn-cookie-customize:hover {
            background: var(--color-teal);
            color: white;
        }

        .btn-cookie-accept {
            background: var(--color-teal);
            color: white;
        }

        .btn-cookie-accept:hover {
            background: var(--color-purple);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
        }

        @media (max-width: 767px) {
            .cookie-consent-footer {
                flex-direction: column;
            }

            .btn-cookie {
                width: 100%;
            }
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(banner);

    // Add event listeners
    document.getElementById('cookie-accept').addEventListener('click', () => {
        saveCookieConsent({
            essential: true,
            functional: true,
            analytics: true
        });
        hideCookieBanner();
    });

    document.getElementById('cookie-reject').addEventListener('click', () => {
        saveCookieConsent({
            essential: true,
            functional: false,
            analytics: false
        });
        hideCookieBanner();
    });

    document.getElementById('cookie-customize').addEventListener('click', () => {
        const functional = document.getElementById('cookie-functional').checked;
        const analytics = document.getElementById('cookie-analytics').checked;

        saveCookieConsent({
            essential: true,
            functional,
            analytics
        });
        hideCookieBanner();
    });
}

function hideCookieBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
        banner.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => banner.remove(), 300);
    }
}

function saveCookieConsent(preferences) {
    const consent = {
        version: COOKIE_CONSENT_VERSION,
        timestamp: new Date().toISOString(),
        preferences
    };

    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    applyCookiePreferences(consent);
}

function getCookieConsent() {
    try {
        const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.error('Error reading cookie consent:', error);
        return null;
    }
}

function applyCookiePreferences(consent) {
    const { preferences } = consent;

    // Essential cookies are always enabled
    // They are necessary for authentication and basic functionality

    // Functional cookies
    if (!preferences.functional) {
        // Clear functional cookies
        localStorage.removeItem('user-preferences');
        localStorage.removeItem('theme-mode');
    }

    // Analytics cookies
    if (!preferences.analytics) {
        // Disable analytics
        window['ga-disable'] = true;
        // Clear analytics cookies
        document.cookie.split(";").forEach(function (c) {
            if (c.trim().startsWith('_analytics')) {
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            }
        });
    } else {
        // Enable analytics if consented
        initAnalytics();
    }

    // Dispatch event for other scripts to listen to
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', {
        detail: preferences
    }));
}

function initAnalytics() {
    // Initialize analytics only if user has consented
    // This would be where you'd initialize Google Analytics, etc.
    console.log('Analytics initialized with user consent');
}

// Make showCookieConsent available globally for the "Manage Preferences" button
window.showCookieConsent = showCookieConsent;

// Auto-initialize when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieConsent);
} else {
    initCookieConsent();
}

// Add fadeOut animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(fadeOutStyle);
