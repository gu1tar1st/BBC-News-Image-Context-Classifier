from PIL import Image
from io import BytesIO
from transformers import AutoProcessor, BlipForConditionalGeneration

processor = AutoProcessor.from_pretrained("Salesforce/blip-image-captioning-base", use_fast=False)
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")


def captioning(raw_img):
    rgb_format = Image.open(BytesIO(raw_img)).convert('RGB') # BytesIO help convert UTF-8 type images to byte type
    inputs = processor(images=rgb_format, text='This image reveals', return_tensors="pt")

    outputs = model.generate(**inputs, max_length=100)
    caption = processor.decode(outputs[0], skip_special_tokens=True)
    return caption
