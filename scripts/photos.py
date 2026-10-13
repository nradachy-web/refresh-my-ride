"""Build the site's photo sources from the originals in _source/media.

Every photo is Refresh My Ride's own (their media library, pulled 2026-10-13).
Output: src/assets/photos/<id>.jpg, EXIF-rotated, cropped where noted, long side
capped. Astro then makes the AVIF/WebP sizes at build time. Originals are not
committed (see .gitignore); rerun this script after adding one to _source/media.

Crops are fractions (left, top, right, bottom) of the rotated original.
"""
from pathlib import Path
from PIL import Image, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "_source" / "media"
OUT = ROOT / "src" / "assets" / "photos"
BRAND = ROOT / "src" / "assets" / "brand"
PUBLIC = ROOT / "public"
MAX = 2200

# id: (source file, crop or None)
PHOTOS = {
    # people at work
    "josh-polishing-corvette": ("2026_10_IMG_8281-scaled.jpg", None),
    "team-polishing-mercury": ("2026_08_guys-polishing.jpg", None),
    "tech-polishing-mustang": ("2026_08_mustang-polish.jpg", None),
    "josh-portrait": ("2026_10_f.jpg", None),
    # the shop
    "shop-interior": ("2026_09_IMG_8464-scaled.jpg", (0, 0.08, 1, 0.78)),
    "shop-grand-opening": ("2026_10_75AF774C-8B56-4885-BD37-B8916D3D56AD.png", (0, 0, 0.8, 1)),
    "corvette-purple-shop": ("2026_08_corvette-wide-website.png", None),
    # finished vehicles
    "bmw-x6-blue": ("2026_08_IMG_8026.jpg", None),
    "silverado-black": ("2026_08_IMG_7571-scaled.jpg", None),
    "bentley-flying-spur": ("2026_08_IMG_7775-scaled.jpg", (0, 0.12, 1, 0.92)),
    "ferrari-roma": ("2026_08_ferrari-roma-ceramic-coating.jpg", None),
    "porsche-suv-blue": ("2026_08_porsche-suv-ceramic-coating.jpg", None),
    "corvette-gray": ("2026_09_IMG_8518-scaled.jpg", (0, 0.1, 1, 0.9)),
    "tesla-model-y": ("2026_09_IMG_8666-scaled.jpg", (0, 0.18, 1, 0.9)),
    "gmc-truck-white": ("2026_09_IMG_8751-scaled.jpg", (0, 0.3, 1, 0.86)),
    "cadillac-sedan-black": ("2026_08_IMG_7617-scaled.jpg", (0, 0.3, 1, 0.77)),
    "chevy-suv-black": ("2026_08_IMG_7644-scaled.jpg", (0, 0.335, 1, 0.76)),
    "bmw-sedan-white": ("2026_08_IMG_7762-scaled.jpg", (0, 0.18, 1, 0.74)),
    "bmw-7-series": ("2026_08_IMG_8050-scaled.jpg", (0, 0.3, 1, 0.7)),
    "ram-truck-white": ("2026_08_IMG_8142-scaled.jpg", (0, 0.32, 1, 0.88)),
    "escalade-black": ("2026_08_IMG_8252-scaled.jpg", (0, 0.405, 1, 0.765)),
    "jeep-grand-cherokee": ("2026_08_IMG_8295-scaled.jpg", (0, 0.34, 1, 0.8)),
    "ford-super-duty-white": ("2026_08_IMG_6823-scaled.jpg", (0.09, 0.1, 1, 0.92)),
    "cybertruck": ("2026_08_IMG_4709-scaled.jpg", (0, 0.3, 1, 0.86)),
    "porsche-wheel": ("2026_08_IMG_4562-scaled.jpg", (0, 0.1, 1, 0.9)),
    # mobile and valet. The yard sign carries an old phone number: the van crop keeps
    # only the sign's heading ("Auto detailing in progress"), the BMW crop loses the sign.
    "mobile-van": ("2026_09_IMG_1045-scaled.jpg", (0.02, 0.22, 0.98, 0.562)),
    "mobile-bmw-driveway": ("2026_08_bmw-x6-mobile-detailing.jpg", (0, 0.22, 0.555, 0.86)),
    "accord-trunk-kit": ("2026_09_IMG_7071-scaled.jpg", None),
    # interiors
    "interior-alfa-red": ("2026_08_IMG_3880-scaled.jpg", (0, 0, 1, 0.86)),
    "interior-shelby": ("2026_08_shelby-cobra-interior-detailing.jpg", None),
    "interior-convertible": ("2026_09_IMG_8363-scaled.jpg", (0, 0.43, 1, 1)),
    "interior-bmw": ("2026_08_IMG_8478-scaled.jpg", (0, 0.2, 0.6, 0.86)),
    "interior-ford": ("2026_08_IMG_4032-scaled-e1787845836726.jpeg", None),
}

# Regions darkened after cropping, as fractions of the cropped photo. None in use.
# Several crops above exist to keep things out of frame: the BMW interior is cut
# to the wheel and seat because its navigation screen shows a street name and
# coordinates that may be a customer's; escalade-black, chevy-suv-black,
# ford-super-duty-white, shop-grand-opening and interior-convertible lose other
# businesses' signs and a bystander's licence plate.
BLUR = {}

# before/after pairs, both cropped to the same 4:5 frame so the slider lines up
PAIRS = {
    "ba-silverado": ("2026_08_IMG_8032-scaled.jpg", "2026_08_IMG_8056-scaled.jpg"),
    "ba-miata": ("2026_08_IMG_1190-scaled.jpg", "2026_08_IMG_1214-scaled.jpg"),
    "ba-corvette": ("2026_08_IMG_7306-scaled.jpg", "2026_08_IMG_7305-scaled.jpg"),
    "ba-seat": ("2026_08_IMG_4892.jpg", "2026_08_IMG_4893.jpg"),
}



def load(name):
    im = Image.open(SRC / name)
    im = ImageOps.exif_transpose(im)
    return im.convert("RGB")


def crop_frac(im, box):
    w, h = im.size
    l, t, r, b = box
    return im.crop((round(l * w), round(t * h), round(r * w), round(b * h)))


def cap(im, limit=MAX):
    if max(im.size) > limit:
        im.thumbnail((limit, limit), Image.LANCZOS)
    return im


def center_ratio(im, ratio):
    w, h = im.size
    if w / h > ratio:
        nw = round(h * ratio)
        x = (w - nw) // 2
        return im.crop((x, 0, x + nw, h))
    nh = round(w / ratio)
    y = (h - nh) // 2
    return im.crop((0, y, w, y + nh))


def key_black(im):
    """Black-background logo -> transparent. Alpha is the brightest channel,
    colour is un-premultiplied so the edges stay clean on any dark ground."""
    im = im.convert("RGB")
    px = im.load()
    out = Image.new("RGBA", im.size)
    op = out.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b = px[x, y]
            a = max(r, g, b)
            if a < 10:
                op[x, y] = (0, 0, 0, 0)
            else:
                op[x, y] = (min(255, r * 255 // a), min(255, g * 255 // a), min(255, b * 255 // a), a)
    return out.crop(out.getbbox())


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    BRAND.mkdir(parents=True, exist_ok=True)
    for pid, (name, box) in PHOTOS.items():
        im = load(name)
        if box:
            im = crop_frac(im, box)
        for l, t, r, b in BLUR.get(pid, []):
            w, h = im.size
            region = (round(l * w), round(t * h), round(r * w), round(b * h))
            patch = im.crop(region).filter(ImageFilter.GaussianBlur(radius=max(w, h) / 40))
            patch = Image.blend(patch, Image.new("RGB", patch.size, (10, 10, 12)), 0.86)
            im.paste(patch, region)
        cap(im).save(OUT / f"{pid}.jpg", quality=90, optimize=True, progressive=True)
        print(f"{pid:28s} {im.size}")
    for pid, (before, after) in PAIRS.items():
        for label, name in (("before", before), ("after", after)):
            im = cap(center_ratio(load(name), 4 / 5), 1600)
            im.save(OUT / f"{pid}-{label}.jpg", quality=88, optimize=True, progressive=True)
        print(f"{pid:28s} pair {im.size}")
    # logos: wordmark for the header and footer, icon for favicons
    word = key_black(Image.open(SRC / "2026_08_BLACK-BACKGROUND-NO-AD-LOGO-MAY2026.png"))
    word.save(BRAND / "logo-wordmark.png")
    full = key_black(Image.open(SRC / "2026_08_STANDARD-AD-BLACK.png"))
    full.save(BRAND / "logo-full.png")
    print("wordmark", word.size, "full", full.size)
    icon = Image.open(SRC / "2026_08_RMR-ICON-JUNE.png").convert("RGB")
    for size, fname in ((32, "favicon-32.png"), (48, "favicon-48.png"), (180, "apple-touch-icon.png"), (192, "icon-192.png"), (512, "icon-512.png")):
        icon.resize((size, size), Image.LANCZOS).save(PUBLIC / fname, optimize=True)
    icon.resize((48, 48), Image.LANCZOS).save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])


if __name__ == "__main__":
    main()
