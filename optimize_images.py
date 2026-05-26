from PIL import Image
import os

def optimize_image(path, quality=80):
    try:
        img = Image.open(path)
        print(f"Optimizing {path}...")
        print(f"Original size: {os.path.getsize(path)} bytes")
        
        if path.endswith('.png'):
            # Convert to optimized PNG (Pillow optimizes by default on save)
            img.save(path, optimize=True, quality=quality)
        elif path.endswith('.webp'):
            img.save(path, 'WEBP', quality=quality)
            
        print(f"New size: {os.path.getsize(path)} bytes")
    except Exception as e:
        print(f"Error optimizing {path}: {e}")

optimize_image('public/blue-box.webp', quality=75)
optimize_image('public/logo.png', quality=80)
