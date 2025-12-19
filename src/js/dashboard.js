import { getCurrentUser, getTestResults, getUserProfile } from '../utils/supabase.js';
import { handleLogout } from './auth.js';
import { longevityTests } from '../utils/data.js';
import { getLanguage } from '../utils/i18n.js';

export async function renderDashboard() {
    const container = document.getElementById('dashboardContainer');
    const user = await getCurrentUser();

    if (!user) {
        container.innerHTML = '<p>Please log in to view your dashboard.</p>';
        return;
    }

    const profile = await getUserProfile(user.id);
    const testResults = await getTestResults(user.id);

    container.innerHTML = `
    <div class="dashboard">
      <div class="dashboard-header">
        <h2>Welcome, ${user.user_metadata?.full_name || 'User'}!</h2>
        <button id="logoutBtn" class="btn btn-secondary">Sign Out</button>
      </div>

      <div class="dashboard-stats">
        <div class="stat-card">
          <div class="stat-icon">📊</div>
          <div class="stat-content">
            <h3>${testResults.length}</h3>
            <p>Tests Completed</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📈</div>
          <div class="stat-content">
            <h3>${calculateAverageScore(testResults)}</h3>
            <p>Average Score</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🎯</div>
          <div class="stat-content">
            <h3>${getLastTestDate(testResults)}</h3>
            <p>Last Test</p>
          </div>
        </div>
      </div>

      <div class="dashboard-section">
        <h3>Your Test History</h3>
        <div id="testHistory" class="test-history">
          ${renderTestHistory(testResults)}
        </div>
      </div>

      <div class="dashboard-section">
        <h3>Available Tests</h3>
        <div class="available-tests">
          ${renderAvailableTests()}
        </div>
      </div>
    </div>
  `;

    // Add styles
    addDashboardStyles();

    // Attach event listeners
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    attachTestListeners();
}

function calculateAverageScore(results) {
    if (results.length === 0) return 'N/A';
    const sum = results.reduce((acc, result) => acc + (result.score || 0), 0);
    return Math.round(sum / results.length);
}

function getLastTestDate(results) {
    if (results.length === 0) return 'Never';
    const lastTest = results[0]; // Already sorted by created_at desc
    const date = new Date(lastTest.created_at);
    return date.toLocaleDateString();
}

function renderTestHistory(results) {
    if (results.length === 0) {
        return '<p style="text-align: center; color: var(--color-text-secondary);">No tests completed yet. Start your longevity journey!</p>';
    }

    return results.map(result => {
        const test = longevityTests.find(t => t.id === result.test_type);
        const testName = test ? (getLanguage() === 'fi' ? test.titleFi : test.title) : result.test_type;
        const date = new Date(result.created_at).toLocaleDateString();

        return `
      <div class="history-card">
        <div class="history-header">
          <span class="history-icon">${test?.icon || '📋'}</span>
          <div class="history-info">
            <h4>${testName}</h4>
            <p class="history-date">${date}</p>
          </div>
        </div>
        <div class="history-score">
          <span class="score-value">${result.score}</span>
          <span class="score-label">/100</span>
        </div>
      </div>
    `;
    }).join('');
}

function renderAvailableTests() {
    const lang = getLanguage();

    return longevityTests.map(test => `
    <div class="available-test-card" data-test-id="${test.id}">
      <div class="test-icon">${test.icon}</div>
      <h4>${lang === 'fi' ? test.titleFi : test.title}</h4>
      <p>${lang === 'fi' ? test.descriptionFi : test.description}</p>
      <button class="btn btn-primary start-test-btn" data-test-id="${test.id}">
        Start Test
      </button>
    </div>
  `).join('');
}

function attachTestListeners() {
    document.querySelectorAll('.start-test-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const testId = e.target.getAttribute('data-test-id');
            startTest(testId);
        });
    });
}

async function startTest(testId) {
    const test = longevityTests.find(t => t.id === testId);
    if (!test) return;

    const container = document.getElementById('dashboardContainer');
    const lang = getLanguage();

    container.innerHTML = `
    <div class="test-container">
      <div class="test-header">
        <h2>${lang === 'fi' ? test.titleFi : test.title}</h2>
        <p>${lang === 'fi' ? test.descriptionFi : test.description}</p>
      </div>
      
      <form id="testForm" class="test-form">
        ${test.questions.map((q, index) => `
          <div class="form-group">
            <label class="form-label">${index + 1}. ${q.question}</label>
            ${renderQuestionInput(q, index)}
          </div>
        `).join('')}
        
        <div class="test-actions">
          <button type="button" class="btn btn-secondary" id="cancelTest">Cancel</button>
          <button type="submit" class="btn btn-primary">Submit Test</button>
        </div>
      </form>
    </div>
  `;

    document.getElementById('cancelTest').addEventListener('click', renderDashboard);
    document.getElementById('testForm').addEventListener('submit', (e) => handleTestSubmit(e, test));
}

function renderQuestionInput(question, index) {
    if (question.type === 'number') {
        return `
      <input 
        type="number" 
        name="q${index}" 
        class="form-input" 
        min="${question.min || 0}" 
        max="${question.max || 100}" 
        required
      >
    `;
    } else if (question.type === 'select') {
        return `
      <select name="q${index}" class="form-input" required>
        <option value="">Select an option</option>
        ${question.options.map((opt, i) => `<option value="${i}">${opt}</option>`).join('')}
      </select>
    `;
    }
    return '<input type="text" name="q${index}" class="form-input" required>';
}

async function handleTestSubmit(e, test) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const answers = {};

    test.questions.forEach((q, index) => {
        answers[q.id] = formData.get(`q${index}`);
    });

    // Calculate score (simplified algorithm)
    const score = calculateTestScore(test, answers);

    // Save to database
    const user = await getCurrentUser();
    if (user) {
        const { saveTestResult } = await import('../utils/supabase.js');
        await saveTestResult(user.id, test.id, score, answers);
    }

    // Show results
    showTestResults(test, score, answers);
}

function calculateTestScore(test, answers) {
    // Simplified scoring algorithm
    let totalScore = 0;
    const questionCount = test.questions.length;

    test.questions.forEach(q => {
        const answer = parseFloat(answers[q.id]);

        if (q.type === 'number') {
            // Normalize to 0-100 scale
            const range = (q.max - q.min) || 1;
            const normalized = ((answer - q.min) / range) * 100;

            // Some questions are inverse (e.g., stress level - lower is better)
            if (q.id.includes('stress') || q.id.includes('sitting')) {
                totalScore += (100 - normalized);
            } else {
                totalScore += normalized;
            }
        } else if (q.type === 'select') {
            // Assume options are ordered from worst to best
            const optionCount = q.options.length;
            totalScore += (answer / (optionCount - 1)) * 100;
        }
    });

    return Math.round(totalScore / questionCount);
}

function showTestResults(test, score, answers) {
    const container = document.getElementById('dashboardContainer');
    const lang = getLanguage();

    let interpretation = '';
    if (score >= 80) {
        interpretation = 'Excellent! You\'re doing great in this area.';
    } else if (score >= 60) {
        interpretation = 'Good progress! There\'s room for improvement.';
    } else if (score >= 40) {
        interpretation = 'Fair. Consider focusing on this area for better longevity outcomes.';
    } else {
        interpretation = 'This area needs attention. Small changes can make a big difference.';
    }

    container.innerHTML = `
    <div class="test-results">
      <div class="results-header">
        <div class="results-icon">${test.icon}</div>
        <h2>${lang === 'fi' ? test.titleFi : test.title}</h2>
      </div>
      
      <div class="score-display">
        <div class="score-circle">
          <span class="score-number">${score}</span>
          <span class="score-max">/100</span>
        </div>
        <p class="score-interpretation">${interpretation}</p>
      </div>

      <div class="results-disclaimer">
        <p>⚠️ This assessment is educational and does not replace medical advice. Consult healthcare professionals for medical decisions.</p>
      </div>

      <div class="results-actions">
        <button class="btn btn-primary" id="backToDashboard">Back to Dashboard</button>
        <button class="btn btn-secondary" id="retakeTest">Retake Test</button>
      </div>
    </div>
  `;

    document.getElementById('backToDashboard').addEventListener('click', renderDashboard);
    document.getElementById('retakeTest').addEventListener('click', () => startTest(test.id));
}

function addDashboardStyles() {
    const style = document.createElement('style');
    style.textContent = `
    .dashboard {
      padding: 2rem 0;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .dashboard-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .stat-card {
      background: rgba(255, 255, 255, 0.05);
      padding: 1.5rem;
      border-radius: 1rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .stat-icon {
      font-size: 2.5rem;
    }

    .stat-content h3 {
      font-size: 2rem;
      margin: 0;
      color: var(--color-teal);
    }

    .stat-content p {
      margin: 0;
      color: var(--color-text-secondary);
      font-size: 0.9rem;
    }

    .dashboard-section {
      margin-bottom: 3rem;
    }

    .dashboard-section h3 {
      margin-bottom: 1.5rem;
      color: var(--color-text-primary);
    }

    .test-history {
      display: grid;
      gap: 1rem;
    }

    .history-card {
      background: rgba(255, 255, 255, 0.05);
      padding: 1.5rem;
      border-radius: 1rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .history-header {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .history-icon {
      font-size: 2rem;
    }

    .history-info h4 {
      margin: 0;
      color: var(--color-text-primary);
    }

    .history-date {
      margin: 0;
      font-size: 0.875rem;
      color: var(--color-text-muted);
    }

    .history-score {
      display: flex;
      align-items: baseline;
      gap: 0.25rem;
    }

    .score-value {
      font-size: 2rem;
      font-weight: bold;
      color: var(--color-teal);
    }

    .score-label {
      color: var(--color-text-secondary);
    }

    .available-tests {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .available-test-card {
      background: rgba(255, 255, 255, 0.05);
      padding: 1.5rem;
      border-radius: 1rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      text-align: center;
    }

    .test-container {
      max-width: 700px;
      margin: 0 auto;
    }

    .test-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .test-form {
      background: rgba(255, 255, 255, 0.05);
      padding: 2rem;
      border-radius: 1rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .test-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 2rem;
    }

    .test-results {
      max-width: 600px;
      margin: 0 auto;
      text-align: center;
    }

    .results-header {
      margin-bottom: 2rem;
    }

    .results-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .score-display {
      margin: 3rem 0;
    }

    .score-circle {
      width: 200px;
      height: 200px;
      margin: 0 auto 1.5rem;
      border-radius: 50%;
      background: var(--gradient-primary);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow-glow);
    }

    .score-number {
      font-size: 4rem;
      font-weight: bold;
      color: white;
    }

    .score-max {
      font-size: 1.5rem;
      color: rgba(255, 255, 255, 0.8);
    }

    .score-interpretation {
      font-size: 1.25rem;
      color: var(--color-text-secondary);
    }

    .results-disclaimer {
      background: rgba(255, 193, 7, 0.1);
      border-left: 4px solid #ffc107;
      padding: 1rem;
      border-radius: 0.5rem;
      margin: 2rem 0;
    }

    .results-disclaimer p {
      margin: 0;
      color: #ffc107;
      text-align: left;
    }

    .results-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 2rem;
    }
  `;
    document.head.appendChild(style);
}
