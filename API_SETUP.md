# API Setup Guide - Smart Cultural Storyteller

## 🎯 Required APIs for Full Functionality

### 1. MiniMax Hailuo Video API (Text-to-Video)
**For AI Video Generation**

**Setup Steps:**
1. Obtain an API key from your provider (MiniMax Hailuo or a compatible proxy)
2. Set environment variables:
   - `MINIMAX_API_KEY="your_api_key"`
   - Optional: `MINIMAX_API_URL` (defaults to the Segmind Hailuo endpoint)
3. The notebook reads these automatically

**Free/Pricing:** Refer to your provider's pricing

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
1. Visit `https://elevenlabs.io`
2. Create free account
3. Go to Profile → API Keys
4. Copy API key
5. Add to notebook: `ELEVENLABS_API_KEY = "your_key_here"`

**Male Voices Available:**
- **Daniel** (ID: `onwK4e9ZLuTAKqWW03F9`) - Mature, wise storyteller ✅
- **Liam** (ID: `TX3LPaxmHKxFdv7VOQHJ`) - Young, energetic
- **Callum** (ID: `N2lVS1w4EtoT3dr4eOWO`) - British accent
- **George** (ID: `JBFqnCBsd6RMkjVDRZzb`) - Deep, authoritative
- **Eric** (ID: `cjVigY5qzO86Huf0OWal`) - Friendly, clear

**Free Tier:** 10,000 characters/month

---

## 🚀 Quick Start Commands

### Install Dependencies:
```bash
pip install requests pillow opencv-python moviepy torch diffusers elevenlabs gTTS pydub gradio
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
│   └── ...
├── audio/
│   └── wisdom-1_narration.mp3  # Male voice
├── videos/
│   ├── clips/                  # Individual animated clips
│   │   ├── wisdom-1_scene_01.mp4
│   │   ├── wisdom-1_scene_02.mp4
│   │   └── ... (one per scene)
│   └── wisdom-1_video.mp4      # Final stitched video
```

---

## 🎭 Voice Customization Options

### For gTTS (Free):
```python
# Enhanced male voice setup with post-processing
generate_audio_gtts(text, filename, lang='en', tld='co.in')  
# Includes pitch lowering and normalization for masculine sound
```

### For ElevenLabs (Premium):
```python
# Switch voices by changing the voice ID:
url = "https://api.elevenlabs.io/v1/text-to-speech/[VOICE_ID]"
```

---

## 🔧 Troubleshooting

**Common Issues:**

1. **API errors (MiniMax/Proxy)**
   - Verify `MINIMAX_API_KEY`
   - Check `MINIMAX_API_URL` or provider status
   - Inspect notebook logs for response details

2. **Rate limiting**
   - Respect provider limits
   - Add delays between requests (already included)

3. **Audio quality concerns**
   - Use ElevenLabs for better quality
   - gTTS is great for testing/prototyping

4. **Memory issues**
   - Use Google Colab with GPU for heavier models
   - Process stories one at a time if needed

---

## 💡 Cost Optimization Tips

- Start with gTTS for voice (free)
- Batch scene generation if supported by your provider

---

## 📞 Support

- Verify keys and network connectivity
- Run one story at a time first
- Check the notebook output for specific error messages