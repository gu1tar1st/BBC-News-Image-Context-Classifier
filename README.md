# BBC News Image Context Classifier

A Flask-powered image context classifier that uses the [BLIP model](https://huggingface.co/Salesforce/blip-image-captioning-base) from Hugging Face to interpret and label BBC News images based on their semantic and situational context.

---

## 📦 Version

**Current Version:** `v2.2`  
**Status:** Deployed  
**First Release:** Oct 15, 2025  
**Last Updated:** November 15, 2025 

---

## 🚀 Features

- 🔍 Uses BLIP for image captioning and context extraction
- 🖼️ Classifies BBC News images into thematic categories (e.g., conflict, celebration, diplomacy)
- 🧠 Combines visual and textual cues for richer interpretation
- 🧪 Interactive Gradio interface for testing and exploration

---

## 📈 Upcoming updates
- Update recognition speed

---

## 🔧 Installation (local)

```bash
# 1. Clone the repository
git clone https://github.com/gu1tar1st/BBC-News-Image-Context-Classifier.git
cd BBC-News-Image-Context-Classifier

# 2. Create a virtual environment
python -m venv venv

# 3. Activate the environment
# On macOS/Linux:
source venv/bin/activate
# On Windows (CMD):
venv\Scripts\activate
# On Windows (PowerShell):
.\venv\Scripts\Activate.ps1

# 4. Install dependencies
pip install requests bs4 transformers torch gradio langchain

# 5.1. Run the Gradio app (adjust for use)
# python index.py

# 5.2. Run the Flask app (locally)
./run
```

---
Nov 15, 2025 | Henry Vu
