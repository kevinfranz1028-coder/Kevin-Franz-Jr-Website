/**
 * Enhanced Claude AI Widget for Netlify CMS
 *
 * This custom widget adds AI-powered content generation AND site editing capabilities
 * to the Netlify CMS interface using Claude API.
 */

// Widget Control Component
const ClaudeControl = window.createClass({
  getInitialState() {
    return {
      isOpen: false,
      message: '',
      isLoading: false,
      chatHistory: [],
      error: null,
      mode: 'content', // 'content' or 'site-editor'
      uploadQueue: []
    };
  },

  componentDidMount() {
    // Get initial field value if it exists
    const value = this.props.value;
    if (value) {
      this.setState({
        chatHistory: [{
          role: 'system',
          content: 'Current content loaded. Ask me to modify or regenerate it!'
        }]
      });
    }
  },

  toggleWidget() {
    this.setState({ isOpen: !this.state.isOpen });
  },

  switchMode(mode) {
    this.setState({
      mode: mode,
      chatHistory: [...this.state.chatHistory, {
        role: 'system',
        content: mode === 'content'
          ? 'Switched to Content Generation mode. I\'ll help you create content for this field.'
          : 'Switched to Site Editor mode. I can now edit any part of your website, not just this field!'
      }]
    });
  },

  handleMessageChange(e) {
    this.setState({ message: e.target.value });
  },

  async sendMessage(e) {
    e.preventDefault();

    const { message, chatHistory, mode } = this.state;
    if (!message.trim()) return;

    // Add user message to chat
    const newHistory = [
      ...chatHistory,
      { role: 'user', content: message }
    ];

    this.setState({
      isLoading: true,
      message: '',
      chatHistory: newHistory,
      error: null
    });

    try {
      if (mode === 'site-editor') {
        // Site Editor Mode - Make changes across the entire site
        await this.handleSiteEditorRequest(message, newHistory);
      } else {
        // Content Generation Mode - Generate content for this field only
        await this.handleContentGenerationRequest(message, newHistory);
      }
    } catch (error) {
      console.error('Error calling Claude API:', error);
      this.setState({
        isLoading: false,
        error: error.message,
        chatHistory: [
          ...newHistory,
          {
            role: 'error',
            content: `Error: ${error.message}`
          }
        ]
      });
    }
  },

  async handleContentGenerationRequest(message, newHistory) {
    // Get context from the current entry
    const entry = this.props.entry;
    const contentType = this.getContentType();
    const context = this.buildContext(entry);

    // Call Netlify Function for content generation
    const response = await fetch('/functions/claude-ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        contentType: contentType,
        context: context
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    // Add AI response to chat
    const assistantMessage = {
      role: 'assistant',
      content: data.rawResponse || JSON.stringify(data.data, null, 2),
      data: data.data
    };

    this.setState({
      isLoading: false,
      chatHistory: [...newHistory, assistantMessage]
    });

    // If the response contains structured content, offer to apply it
    if (data.data && data.data.content) {
      this.offerToApplyContent(data.data.content);
    }
  },

  async handleSiteEditorRequest(message, newHistory) {
    // Get page context
    const pageContext = this.gatherPageContext();

    // Call Site Editor Function
    const response = await fetch('/functions/ai-site-editor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        context: pageContext
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      const assistantMessage = {
        role: 'assistant',
        content: data.message,
        details: data.details
      };

      this.setState({
        isLoading: false,
        chatHistory: [...newHistory, assistantMessage]
      });

      // If changes were made, show reload prompt
      if (data.changesApplied) {
        this.setState({
          chatHistory: [
            ...newHistory,
            assistantMessage,
            {
              role: 'system',
              content: '✅ Changes deployed! Your site is being rebuilt. It may take a minute to see the changes live.',
              deployUrl: data.deployUrl
            }
          ]
        });
      }
    } else {
      throw new Error(data.error || 'Site editor request failed');
    }
  },

  gatherPageContext() {
    // Get entry context if available
    const entry = this.props.entry;
    const collection = this.props.collection;

    return {
      url: window.location.pathname,
      contentType: this.getContentType(),
      collectionName: collection ? collection.get('name') : 'unknown',
      entryData: entry ? this.buildContext(entry) : {},
      timestamp: new Date().toISOString()
    };
  },

  offerToApplyContent(content) {
    // This will show a button to apply the generated content
    this.setState({
      suggestedContent: content
    });
  },

  applyContent() {
    const { suggestedContent } = this.state;
    if (!suggestedContent) return;

    // Get the field type to determine how to apply
    const fieldType = this.props.field.get('widget');

    if (fieldType === 'markdown' || fieldType === 'text') {
      // For markdown/text fields, apply the body content
      this.props.onChange(suggestedContent.body || JSON.stringify(suggestedContent, null, 2));
    } else if (fieldType === 'object') {
      // For object fields, apply the entire content object
      this.props.onChange(window.Immutable.fromJS(suggestedContent));
    } else {
      // Default: convert to string
      this.props.onChange(JSON.stringify(suggestedContent, null, 2));
    }

    this.setState({
      suggestedContent: null,
      chatHistory: [
        ...this.state.chatHistory,
        { role: 'system', content: 'Content applied successfully!' }
      ]
    });
  },

  getContentType() {
    // Try to determine content type from collection name
    const collection = this.props.collection;
    if (collection) {
      const name = collection.get('name');
      if (name) return name;
    }
    return 'unknown';
  },

  buildContext(entry) {
    if (!entry) return {};

    const data = entry.get('data');
    if (!data) return {};

    // Convert Immutable object to plain JS
    return data.toJS ? data.toJS() : data;
  },

  clearChat() {
    this.setState({
      chatHistory: [],
      error: null,
      suggestedContent: null
    });
  },

  render() {
    const { isOpen, message, isLoading, chatHistory, error, suggestedContent, mode } = this.state;
    const { forID, value, classNameWrapper } = this.props;

    return window.h(
      'div',
      { className: 'claude-widget-wrapper ' + classNameWrapper },
      [
        // AI Assistant Toggle Button
        window.h(
          'button',
          {
            key: 'toggle',
            type: 'button',
            className: 'claude-toggle-btn',
            onClick: this.toggleWidget
          },
          '🤖 AI Assistant' + (isOpen ? ' (Click to close)' : '') + (mode === 'site-editor' ? ' - Site Editor Mode' : '')
        ),

        // AI Chat Panel
        isOpen && window.h(
          'div',
          { key: 'panel', className: 'claude-chat-panel' },
          [
            // Header
            window.h(
              'div',
              { key: 'header', className: 'claude-header' },
              [
                window.h('h3', { key: 'title' }, '🤖 Claude AI Assistant'),
                window.h(
                  'div',
                  { key: 'actions', className: 'claude-header-actions' },
                  [
                    // Mode Switcher
                    window.h(
                      'div',
                      { key: 'mode-switcher', className: 'claude-mode-switcher' },
                      [
                        window.h(
                          'button',
                          {
                            key: 'content-mode',
                            type: 'button',
                            className: 'claude-mode-btn' + (mode === 'content' ? ' active' : ''),
                            onClick: () => this.switchMode('content')
                          },
                          '📝 Content'
                        ),
                        window.h(
                          'button',
                          {
                            key: 'editor-mode',
                            type: 'button',
                            className: 'claude-mode-btn' + (mode === 'site-editor' ? ' active' : ''),
                            onClick: () => this.switchMode('site-editor')
                          },
                          '🛠️ Site Editor'
                        )
                      ]
                    ),
                    window.h(
                      'button',
                      {
                        key: 'clear',
                        type: 'button',
                        className: 'claude-clear-btn',
                        onClick: this.clearChat
                      },
                      'Clear'
                    )
                  ]
                )
              ]
            ),

            // Chat History
            window.h(
              'div',
              { key: 'history', className: 'claude-chat-history' },
              chatHistory.map((msg, idx) =>
                window.h(
                  'div',
                  {
                    key: idx,
                    className: `claude-message claude-message-${msg.role}`
                  },
                  [
                    window.h(
                      'div',
                      { key: 'role', className: 'claude-message-role' },
                      msg.role === 'user' ? '👤 You' :
                      msg.role === 'assistant' ? '🤖 Claude' :
                      msg.role === 'error' ? '⚠️ Error' : '💡 System'
                    ),
                    window.h(
                      'div',
                      { key: 'content', className: 'claude-message-content' },
                      msg.content
                    )
                  ]
                )
              )
            ),

            // Loading indicator
            isLoading && window.h(
              'div',
              { key: 'loading', className: 'claude-loading' },
              '⏳ Claude is thinking...'
            ),

            // Apply Content Button
            suggestedContent && window.h(
              'div',
              { key: 'apply-section', className: 'claude-apply-section' },
              [
                window.h(
                  'p',
                  { key: 'text' },
                  '✨ Content generated! Click below to apply it to this field:'
                ),
                window.h(
                  'button',
                  {
                    key: 'apply-btn',
                    type: 'button',
                    className: 'claude-apply-btn',
                    onClick: this.applyContent
                  },
                  '✅ Apply Generated Content'
                )
              ]
            ),

            // Input Form
            window.h(
              'form',
              {
                key: 'form',
                className: 'claude-input-form',
                onSubmit: this.sendMessage
              },
              [
                window.h('textarea', {
                  key: 'input',
                  className: 'claude-input',
                  value: message,
                  onChange: this.handleMessageChange,
                  placeholder: mode === 'content'
                    ? 'Ask Claude to generate or modify content for this field...\n\nExamples:\n- "Create a game recap for yesterday vs Lincoln High"\n- "Generate a timeline entry for freshman year"\n- "Write an update about my latest tournament"'
                    : 'Tell me what you want to change on your website...\n\nExamples:\n- "Add my latest GPA to the academics page"\n- "Update the hero image on the homepage"\n- "Create a new game entry for tonight\'s match"',
                  rows: 4,
                  disabled: isLoading
                }),
                window.h(
                  'button',
                  {
                    key: 'send',
                    type: 'submit',
                    className: 'claude-send-btn',
                    disabled: isLoading || !message.trim()
                  },
                  isLoading ? 'Sending...' : 'Send to Claude'
                )
              ]
            )
          ]
        ),

        // Original field (hidden when using AI)
        window.h('div', { key: 'field', className: 'claude-original-field' }, [
          window.h('label', { key: 'label', htmlFor: forID }, 'Manual Entry:'),
          window.h('textarea', {
            key: 'textarea',
            id: forID,
            className: 'nc-textControl',
            value: value || '',
            onChange: (e) => this.props.onChange(e.target.value)
          })
        ])
      ]
    );
  }
});

// Widget Preview Component
const ClaudePreview = window.createClass({
  render() {
    return window.h(
      'div',
      { className: 'claude-preview' },
      this.props.value || 'No content yet'
    );
  }
});

// Register the widget with Netlify CMS
if (window.CMS) {
  window.CMS.registerWidget(
    'claude-ai',
    ClaudeControl,
    ClaudePreview
  );
  console.log('✅ Claude AI widget registered successfully!');
} else {
  console.error('❌ Netlify CMS not found. Make sure it loads before this script.');
}
