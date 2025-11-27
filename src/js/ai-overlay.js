// AI Site Editor Overlay
(function() {
    'use strict';

    // Create the floating AI button
    function createAIButton() {
        const button = document.createElement('button');
        button.id = 'ai-site-editor-button';
        button.className = 'ai-floating-button';
        button.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
            </svg>
            <span>AI Editor</span>
        `;
        button.setAttribute('aria-label', 'Open AI Site Editor');
        button.onclick = toggleOverlay;
        document.body.appendChild(button);
    }

    // Create the overlay modal
    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'ai-site-editor-overlay';
        overlay.className = 'ai-overlay';
        overlay.innerHTML = `
            <div class="ai-overlay-content">
                <div class="ai-overlay-header">
                    <h2>AI Site Editor</h2>
                    <button class="ai-close-button" onclick="window.AISiteEditor.close()" aria-label="Close">×</button>
                </div>

                <div class="ai-overlay-body">
                    <div class="ai-context-info">
                        <p><strong>Current Page:</strong> <span id="ai-current-page">${window.location.pathname}</span></p>
                        <p class="ai-help-text">Tell me what you want to change. I can update content, add sections, modify layouts, and more!</p>
                    </div>

                    <div class="ai-chat-container" id="ai-chat-container">
                        <!-- Messages will appear here -->
                    </div>

                    <div class="ai-input-container">
                        <textarea
                            id="ai-input"
                            placeholder="E.g., 'Add a stats section to the basketball page' or 'Update my GPA in the academics section'"
                            rows="3"
                        ></textarea>
                        <button id="ai-submit-button" class="ai-submit-button">
                            <span class="ai-submit-text">Send</span>
                            <span class="ai-submit-loading" style="display: none;">
                                <span class="ai-spinner"></span> Processing...
                            </span>
                        </button>
                    </div>

                    <div class="ai-examples">
                        <p><strong>Example requests:</strong></p>
                        <div class="ai-example-buttons">
                            <button class="ai-example-btn" data-example="Add a highlights section to the homepage">Add highlights section</button>
                            <button class="ai-example-btn" data-example="Update my latest game stats">Update game stats</button>
                            <button class="ai-example-btn" data-example="Add a new timeline entry for this season">Add timeline entry</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        // Add event listeners
        setupEventListeners();
    }

    function setupEventListeners() {
        const input = document.getElementById('ai-input');
        const submitButton = document.getElementById('ai-submit-button');

        // Submit on button click
        submitButton.addEventListener('click', handleSubmit);

        // Submit on Ctrl/Cmd + Enter
        input.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                handleSubmit();
            }
        });

        // Example buttons
        document.querySelectorAll('.ai-example-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                input.value = e.target.dataset.example;
                input.focus();
            });
        });

        // Close on overlay background click
        document.getElementById('ai-site-editor-overlay').addEventListener('click', (e) => {
            if (e.target.id === 'ai-site-editor-overlay') {
                closeOverlay();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.getElementById('ai-site-editor-overlay').classList.contains('active')) {
                closeOverlay();
            }
        });
    }

    async function handleSubmit() {
        const input = document.getElementById('ai-input');
        const message = input.value.trim();

        if (!message) return;

        // Add user message to chat
        addMessage(message, 'user');

        // Clear input
        input.value = '';

        // Show loading state
        setLoading(true);

        try {
            // Get current page context
            const pageContext = gatherPageContext();

            // Call the AI API
            const response = await fetch('/.netlify/functions/ai-site-editor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    context: pageContext
                })
            });

            const data = await response.json();

            if (data.success) {
                addMessage(data.message, 'assistant', data.details);

                // If changes were made, show a reload prompt
                if (data.changesApplied) {
                    showReloadPrompt(data.deployUrl);
                }
            } else {
                addMessage(`Error: ${data.error || 'Something went wrong'}`, 'error');
            }
        } catch (error) {
            console.error('AI Editor Error:', error);
            addMessage(`Error: ${error.message}`, 'error');
        } finally {
            setLoading(false);
        }
    }

    function gatherPageContext() {
        return {
            url: window.location.pathname,
            title: document.title,
            pageType: detectPageType(),
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            // Get main content (simplified)
            mainContent: document.querySelector('main')?.innerText.substring(0, 500) || ''
        };
    }

    function detectPageType() {
        const path = window.location.pathname;
        if (path === '/' || path === '/index.html') return 'home';
        if (path.includes('basketball')) return 'basketball';
        if (path.includes('academics')) return 'academics';
        if (path.includes('character')) return 'character';
        if (path.includes('projects')) return 'projects';
        if (path.includes('media')) return 'media';
        if (path.includes('contact')) return 'contact';
        if (path.includes('updates')) return 'updates';
        return 'other';
    }

    function addMessage(content, type, details) {
        const chatContainer = document.getElementById('ai-chat-container');
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ai-message-${type}`;

        let messageHTML = `<div class="ai-message-content">${escapeHtml(content)}</div>`;

        if (details) {
            messageHTML += `<div class="ai-message-details">${escapeHtml(JSON.stringify(details, null, 2))}</div>`;
        }

        messageDiv.innerHTML = messageHTML;
        chatContainer.appendChild(messageDiv);

        // Scroll to bottom
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function showReloadPrompt(deployUrl) {
        const promptDiv = document.createElement('div');
        promptDiv.className = 'ai-reload-prompt';
        promptDiv.innerHTML = `
            <p><strong>Changes deployed!</strong></p>
            <p>Your site is being rebuilt. Reload in a minute to see changes.</p>
            ${deployUrl ? `<a href="${deployUrl}" target="_blank">View Deploy Status</a>` : ''}
            <button onclick="location.reload()">Reload Now</button>
        `;

        const chatContainer = document.getElementById('ai-chat-container');
        chatContainer.appendChild(promptDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function setLoading(isLoading) {
        const button = document.getElementById('ai-submit-button');
        const input = document.getElementById('ai-input');

        if (isLoading) {
            button.disabled = true;
            input.disabled = true;
            button.querySelector('.ai-submit-text').style.display = 'none';
            button.querySelector('.ai-submit-loading').style.display = 'inline-flex';
        } else {
            button.disabled = false;
            input.disabled = false;
            button.querySelector('.ai-submit-text').style.display = 'inline';
            button.querySelector('.ai-submit-loading').style.display = 'none';
        }
    }

    function toggleOverlay() {
        const overlay = document.getElementById('ai-site-editor-overlay');
        if (overlay.classList.contains('active')) {
            closeOverlay();
        } else {
            openOverlay();
        }
    }

    function openOverlay() {
        const overlay = document.getElementById('ai-site-editor-overlay');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus on input
        setTimeout(() => {
            document.getElementById('ai-input').focus();
        }, 100);
    }

    function closeOverlay() {
        const overlay = document.getElementById('ai-site-editor-overlay');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Initialize when DOM is ready
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                createAIButton();
                createOverlay();
            });
        } else {
            createAIButton();
            createOverlay();
        }
    }

    // Expose public API
    window.AISiteEditor = {
        open: openOverlay,
        close: closeOverlay,
        toggle: toggleOverlay
    };

    // Auto-initialize
    init();
})();
