require('dotenv').config();
const { createClient, LiveTranscriptionEvents } = require('@deepgram/sdk');
const colors = require('colors');

class SpeechToText {
    constructor() {
        this.deepgram = createClient(process.env.DEEPGRAM_API_KEY);
        this.connection = null;
        this.startTime = null;
    }

    async start() {
        try {
            this.connection = this.deepgram.listen.live({
                encoding: 'mulaw',
                sample_rate: '8000',
                model: 'nova-2',
                smart_format: true,
                interim_results: true,
                endpointing: 200,
                utterance_end_ms: 1000
            });

            this.connection.on(LiveTranscriptionEvents.Open, () => {
                console.log('Connection to Deepgram established'.green);
            });

            this.connection.on(LiveTranscriptionEvents.Transcript, (transcription) => {
                if (!this.startTime) {
                    this.startTime = Date.now();
                }

                const alternatives = transcription.channel?.alternatives;
                if (alternatives && alternatives[0]?.transcript) {
                    const text = alternatives[0].transcript;
                    const processingTime = Date.now() - this.startTime;

                    console.log(`Text: ${text}`);
                    console.log(`Processing Time: ${processingTime}ms`.yellow);

                    if (transcription.is_final) {
                        this.startTime = null; // Reset timer for next utterance
                    }
                }
            });

            this.connection.on(LiveTranscriptionEvents.Error, (error) => {
                console.error('Deepgram Error:'.red, error);
            });

            this.connection.on(LiveTranscriptionEvents.Close, () => {
                console.log('Connection to Deepgram closed'.yellow);
            });

        } catch (error) {
            console.error('Error starting speech-to-text:'.red, error);
        }
    }

    send(audioData) {
        if (this.connection && this.connection.getReadyState() === 1) {
            this.connection.send(audioData);
        }
    }

    stop() {
        if (this.connection) {
            this.connection.finish();
        }
    }
}

// Example usage
const stt = new SpeechToText();
stt.start();

// Handle process termination
process.on('SIGINT', () => {
    stt.stop();
    process.exit();
}); 