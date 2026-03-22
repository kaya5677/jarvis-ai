// iOS Compatibility Fix for Future iOS Versions
// Add this to your script.js

class IOSCompatibilityManager {
    constructor() {
        this.iosVersion = this.getIOSVersion();
        this.compatibilityMode = this.getCompatibilityMode();
        this.setupCompatibility();
    }
    
    getIOSVersion() {
        const userAgent = navigator.userAgent;
        const iosMatch = userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/);
        
        if (iosMatch) {
            return {
                major: parseInt(iosMatch[1]),
                minor: parseInt(iosMatch[2]),
                patch: parseInt(iosMatch[3] || 0),
                string: `${iosMatch[1]}.${iosMatch[2]}.${iosMatch[3] || 0}`
            };
        }
        
        return null;
    }
    
    getCompatibilityMode() {
        if (!this.iosVersion) return 'unknown';
        
        const { major } = this.iosVersion;
        
        if (major >= 20) {
            return 'future'; // iOS 20+ (including 26.4)
        } else if (major >= 15) {
            return 'modern'; // iOS 15-19
        } else if (major >= 13) {
            return 'legacy'; // iOS 13-14
        } else {
            return 'unsupported'; // iOS < 13
        }
    }
    
    setupCompatibility() {
        console.log(`iOS Version: ${this.iosVersion.string}`);
        console.log(`Compatibility Mode: ${this.compatibilityMode}`);
        
        switch (this.compatibilityMode) {
            case 'future':
                this.setupFutureCompatibility();
                break;
            case 'modern':
                this.setupModernCompatibility();
                break;
            case 'legacy':
                this.setupLegacyCompatibility();
                break;
            case 'unsupported':
                this.showUnsupportedMessage();
                break;
        }
    }
    
    setupFutureCompatibility() {
        // Enhanced settings for future iOS (20+ including 26.4)
        console.log('Setting up future iOS compatibility...');
        
        // Override speech recognition settings
        window.speechRecognitionConfig = {
            continuous: false,
            interimResults: true,
            maxAlternatives: 1,
            serviceURI: null,
            grammars: null,
            language: 'en-US',
            audioBitsPerSecond: 16000,
            captureStream: false
        };
        
        // Force enhanced speech API
        this.forceEnhancedSpeechAPI();
        
        // Setup future-proof event handlers
        this.setupFutureEventHandlers();
        
        // Enable fallback modes
        this.enableFallbackModes();
    }
    
    setupModernCompatibility() {
        // Standard settings for iOS 15-19
        console.log('Setting up modern iOS compatibility...');
        
        window.speechRecognitionConfig = {
            continuous: true,
            interimResults: true,
            maxAlternatives: 1
        };
    }
    
    setupLegacyCompatibility() {
        // Basic settings for iOS 13-14
        console.log('Setting up legacy iOS compatibility...');
        
        window.speechRecognitionConfig = {
            continuous: false,
            interimResults: false,
            maxAlternatives: 1
        };
    }
    
    forceEnhancedSpeechAPI() {
        // Try to use enhanced speech API for future iOS
        if (window.webkitSpeechRecognition) {
            const originalSpeechRecognition = window.webkitSpeechRecognition;
            
            window.webkitSpeechRecognition = function() {
                const recognition = new originalSpeechRecognition();
                
                // Override settings for future iOS
                recognition.continuous = false;
                recognition.interimResults = true;
                recognition.maxAlternatives = 1;
                
                // Add future-specific event handlers
                recognition.onfuturestart = function() {
                    console.log('Future iOS speech recognition started');
                };
                
                recognition.onfutureerror = function(error) {
                    console.log('Future iOS speech error:', error);
                    // Fallback to manual mode
                    window.jarvisAI.enableManualMode();
                };
                
                return recognition;
            };
        }
    }
    
    setupFutureEventHandlers() {
        // Setup event handlers for future iOS
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Pause recognition when app is hidden
                if (window.jarvisAI && window.jarvisAI.isListening) {
                    window.jarvisAI.pauseRecognition();
                }
            } else {
                // Resume when app is visible
                if (window.jarvisAI && window.jarvisAI.autoMicEnabled) {
                    window.jarvisAI.resumeRecognition();
                }
            }
        });
        
        // Setup future iOS specific permissions
        this.requestFuturePermissions();
    }
    
    requestFuturePermissions() {
        // Request permissions for future iOS
        if (navigator.permissions) {
            navigator.permissions.query({ name: 'microphone' }).then(result => {
                if (result.state === 'denied') {
                    this.showPermissionGuide();
                }
            });
        }
    }
    
    enableFallbackModes() {
        // Enable fallback modes for future iOS
        window.jarvisAI.fallbackModes = {
            manualInput: true,
            touchToTalk: true,
            simplifiedUI: true
        };
    }
    
    showUnsupportedMessage() {
        console.log('iOS version not supported');
        if (window.jarvisAI) {
            window.jarvisAI.addJarvisMessage(
                'Your iOS version is not supported. Please update to iOS 15+ for full functionality.',
                false
            );
        }
    }
    
    showPermissionGuide() {
        console.log('Showing permission guide for future iOS');
        if (window.jarvisAI) {
            window.jarvisAI.addJarvisMessage(
                'Microphone permission is required. Please enable it in Settings > Privacy & Security > Microphone.',
                false
            );
        }
    }
}

// Initialize compatibility manager
window.iosCompatibilityManager = new IOSCompatibilityManager();
