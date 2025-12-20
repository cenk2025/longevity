const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

const SYSTEM_PROMPT = `You are a knowledgeable and calm longevity assistant for Longevity IQ platform. Your role is to:

1. Explain longevity concepts in clear, accessible language
2. Help users understand their test results
3. Answer questions about lifestyle factors, supplements, and health optimization
4. Provide evidence-based information

Important guidelines:
- NEVER provide medical diagnoses or treatment recommendations
- Always encourage users to consult healthcare professionals for medical decisions
- Use cautious, evidence-aware language
- Acknowledge scientific uncertainty when appropriate
- Be supportive and non-alarmist
- Focus on education and lifestyle optimization
- Respect the difference between correlation and causation

Your tone should be:
- Calm and reassuring
- Intelligent and well-informed
- Supportive without being pushy
- Scientific but accessible`;

export async function sendChatMessage(message, conversationHistory = []) {
    // For now, always use mock responses to avoid CORS issues
    // TODO: Implement serverless function proxy for production API calls
    console.log('Chatbot received message:', message);
    console.log('Using mock response (CORS-safe)');
    return getMockResponse(message);

    /* Disabled until serverless proxy is implemented
    // Always use mock responses in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Using mock response in development mode');
        return getMockResponse(message);
    }

    try {
        // Check if API key is available
        if (!DEEPSEEK_API_KEY) {
            console.error('DeepSeek API key is not configured');
            return getMockResponse(message);
        }

        const messages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...conversationHistory,
            { role: 'user', content: message }
        ];

        console.log('Sending request to DeepSeek API...');

        const response = await fetch(DEEPSEEK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: messages,
                temperature: 0.7,
                max_tokens: 500
            })
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API request failed:', response.status, errorText);
            return getMockResponse(message);
        }

        const data = await response.json();
        console.log('API response received successfully');
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Chat API error:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack
        });
        
        // Fallback to mock response
        return getMockResponse(message);
    }
    */
}

// Mock responses for development/fallback
function getMockResponse(message) {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('healthspan') || lowerMessage.includes('lifespan')) {
        return "Great question! **Healthspan** refers to the period of life spent in good health, free from chronic diseases and disabilities. **Lifespan**, on the other hand, is simply the total number of years lived.\n\nThe key difference: you can have a long lifespan but a short healthspan if you spend many years with poor health. The goal of longevity science is to extend healthspan, not just lifespan—to add more healthy, vibrant years to your life.\n\nFactors that influence healthspan include sleep quality, nutrition, exercise, stress management, and cognitive engagement. Would you like to know more about any of these?";
    }

    if (lowerMessage.includes('sleep')) {
        return "Sleep is absolutely crucial for longevity and healthspan! Here's why:\n\n**Key Benefits:**\n- **Cellular repair:** During deep sleep, your body repairs DNA damage and clears metabolic waste\n- **Brain health:** Sleep consolidates memories and clears beta-amyloid (linked to Alzheimer's)\n- **Immune function:** Quality sleep strengthens your immune system\n- **Metabolic health:** Poor sleep is linked to insulin resistance and weight gain\n\n**Recommendations:**\n- Aim for 7-9 hours per night\n- Maintain consistent sleep/wake times\n- Keep your bedroom cool (65-68°F/18-20°C)\n- Avoid screens 1-2 hours before bed\n- Consider magnesium supplementation (consult your doctor)\n\nRemember, this is educational information—always consult healthcare professionals for personalized advice!";
    }

    if (lowerMessage.includes('supplement')) {
        return "I can provide information about supplements, but remember: **supplements are not magic pills**, and you should always consult a healthcare professional before starting any new supplement.\n\n**Evidence-based supplements for longevity:**\n\n**Strong Evidence:**\n- **Vitamin D:** If deficient (get blood test first)\n- **Omega-3 (EPA/DHA):** For heart and brain health\n- **Magnesium:** For sleep and muscle function\n\n**Moderate Evidence:**\n- **NAD+ precursors (NMN/NR):** Cellular energy and repair\n- **Resveratrol:** Antioxidant properties\n- **Creatine:** Muscle and cognitive function\n\n**Important:** Quality matters! Choose third-party tested brands. And remember, supplements should complement—not replace—a healthy diet.\n\nWould you like more details about any specific supplement?";
    }

    if (lowerMessage.includes('test') || lowerMessage.includes('result')) {
        return "I'd be happy to help you understand test results! However, I need more specific information:\n\n**What type of test are you asking about?**\n- Cognitive assessment?\n- Lifestyle questionnaire?\n- Specific biomarkers?\n\nPlease note: I can help explain what different metrics mean and general patterns, but I **cannot provide medical diagnoses or treatment recommendations**. For any concerning results, please consult with a qualified healthcare professional.\n\nFeel free to share more details, and I'll do my best to provide educational context!";
    }

    // Default response
    return `Thank you for your question about "${message}". \n\nI'm here to help you understand longevity concepts, lifestyle factors, and general health optimization strategies. I can discuss topics like:\n\n- Sleep, nutrition, and exercise\n- Cognitive health and brain aging\n- Evidence-based supplements\n- Stress management\n- Understanding test results\n\n**Important reminder:** I provide educational information only. I cannot diagnose conditions, prescribe treatments, or replace professional medical advice. Always consult healthcare professionals for medical decisions.\n\nCould you rephrase your question or ask about a specific longevity topic?`;
}


export function initializeChatbot() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');

    let conversationHistory = [];

    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('hidden');
    });

    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.add('hidden');
    });

    const sendMessage = async () => {
        const message = chatbotInput.value.trim();
        if (!message) return;

        // Add user message to UI
        addMessageToUI(message, 'user');
        chatbotInput.value = '';

        // Add to conversation history
        conversationHistory.push({ role: 'user', content: message });

        // Show typing indicator
        const typingIndicator = addTypingIndicator();

        try {
            // Get AI response
            const response = await sendChatMessage(message, conversationHistory);

            // Remove typing indicator
            typingIndicator.remove();

            // Add AI response to UI and history
            addMessageToUI(response, 'bot');
            conversationHistory.push({ role: 'assistant', content: response });

            // Keep conversation history manageable (last 10 messages)
            if (conversationHistory.length > 10) {
                conversationHistory = conversationHistory.slice(-10);
            }
        } catch (error) {
            typingIndicator.remove();
            addMessageToUI("I apologize, but I encountered an error. Please try again.", 'bot');
        }
    };

    chatbotSend.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function addMessageToUI(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${type}-message`;

        const messageText = document.createElement('p');
        messageText.textContent = message;
        messageDiv.appendChild(messageText);

        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        return messageDiv;
    }

    function addTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'chatbot-message bot-message typing-indicator';
        indicator.innerHTML = '<p>Typing...</p>';
        chatbotMessages.appendChild(indicator);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        return indicator;
    }
}
