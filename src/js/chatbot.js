const DEEPSEEK_API_KEY = 'sk-5fba3c36074349d3a2715d6e5860cd89';
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
    try {
        const messages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...conversationHistory,
            { role: 'user', content: message }
        ];

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

        if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Chat API error:', error);
        return "I apologize, but I'm having trouble connecting right now. Please try again in a moment.";
    }
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
