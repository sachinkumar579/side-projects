import pytesseract
from PIL import Image

# Path to the image file
image_path = '10.jpg'

# Open the image file
with Image.open(image_path) as img:
    # Use pytesseract to extract text
    text = pytesseract.image_to_string(img)

# Print the extracted text
print(text)
