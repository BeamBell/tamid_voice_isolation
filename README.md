# Speech-to-Text Implementation

This is a simplified implementation of speech-to-text using Deepgram's API. The implementation includes processing time measurement to help understand the latency of the transcription service.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```bash
cp .env.example .env
```

3. Get a Deepgram API key from [Deepgram's Console](https://console.deepgram.com/) and add it to your `.env` file:
```
DEEPGRAM_API_KEY="your-api-key-here"
```

## Usage

The implementation provides a `SpeechToText` class that handles the connection to Deepgram and processes audio data. Here's how to use it:

```javascript
const stt = new SpeechToText();
stt.start();

// To send audio data:
stt.send(audioData);

// To stop the connection:
stt.stop();
```

## Features

- Live transcription of audio input
- Processing time measurement for each transcription
- Color-coded console output for better visibility
- Error handling and connection management

## Processing Time Measurement

The implementation measures the time between receiving audio data and getting the transcription result. This is displayed in milliseconds in the console output.

## Notes for Interns

Your task is to:
1. Set up voice isolation for the audio input
2. Test the implementation with different audio sources
3. Analyze the processing times and suggest optimizations

The current implementation uses Deepgram's `nova-2` model with the following settings:
- Encoding: mulaw
- Sample rate: 8000 Hz
- Smart formatting: enabled
- Interim results: enabled
- Endpointing: 200ms
- Utterance end: 1000ms 