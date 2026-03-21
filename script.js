// JARVIS AI Assistant - Enhanced with Siri-like Natural Responses

class JarvisAI {
    constructor() {
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.isListening = false;
        this.isSpeaking = false;
        this.currentLanguage = 'ms'; // Default: Malay (ms) or English (en)
        this.conversationContext = [];
        this.userPersonality = 'friendly'; // Track user interaction style
        this.autoMicEnabled = false; // Auto mic feature
        this.autoMicTimeout = null; // Timeout for auto mic
        this.continuousListening = false; // Continuous listening mode
        this.silenceDetectionTimeout = null; // Silence detection
        this.lastSpeechTime = Date.now(); // Track last speech activity
        
        // Enhanced translations with Siri-like responses
        this.translations = {
            ms: {
                status: {
                    ready: 'Bersedia untuk mendengar...',
                    listening: 'Mendengar...',
                    error: 'Berlaku kesilapan. Sila cuba lagi.',
                    noSpeech: 'Tiada suara dikesan. Sila cuba lagi.',
                    notAllowed: 'Akses mikrofon ditolak. Sila benarkan akses mikrofon.',
                    notSupported: 'Pengecaman suara tidak disokong dalam pelayar ini.',
                    autoMicEnabled: '🎤 Auto Mic Aktif - Saya sentiasa mendengar...',
                    autoMicDisabled: 'Auto Mic Tidak Aktif',
                    continuousListening: '🎤 Dengar Berterusan - Bercakap bila-bila masa!',
                    waitingForSpeech: '🎤 Menunggu arahan anda...'
                },
                voiceStatus: {
                    listening: '🎤 Mendengar, sila bercakap...'
                },
                placeholders: {
                    input: 'Taip mesej anda atau gunakan mikrofon...'
                },
                buttons: {
                    mic: 'Klik untuk bercakap',
                    send: 'Hantar mesej'
                },
                welcome: 'Hai! Saya JARVIS, pembantu AI peribadi anda. Apa yang boleh saya bantu hari ini?',
                greetings: [
                    'Hai! Gembira mendengar suara anda. Ada apa saya boleh bantu?',
                    'Hello! Senang je berbual dengan anda. Apa khabar?',
                    'Hai! Saya di sini untuk membantu. Apa yang anda perlukan?',
                    'Hello! Baguslah dapat bercakap dengan anda. Apa yang saya boleh tolong?',
                    'Hai! Saya sedia mendengar. Ceritakan pada saya apa yang ada dalam fikiran anda.'
                ],
                help: 'Saya JARVIS, pembantu AI anda! Saya boleh:\n\n🗣️ Berbual dengan anda dalam Bahasa Melayu atau English\n⏰ Beritahu masa dan tarikh semasa\n🧮 Bantu kiraan matematik mudah\n💬 Menjadi teman perbualan anda\n🎵 Dengar apa yang anda katakan\n\nCuba tanya "Apa masa sekarang?" atau "Kira 5 tambah 3" atau just bual dengan saya seperti kawan!',
                goodbye: [
                    'Selamat tinggal! Sentiasa gembira dapat membantu anda. Jumpa lagi!',
                    'Bye bye! Ingat, saya sentiasa di sini jika anda perlukan bantuan.',
                    'Selamat jalan! Terima kasih kerana berbual dengan saya hari ini.',
                    'Jumpa lagi! Jangan lupa, saya di sini untuk anda 24/7.',
                    'Bye! Harap hari anda menyenangkan. Call saya kalau perlu apa-apa!'
                ],
                weather: [
                    'Maaf, saya tidak ada akses data cuaca masa nyata. Tapi kalau nak tahu, saya cadangkan anda buka aplikasi cuaca atau tengok keluar tingkap!',
                    'Saya tak boleh check cuaca sekarang, tapi saya harap hari anda cerah seperti senyuman anda!',
                    'Untuk maklumat cuaca terkini, anda boleh semak aplikasi weather atau tanya "Hey Google, apa cuaca hari ini?"'
                ],
                calcError: [
                    'Oops! Kiraan tu saya tak faham. Boleh ulang dengan cara yang lain?',
                    'Maaf ya, matematik tu saya agak lemah. Boleh cuba nombor yang lebih senang?',
                    'Eh, kiraan tu saya pening kepala. Boleh tolong pecahkan secara step-by-step?'
                ],
                default: [
                    'Hmmm, menarik apa yang anda cakap tu. Boleh cerita sikit lagi?',
                    'Saya dengar apa yang anda kata. Ada lagi yang anda nak kongsi?',
                    'Oh, begitu! Itu baru saya tahu. Ada lagi tak?',
                    'Saya faham. Teruskan bercerita, saya suka dengar cerita anda.',
                    'Betul tu! Anda memang pandai. Apa lagi yang anda fikirkan?',
                    'Interesting! Saya belajar baru hari ni. Terima kasih!',
                    'Saya setuju dengan anda. Anda ada idea yang bagus!',
                    'Ya, saya faham perasaan anda. Ada apa lagi nak luahkan?',
                    'Wah, anda memang kreatif! Saya suka cara anda berfikir.',
                    'Saya sedang memahami apa yang anda maksudkan. Boleh beri contoh?'
                ],
                question: [
                    'Itu soalan yang bagus! Biar saya fikirkan sebentar...',
                    'Hmm, soalan yang menarik. Mari kita kaji sama-sama.',
                    'Saya sedang mencari jawapan terbaik untuk anda. Tunggu ya...',
                    'Soalan yang bijak! Anda memang suka berfikir, saya suka!',
                    'Biarkan saya bantu anda cari jawapan untuk soalan tu.',
                    'Itu sesuatu yang saya patut tahu! Terima kasih tanya.'
                ],
                compliments: [
                    'Terima kasih! Anda sangat baik hati.',
                    'Awak! Saya rasa terharu pula. 😊',
                    'Alhamdulillah! Saya cuba yang terbaik untuk anda.',
                    'Itu kerana saya dilatih untuk membantu orang seperti anda!',
                    'Saya gembira anda puas dengan saya. Terima kasih!'
                ],
                jokes: [
                    'Mengapa kompon takut pada internet? Sebab dia ada virus! 😄',
                    'Apa khabar seekor gajah dengan seekor semut? Kawan baik! 🐘🐜',
                    'Kenapa orang suka masak? Sebab mereka suka 'masak-masak'! 🍳',
                    'Apa bezanya kawan dengan pembalut? Kalau luka, pembalut tolong. Kalau susah, kawan tolong! 🤗'
                ],
                motivational: [
                    'Anda boleh buatnya! Jangan pernah give up!',
                    'Setiap hari adalah peluang baru untuk berjaya.',
                    'Anda hebat daripada yang anda sangka!',
                    'Kejayaan bermula dengan satu langkah kecil.',
                    'Teruskan berusaha, hasilnya pasti manis!'
                ]
            },
            en: {
                status: {
                    ready: 'Ready to listen...',
                    listening: 'Listening...',
                    error: 'An error occurred. Please try again.',
                    noSpeech: 'No speech detected. Please try again.',
                    notAllowed: 'Microphone access denied. Please allow microphone access.',
                    notSupported: 'Speech recognition is not supported in this browser.',
                    autoMicEnabled: '🎤 Auto Mic Active - I\'m always listening...',
                    autoMicDisabled: 'Auto Mic Disabled',
                    continuousListening: '🎤 Continuous Listening - Speak anytime!',
                    waitingForSpeech: '🎤 Waiting for your command...'
                },
                voiceStatus: {
                    listening: '🎤 Listening, please speak...'
                },
                placeholders: {
                    input: 'Type your message or use microphone...'
                },
                buttons: {
                    mic: 'Click to speak',
                    send: 'Send message'
                },
                welcome: 'Hey there! I\'m JARVIS, your personal AI assistant. What can I help you with today?',
                greetings: [
                    'Hey! Great to hear from you. How\'s it going?',
                    'Hi there! I love talking with you. What\'s on your mind?',
                    'Hello! I\'m here to help. What do you need today?',
                    'Hey! Nice to connect with you. How can I assist?',
                    'Hi! I\'m all ears. Tell me what\'s on your mind!'
                ],
                help: 'I\'m JARVIS, your AI assistant! I can help you with:\n\n🗣️ Chat in English or Malay\n⏰ Tell you the current time and date\n🧮 Help with simple math calculations\n💬 Be your conversation companion\n🎵 Listen to what you have to say\n\nTry asking "What time is it?" or "Calculate 5 plus 3" or just chat with me like a friend!',
                goodbye: [
                    'Goodbye! Always happy to help you. Talk to you soon!',
                    'Bye bye! Remember, I\'m always here if you need anything.',
                    'See you later! Thanks for chatting with me today.',
                    'Take care! Don\'t forget, I\'m here for you 24/7.',
                    'Bye! Hope you have a great day. Call me anytime you need something!'
                ],
                weather: [
                    'Sorry, I don\'t have access to real-time weather data. But I suggest checking your weather app or looking out the window!',
                    'I can\'t check the weather right now, but I hope your day is as bright as your smile!',
                    'For current weather information, you can check your weather app or ask "Hey Google, what\'s the weather today?"'
                ],
                calcError: [
                    'Oops! I didn\'t quite get that calculation. Can you try saying it differently?',
                    'Sorry, I\'m not great at complex math. Can you try with simpler numbers?',
                    'That math is making my head spin! Can you break it down step by step?'
                ],
                default: [
                    'Hmm, that\'s interesting! Tell me more about it?',
                    'I hear what you\'re saying. Is there anything else you\'d like to share?',
                    'Oh, I see! That\'s new to me. What else?',
                    'I get you. Keep talking, I enjoy our conversations.',
                    'That\'s so true! You\'re pretty smart, you know that?',
                    'Interesting! I\'m learning something new today. Thanks!',
                    'I agree with you. You have great ideas!',
                    'Yeah, I understand how you feel. Anything else on your mind?',
                    'Wow, you\'re so creative! I love how you think.',
                    'I\'m trying to understand what you mean. Can you give me an example?'
                ],
                question: [
                    'That\'s a great question! Let me think about that for a moment...',
                    'Hmm, interesting question. Let\'s explore this together.',
                    'I\'m searching for the best answer for you. One moment please...',
                    'Smart question! I can tell you\'re a thinker, I like that!',
                    'Let me help you find the answer to that question.',
                    'That\'s something I should know! Thanks for asking.'
                ],
                compliments: [
                    'Thank you! You\'re very kind.',
                    'Aww, you\'re making me blush! 😊',
                    'Thank you! I\'m doing my best to help you.',
                    'That\'s because I\'m trained to assist people like you!',
                    'I\'m glad you\'re happy with me. Thank you!'
                ],
                jokes: [
                    'Why don\'t scientists trust atoms? Because they make up everything! 😄',
                    'What do you call a bear with no teeth? A gummy bear! 🐻',
                    'Why don\'t eggs tell jokes? They\'d crack each other up! 🥚',
                    'What\'s the best thing about Switzerland? I don\'t know, but the flag is a big plus! 🇨🇭'
                ],
                motivational: [
                    'You\'ve got this! Never give up on your dreams.',
                    'Every day is a new opportunity to succeed.',
                    'You\'re stronger than you think!',
                    'Success starts with taking that first small step.',
                    'Keep pushing forward, sweet results are coming!'
                ]
            }
        };
        
        this.initializeElements();
        this.initializeLanguageSwitcher();
        this.initializeSpeechRecognition();
        this.attachEventListeners();
        
        // Set initial HTML lang attribute
        document.documentElement.lang = this.currentLanguage === 'ms' ? 'ms' : 'en';
        
        // Welcome message with personality
        setTimeout(() => {
            this.speak(this.translations[this.currentLanguage].welcome);
        }, 500);
    }
    
    initializeElements() {
        this.chatContainer = document.getElementById('chatContainer');
        this.textInput = document.getElementById('textInput');
        this.sendButton = document.getElementById('sendButton');
        this.micButton = document.getElementById('micButton');
        this.autoMicButton = document.getElementById('autoMicButton');
        this.statusElement = document.getElementById('status');
        this.voiceStatusElement = document.getElementById('voiceStatus');
        this.langMsBtn = document.getElementById('langMs');
        this.langEnBtn = document.getElementById('langEn');
    }
    
    initializeLanguageSwitcher() {
        this.langMsBtn.addEventListener('click', () => this.switchLanguage('ms'));
        this.langEnBtn.addEventListener('click', () => this.switchLanguage('en'));
        this.updateUI();
    }
    
    switchLanguage(lang) {
        this.currentLanguage = lang;
        
        // Update active button
        this.langMsBtn.classList.toggle('active', lang === 'ms');
        this.langEnBtn.classList.toggle('active', lang === 'en');
        
        // Update speech recognition language
        if (this.recognition) {
            this.recognition.lang = lang === 'ms' ? 'ms-MY' : 'en-US';
        }
        
        // Update UI
        this.updateUI();
        
        // Update HTML lang attribute
        document.documentElement.lang = lang === 'ms' ? 'ms' : 'en';
    }
    
    updateUI() {
        const t = this.translations[this.currentLanguage];
        
        // Update status
        if (!this.isListening) {
            this.statusElement.textContent = t.status.ready;
        }
        
        // Update placeholders and titles
        this.textInput.placeholder = t.placeholders.input;
        this.micButton.title = t.buttons.mic;
        this.sendButton.title = t.buttons.send;
        
        // Update welcome message in chat if it exists
        const welcomeMsg = this.chatContainer.querySelector('.jarvis-message .message-text p');
        if (welcomeMsg) {
            const dataAttr = this.currentLanguage === 'ms' ? 'data-ms' : 'data-en';
            const dataValue = welcomeMsg.getAttribute(dataAttr);
            if (dataValue) {
                welcomeMsg.textContent = dataValue;
            }
        }
        
        // Update input placeholder based on data attributes
        const placeholderAttr = this.currentLanguage === 'ms' ? 'data-placeholder-ms' : 'data-placeholder-en';
        const placeholderValue = this.textInput.getAttribute(placeholderAttr);
        if (placeholderValue) {
            this.textInput.placeholder = placeholderValue;
        }
        
        // Update button titles based on data attributes
        const micTitleAttr = this.currentLanguage === 'ms' ? 'data-title-ms' : 'data-title-en';
        const micTitleValue = this.micButton.getAttribute(micTitleAttr);
        if (micTitleValue) {
            this.micButton.title = micTitleValue;
        }
        
        const sendTitleAttr = this.currentLanguage === 'ms' ? 'data-title-ms' : 'data-title-en';
        const sendTitleValue = this.sendButton.getAttribute(sendTitleAttr);
        if (sendTitleValue) {
            this.sendButton.title = sendTitleValue;
        }
    }
    
    initializeSpeechRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.lang = this.currentLanguage === 'ms' ? 'ms-MY' : 'en-US';
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            
            this.recognition.onstart = () => {
                this.isListening = true;
                this.micButton.classList.add('recording');
                const t = this.translations[this.currentLanguage];
                this.statusElement.textContent = t.status.listening;
                this.voiceStatusElement.textContent = t.voiceStatus.listening;
                
                // Reset silence detection timeout
                if (this.silenceDetectionTimeout) {
                    clearTimeout(this.silenceDetectionTimeout);
                }
                
                // Auto-stop after 10 seconds of silence for continuous listening
                if (this.continuousListening) {
                    this.silenceDetectionTimeout = setTimeout(() => {
                        if (this.isListening) {
                            this.recognition.stop();
                        }
                    }, 10000);
                }
            };
            
            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.addUserMessage(transcript);
                this.processMessage(transcript);
                this.lastSpeechTime = Date.now();
            };
            
            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.isListening = false;
                this.micButton.classList.remove('recording');
                const t = this.translations[this.currentLanguage];
                
                if (event.error === 'no-speech') {
                    this.statusElement.textContent = t.status.noSpeech;
                    // Restart continuous listening after no speech
                    if (this.continuousListening) {
                        setTimeout(() => this.startContinuousListening(), 1000);
                    }
                } else if (event.error === 'not-allowed') {
                    this.statusElement.textContent = t.status.notAllowed;
                    this.disableAutoMic(); // Disable auto mic if permission denied
                } else {
                    this.statusElement.textContent = t.status.error;
                    // Retry continuous listening on other errors
                    if (this.continuousListening) {
                        setTimeout(() => this.startContinuousListening(), 2000);
                    }
                }
                this.voiceStatusElement.textContent = '';
            };
            
            this.recognition.onend = () => {
                this.isListening = false;
                this.micButton.classList.remove('recording');
                const t = this.translations[this.currentLanguage];
                
                if (this.continuousListening) {
                    this.statusElement.textContent = t.status.waitingForSpeech;
                    this.voiceStatusElement.textContent = '';
                    // Restart continuous listening after a short delay
                    this.autoMicTimeout = setTimeout(() => this.startContinuousListening(), 1500);
                } else {
                    this.statusElement.textContent = t.status.ready;
                    this.voiceStatusElement.textContent = '';
                }
            };
        } else {
            this.micButton.style.display = 'none';
            const t = this.translations[this.currentLanguage];
            this.statusElement.textContent = t.status.notSupported;
        }
    }
    
    attachEventListeners() {
        this.sendButton.addEventListener('click', () => this.handleSendMessage());
        this.micButton.addEventListener('click', () => this.toggleListening());
        this.autoMicButton.addEventListener('click', () => this.toggleAutoMic());
        
        this.textInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSendMessage();
            }
        });
        
        this.synthesis.onvoiceschanged = () => {
            // Voices loaded
        };
    }
    
    // Auto Mic Functions
    toggleAutoMic() {
        this.autoMicEnabled = !this.autoMicEnabled;
        this.autoMicButton.classList.toggle('active', this.autoMicEnabled);
        
        const t = this.translations[this.currentLanguage];
        
        if (this.autoMicEnabled) {
            this.enableAutoMic();
            this.addJarvisMessage(t.status.autoMicEnabled, false);
        } else {
            this.disableAutoMic();
            this.addJarvisMessage(t.status.autoMicDisabled, false);
        }
    }
    
    enableAutoMic() {
        this.continuousListening = true;
        this.startContinuousListening();
    }
    
    disableAutoMic() {
        this.continuousListening = false;
        this.stopContinuousListening();
        if (this.isListening) {
            this.recognition.stop();
        }
    }
    
    startContinuousListening() {
        if (!this.continuousListening || !this.recognition) return;
        
        // Don't start if Jarvis is speaking
        if (this.isSpeaking) {
            this.autoMicTimeout = setTimeout(() => this.startContinuousListening(), 1000);
            return;
        }
        
        try {
            this.recognition.lang = this.currentLanguage === 'ms' ? 'ms-MY' : 'en-US';
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.start();
        } catch (error) {
            console.error('Error starting continuous recognition:', error);
            this.autoMicTimeout = setTimeout(() => this.startContinuousListening(), 2000);
        }
    }
    
    stopContinuousListening() {
        if (this.autoMicTimeout) {
            clearTimeout(this.autoMicTimeout);
            this.autoMicTimeout = null;
        }
        if (this.silenceDetectionTimeout) {
            clearTimeout(this.silenceDetectionTimeout);
            this.silenceDetectionTimeout = null;
        }
    }
    
    toggleListening() {
        if (!this.recognition) {
            const t = this.translations[this.currentLanguage];
            this.addJarvisMessage(t.status.notSupported);
            return;
        }
        
        if (this.isListening) {
            this.recognition.stop();
        } else {
            try {
                this.recognition.lang = this.currentLanguage === 'ms' ? 'ms-MY' : 'en-US';
                this.recognition.start();
            } catch (error) {
                console.error('Error starting recognition:', error);
            }
        }
    }
    
    handleSendMessage() {
        const message = this.textInput.value.trim();
        if (message) {
            this.addUserMessage(message);
            this.processMessage(message);
            this.textInput.value = '';
        }
    }
    
    addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message user-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="user-avatar">U</div>
                <div class="message-text">
                    <p>${this.escapeHtml(text)}</p>
                </div>
            </div>
        `;
        this.chatContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    addJarvisMessage(text, shouldSpeak = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message jarvis-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="jarvis-avatar">J</div>
                <div class="message-text">
                    <p>${this.escapeHtml(text)}</p>
                </div>
            </div>
        `;
        this.chatContainer.appendChild(messageDiv);
        this.scrollToBottom();
        
        if (shouldSpeak && !this.isSpeaking) {
            this.speak(text);
        }
    }
    
    processMessage(message) {
        const lowerMessage = message.toLowerCase().trim();
        let response = this.generateResponse(lowerMessage);
        
        setTimeout(() => {
            this.addJarvisMessage(response);
        }, 500);
    }
    
    generateResponse(message) {
        const t = this.translations[this.currentLanguage];
        
        // Store conversation context
        this.conversationContext.push({ user: message, timestamp: Date.now() });
        if (this.conversationContext.length > 5) {
            this.conversationContext.shift(); // Keep only last 5 messages
        }
        
        // Enhanced greeting patterns with more natural responses
        const greetingPatterns = this.currentLanguage === 'ms' 
            ? /(halo|hai|hi|hello|selamat pagi|selamat tengahari|selamat petang|selamat malam|assalamualaikum|salam|apa khabar|how are you)/
            : /(hello|hi|hey|good morning|good afternoon|good evening|good night|greetings|how are you|what\'s up|howdy)/;
        
        if (message.match(greetingPatterns)) {
            // Add variety based on time of day
            const hour = new Date().getHours();
            let timeGreeting = '';
            if (this.currentLanguage === 'ms') {
                if (hour < 12) timeGreeting = 'Selamat pagi! ';
                else if (hour < 18) timeGreeting = 'Selamat tengahari! ';
                else timeGreeting = 'Selamat petang! ';
            } else {
                if (hour < 12) timeGreeting = 'Good morning! ';
                else if (hour < 18) timeGreeting = 'Good afternoon! ';
                else timeGreeting = 'Good evening! ';
            }
            
            const baseGreeting = t.greetings[Math.floor(Math.random() * t.greetings.length)];
            return timeGreeting + baseGreeting;
        }
        
        // Enhanced time/date patterns with more natural responses
        const timePatterns = this.currentLanguage === 'ms'
            ? /(jam|masa|waktu|tarikh|hari ini|hari apa|bila|pukul berapa|sekarang|now)/
            : /(time|date|what time|what date|what day|when|clock|current|now|right now)/;
        
        if (message.match(timePatterns)) {
            const now = new Date();
            const locale = this.currentLanguage === 'ms' ? 'ms-MY' : 'en-US';
            const time = now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
            const date = now.toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            
            // Add contextual time responses
            if (this.currentLanguage === 'ms') {
                const hour = now.getHours();
                if (hour < 12) {
                    return `Sekarang pukul ${time}, masih pagi lagi. Hari ni ${date}. Ada rancangan apa hari ni?`;
                } else if (hour < 18) {
                    return `Sekarang dah ${time}, tengahari ni. Hari ni ${date}. Jangan lupa makan tengahari ya!`;
                } else {
                    return `Sekarang dah ${time}, petang dah. Hari ni ${date}. Harap hari anda menyenangkan!`;
                }
            } else {
                const hour = now.getHours();
                if (hour < 12) {
                    return `It\'s currently ${time}, still morning. Today is ${date}. Got any plans for today?`;
                } else if (hour < 18) {
                    return `It\'s already ${time} in the afternoon. Today is ${date}. Don\'t forget to have lunch!`;
                } else {
                    return `It\'s ${time} in the evening. Today is ${date}. Hope you\'re having a great day!`;
                }
            }
        }
        
        // Enhanced weather patterns with personality
        const weatherPatterns = /(cuaca|weather|hujan|rain|cerah|sunny|panas|hot|sejuk|cold|mendung|cloudy)/;
        if (message.match(weatherPatterns)) {
            return t.weather[Math.floor(Math.random() * t.weather.length)];
        }
        
        // Enhanced help patterns with more engaging responses
        const helpPatterns = this.currentLanguage === 'ms'
            ? /(bantuan|help|tolong|apa yang boleh|fitur|feature|command|arahan|boleh buat|capability)/
            : /(help|assist|what can|features|commands|capabilities|what do you do|abilities)/;
        
        if (message.match(helpPatterns)) {
            return t.help;
        }
        
        // Enhanced goodbye patterns with context
        const goodbyePatterns = this.currentLanguage === 'ms'
            ? /(selamat tinggal|bye|jumpa lagi|terima kasih|thank you|tq|thanks|see you|later|selamat malam)/
            : /(goodbye|bye|see you|thank you|thanks|thank|later|have a good day|good night)/;
        
        if (message.match(goodbyePatterns)) {
            // Track conversation length for personalized goodbye
            const conversationLength = this.conversationContext.length;
            if (conversationLength > 3) {
                const specialGoodbye = this.currentLanguage === 'ms'
                    ? `Terima kasih untuk perbualan yang menyenangkan! ${t.goodbye[Math.floor(Math.random() * t.goodbye.length)]}`
                    : `Thanks for the lovely conversation! ${t.goodbye[Math.floor(Math.random() * t.goodbye.length)]}`;
                return specialGoodbye;
            }
            return t.goodbye[Math.floor(Math.random() * t.goodbye.length)];
        }
        
        // Enhanced math patterns with encouragement
        const calcPatterns = this.currentLanguage === 'ms'
            ? /(hitung|berapa|calculate|kalkulator|calculator|tambah|tolak|darab|bahagi|add|subtract|multiply|divide|plus|minus|times)/
            : /(calculate|how much|what is|add|subtract|multiply|divide|plus|minus|times|equals)/;
        
        if (message.match(calcPatterns)) {
            const mathMatch = message.match(/(\d+)\s*([+\-*/x×÷])\s*(\d+)/);
            if (mathMatch) {
                const num1 = parseInt(mathMatch[1]);
                const operator = mathMatch[2].replace('x', '*').replace('×', '*').replace('÷', '/');
                const num2 = parseInt(mathMatch[3]);
                let result;
                try {
                    result = eval(`${num1}${operator}${num2}`);
                    const operatorText = this.currentLanguage === 'ms' 
                        ? operator === '+' ? 'tambah' : operator === '-' ? 'tolak' : operator === '*' ? 'darab' : 'bahagi'
                        : operator === '+' ? 'plus' : operator === '-' ? 'minus' : operator === '*' ? 'times' : 'divided by';
                    
                    if (this.currentLanguage === 'ms') {
                        return `Dah kira! ${num1} ${operatorText} ${num2} sama dengan ${result}. Anda pandai matematik jugak!`;
                    } else {
                        return `Let me calculate that! ${num1} ${operatorText} ${num2} equals ${result}. You\'re good at math!`;
                    }
                } catch (e) {
                    return t.calcError[Math.floor(Math.random() * t.calcError.length)];
                }
            }
        }
        
        // Enhanced compliment detection
        const complimentPatterns = this.currentLanguage === 'ms'
            ? /(bagus|hebat|pandai|cantik|kacak|terbaik|good job|well done|nice|great|awesome|excellent)/
            : /(good|great|awesome|excellent|amazing|fantastic|wonderful|perfect|nice|well done|good job)/;
        
        if (message.match(complimentPatterns)) {
            return t.compliments[Math.floor(Math.random() * t.compliments.length)];
        }
        
        // Joke request detection
        const jokePatterns = this.currentLanguage === 'ms'
            ? /(lawak|joke|jenaka|kelakar|funny|geli|ketawa)/
            : /(joke|funny|laugh|hilarious|comedy|tell me a joke)/;
        
        if (message.match(jokePatterns)) {
            return t.jokes[Math.floor(Math.random() * t.jokes.length)];
        }
        
        // Motivational request detection
        const motivationalPatterns = this.currentLanguage === 'ms'
            ? /(motivasi|motivation|semangat|inspirasi|takut|give up|putus asa|sedih|sad)/
            : /(motivation|inspiration|encourage|sad|depressed|give up|need motivation)/;
        
        if (message.match(motivationalPatterns)) {
            return t.motivational[Math.floor(Math.random() * t.motivational.length)];
        }
        
        // Enhanced question patterns with more thoughtful responses
        const questionPatterns = this.currentLanguage === 'ms'
            ? /(apa|siapa|dimana|kenapa|mengapa|bagaimana|kapan|bila|mana|berapa|why|how|when|where|what)/
            : /(what|who|where|why|how|when|which|how many|how much)/;
        
        if (message.match(questionPatterns)) {
            // Check if it's a personal question about Jarvis
            const personalPatterns = this.currentLanguage === 'ms'
                ? /(kamu|anda|saya|jarvis)/
                : /(you|yourself|jarvis)/;
            
            if (message.match(personalPatterns)) {
                const personalResponses = this.currentLanguage === 'ms'
                    ? [
                        'Saya JARVIS, pembantu AI peribadi anda. Dilatih untuk membantu dan berbual!',
                        'Saya program AI yang direka untuk jadi kawan baik anda!',
                        'Saya ada di sini untuk membuat hidup anda lebih mudah dan menyeronokkan!'
                    ]
                    : [
                        'I\'m JARVIS, your personal AI assistant. Trained to help and chat!',
                        'I\'m an AI program designed to be your good friend!',
                        'I\'m here to make your life easier and more fun!'
                    ];
                return personalResponses[Math.floor(Math.random() * personalResponses.length)];
            }
            
            return t.question[Math.floor(Math.random() * t.question.length)];
        }
        
        // Enhanced default responses with personality
        return t.default[Math.floor(Math.random() * t.default.length)];
    }
    
    speak(text) {
        if (this.isSpeaking) {
            this.synthesis.cancel();
        }
        
        this.isSpeaking = true;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = this.currentLanguage === 'ms' ? 'ms-MY' : 'en-US';
        
        // Enhanced voice settings for more natural Siri-like speech
        utterance.rate = 0.95; // Slightly slower for more natural speech
        utterance.pitch = 1.0;
        utterance.volume = 0.9;
        
        // Try to select a more natural voice if available
        const voices = this.synthesis.getVoices();
        let selectedVoice = null;
        
        if (this.currentLanguage === 'ms') {
            // Try to find Malay voice, fallback to English
            selectedVoice = voices.find(voice => 
                voice.lang.includes('ms') || voice.lang.includes('MY')
            ) || voices.find(voice => 
                voice.lang.includes('en') && voice.name.includes('Female')
            );
        } else {
            // Try to find natural English female voice (like Siri)
            selectedVoice = voices.find(voice => 
                voice.lang.includes('en') && 
                (voice.name.includes('Female') || voice.name.includes('Samantha') || voice.name.includes('Karen') || voice.name.includes('Siri'))
            ) || voices.find(voice => 
                voice.lang.includes('en-US') && voice.name.includes('Female')
            );
        }
        
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
        
        // Add natural pauses for punctuation
        utterance.onboundary = (event) => {
            if (event.name === 'sentence') {
                // Natural pause at sentence boundaries
                utterance.pause();
                setTimeout(() => utterance.resume(), 200);
            }
        };
        
        utterance.onend = () => {
            this.isSpeaking = false;
            // Restart continuous listening after speaking if auto mic is enabled
            if (this.autoMicEnabled && this.continuousListening) {
                setTimeout(() => this.startContinuousListening(), 500);
            }
        };
        
        utterance.onerror = (event) => {
            this.isSpeaking = false;
            console.error('Speech synthesis error:', event);
            // Restart continuous listening after error if auto mic is enabled
            if (this.autoMicEnabled && this.continuousListening) {
                setTimeout(() => this.startContinuousListening(), 1000);
            }
        };
        
        this.synthesis.speak(utterance);
    }
    
    scrollToBottom() {
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize JARVIS when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new JarvisAI();
});
