Simple birthday webpage

Open `index.html` in a browser to view the page.

- Click `Wish` to display: "Happy Birthday Manaswini"
- Click `Add Message` to prepend a message card with a photo

To serve locally (optional):

```bash
# Python 3
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Adding the Lord Balaji image
- Save the image file you attached (or any image) as `balaji.jpg` inside the `assets` folder: `birthday-site/assets/balaji.jpg`.
- When you click the Message button, the site will automatically show this image to the right of the message (if the file exists).
