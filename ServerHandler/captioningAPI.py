from ImgCaptioning.img_cap import captioning as en_caption
from bs4 import BeautifulSoup as bs_scrapper
import requests
import re  # Regex
import html

HEADERS = {"User-Agent": "Mozilla/5.0"}

def getImages(URL):
    response = requests.get(URL, headers=HEADERS)
    soup = bs_scrapper(response.text, 'html.parser')
    imgs = soup.find_all('img')  # Find images
    paths = {}
    for index, img in enumerate(imgs, start=0):
        img_url = img.get("src")  # Returns a string of url, not use srcset since require more handling

        if not img_url:
            continue
        # Filter SVG
        if img_url.endswith('.svg'):
            continue

        # Filter unnecessary images
        if "static.files.bbci.co.uk" in img_url:
            continue

        # Filter path difference in src
        if img_url.startswith('//'):
            img_url = "https:" + img_url
        elif img_url.startswith("/"):
            img_url = "https://ichef.bbci.co.uk" + img_url
        elif not img_url:
            continue

        paths[index] = img_url

    # for index2, img2 in enumerate(soup.find_all('span'), start=0):
    #     style = img2.get('style')
    #     if style:
    #         # Unescape HTML entities like &quot;
    #         style = html.unescape(style)
    #
    #         # Extract URL from style using regex
    #         match = re.search(r'url\(["\']?(.*?)["\']?\)', style)
    #         if match:
    #             paths[index2] = match.group(1)
    #             print("Whatsup")

    return paths

def captioning_with_filter(URL):
    if not ("bbc.com" in URL):
        return "Incorrect link, please use a URL containing bbc.com"
    response = requests.get(URL, headers=HEADERS)
    soup = bs_scrapper(response.text, 'html.parser')
    imgs = soup.find_all('img')  # Find images
    res = {}
    for index, img in enumerate(imgs, start=1):
        img_url = img.get("src")  # Returns a string of url, not use srcset since require more handling

        if not img_url:
            continue
        # Filter SVG
        if img_url.endswith('.svg'):
            continue

        # Filter path difference in src
        if img_url.startswith('//'):
            img_url = "https:" + img_url
        elif img_url.startswith("/"):
            img_url = "https://ichef.bbci.co.uk" + img_url
        elif not img_url:
            continue

        try:
            img_fetch = requests.get(img_url, timeout=10, headers=HEADERS)
            img_fetch.raise_for_status()  # Debugging

            caption = en_caption(img_fetch.content)
            res[img_url] = caption

        except requests.exceptions.RequestException as e:
            print(f"[Image {index}] Failed to fetch: {img_url} — {e}")
            continue
        except Exception as e:
            print(f"[Image {index}] Captioning failed: {img_url} — {e}")
            continue

    res_text = ""
    for each_key in res.keys():
        res_text += each_key + ": " + res[each_key] + "\n"
    return res_text
