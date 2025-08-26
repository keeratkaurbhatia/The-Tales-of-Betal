# API Setup Guide - Smart Cultural Storyteller

## 🎯 Required APIs for Full Functionality

### 1. Hugging Face Inference API (FREE) 
**For AI Image Generation**

**Setup Steps:**
1. Visit https://huggingface.co/settings/tokens
2. Create account (free)
3. Click "New token" 
4. Select "Read" permission
5. Copy your token
6. Add to notebook: `HUGGINGFACE_TOKEN = "hf_your_token_here"`

**Free Tier:** 1,000 requests/month

---

### 2. Google Text-to-Speech (FREE)
**For Male Voice Narration with Indian Accent**

**Setup:**
- No API key needed!
- Uses `gTTS` Python library
- Configured for male-sounding voice (slower speech = deeper tone)
- Indian English accent built-in

**Voice Configuration:**
```python
# Already configured in notebook for male voice
tts = gTTS(text=text, lang='en', tld='co.in', slow=True)  # Slower = deeper/masculine
```

---

### 3. ElevenLabs API (OPTIONAL - Better Quality)
**For Premium Male Voice Quality**

**Setup Steps:**
1. Visit https://elevenlabs.io/
2. Create free account
3. Go to Profile → API Keys
4. Copy API key
5. Add to notebook: `ELEVENLABS_API_KEY = "your_key_here"`

**Male Voices Available:**
- **Daniel** (ID: `onwK4e9ZLuTAKqWW03F9`) - Mature, wise storyteller ✅ *Currently Used*
- **Liam** (ID: `TX3LPaxmHKxFdv7VOQHJ`) - Young, energetic
- **Callum** (ID: `N2lVS1w4EtoT3dr4eOWO`) - British accent
- **George** (ID: `JBFqnCBsd6RMkjVDRZzb`) - Deep, authoritative
- **Eric** (ID: `cjVigY5qzO86Huf0OWal`) - Friendly, clear

**Free Tier:** 10,000 characters/month

---

## 🚀 Quick Start Commands

### Install Dependencies:
```bash
pip install -r requirements.txt
```

### Run the Generation Notebook:
```bash
jupyter notebook story_generator.ipynb
```

### Alternative: Use Google Colab
1. Upload `story_generator.ipynb` to Google Colab
2. Add your API keys in the configuration cell
3. Run all cells to generate content

---

## 📁 File Structure After Generation

```
generated_content/
├── images/
│   ├── wisdom-1_scene_1.png
│   ├── wisdom-1_scene_2.png
│   └── ... (6 images per story)
├── audio/
│   └── wisdom-1_narration.mp3  # Male voice
└── videos/
    └── wisdom-1_video.mp4      # Combined with effects
```

---

## 🎭 Voice Customization Options

### For gTTS (Free):
```python
# Current male voice setup
generate_audio_gtts(text, filename, lang='en', tld='co.in')  # slow=True for deeper voice
```

### For ElevenLabs (Premium):
```python
# Switch voices by changing the voice ID:
url = "https://api.elevenlabs.io/v1/text-to-speech/[VOICE_ID]"

# Daniel (current): onwK4e9ZLuTAKqWW03F9
# George (deeper): JBFqnCBsd6RMkjVDRZzb  
# Liam (younger): TX3LPaxmHKxFdv7VOQHJ
```

---

## 🔧 Troubleshooting

**Common Issues:**

1. **"Model loading" error (Hugging Face)**
   - Wait 2-3 minutes and try again
   - Model needs to "warm up" on first use

2. **Rate limiting**
   - Free tier has limits
   - Add delays between requests (already included)

3. **Audio quality concerns**
   - Use ElevenLabs for better quality
   - gTTS is great for testing/prototyping

4. **Memory issues**
   - Use Google Colab with GPU for image generation
   - Process stories one at a time if needed

---

## 💡 Cost Optimization Tips

**Free Tier Strategy:**
- Use Hugging Face for images (1,000/month)
- Use gTTS for audio (unlimited)
- Generate 10 stories = ~60 images total
- Well within free limits!

**Premium Strategy:**
- Add ElevenLabs for voice quality
- Use Runware API for faster image generation
- Consider batch processing for efficiency

---

## 📞 Support

**If you encounter issues:**
1. Check API key format and permissions
2. Verify internet connection for API calls
3. Try running one story at a time first
4. Check the notebook output for specific error messages

**Pro Tip:** Start with the free options (Hugging Face + gTTS) to test the full pipeline before adding premium services!