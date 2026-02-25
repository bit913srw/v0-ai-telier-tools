from PIL import Image
import numpy as np

img = Image.open("/vercel/share/v0-project/scripts/source-sticky-note.png").convert("RGBA")
data = np.array(img)

# Detect near-white pixels (background) - high R, G, B values
r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]

# White/near-white background threshold
threshold = 235
is_white = (r > threshold) & (g > threshold) & (b > threshold)

# Also check for light gray edges (slightly lower threshold for smooth transition)
soft_threshold = 220
is_near_white = (r > soft_threshold) & (g > soft_threshold) & (b > soft_threshold)

# The sticky note is yellow-ish, tape is white but with texture
# We need to keep the tape (white with texture/shadows) but remove flat white bg
# Strategy: flood-fill from corners/edges to find connected white regions

from scipy import ndimage

# Create a mask of definitely-white pixels
white_mask = is_white.astype(np.uint8)

# Label connected components of white regions
labeled, num_features = ndimage.label(white_mask)

# Find which labels touch the image borders (these are background)
border_labels = set()
h, w = white_mask.shape
# Top and bottom rows
for x in range(w):
    if labeled[0, x] > 0:
        border_labels.add(labeled[0, x])
    if labeled[h-1, x] > 0:
        border_labels.add(labeled[h-1, x])
# Left and right columns
for y in range(h):
    if labeled[y, 0] > 0:
        border_labels.add(labeled[y, 0])
    if labeled[y, w-1] > 0:
        border_labels.add(labeled[y, w-1])

# Create background mask - only white regions connected to borders
bg_mask = np.zeros_like(white_mask, dtype=bool)
for label in border_labels:
    bg_mask |= (labeled == label)

# Dilate the background mask slightly to catch edge artifacts
bg_mask_dilated = ndimage.binary_dilation(bg_mask, iterations=2)

# Create soft alpha transition at edges
# Distance from background for feathering
dist = ndimage.distance_transform_edt(~bg_mask_dilated)
feather_width = 3
alpha_factor = np.clip(dist / feather_width, 0, 1)

# Apply transparency
new_alpha = (alpha_factor * 255).astype(np.uint8)
# Keep original alpha where it was already set, use new alpha for background
data[:,:,3] = np.minimum(a, new_alpha)

result = Image.fromarray(data)

# Crop to content (non-transparent bounding box)
bbox = result.getbbox()
if bbox:
    result = result.crop(bbox)

result.save("/vercel/share/v0-project/public/images/sticky-note.png")
print(f"Saved! Size: {result.size}")
