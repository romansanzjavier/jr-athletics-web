#!/usr/bin/env python3
"""Genera las versiones de 800, 1600 y 2400 px de ancho de cada foto JPG.

Uso:
    pip install Pillow
    python3 herramientas/preparar-imagenes.py media/producto/*.jpg

Para cada foto.jpg crea foto-800.jpg, foto-1600.jpg y foto-2400.jpg en la
misma carpeta (solo las que sean más pequeñas que el original). El original
no se toca. Se ignoran los archivos que ya terminan en -800, -1600 o -2400.
"""
import re
import sys
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit('Falta Pillow. Instálalo con: pip install Pillow')

ANCHURAS = (800, 1600, 2400)
CALIDAD = 80


def preparar(ruta: Path) -> None:
    if re.search(r'-(800|1600|2400)$', ruta.stem):
        return
    with Image.open(ruta) as im:
        im = ImageOps.exif_transpose(im).convert('RGB')
        icc = im.info.get('icc_profile')
        print(f'{ruta}  ({im.width}x{im.height})')
        for ancho in ANCHURAS:
            # Si el original es más estrecho, la versión más grande usa su ancho real.
            w = min(ancho, im.width)
            h = round(im.height * w / im.width)
            destino = ruta.with_name(f'{ruta.stem}-{ancho}.jpg')
            copia = im if w == im.width else im.resize((w, h), Image.LANCZOS)
            opciones = dict(quality=CALIDAD, optimize=True, progressive=True)
            if icc:
                opciones['icc_profile'] = icc
            copia.save(destino, 'JPEG', **opciones)
            print(f'  -> {destino.name}  {w}x{h}  {destino.stat().st_size // 1024} KB')


def main() -> None:
    rutas = [Path(p) for p in sys.argv[1:]]
    if not rutas:
        sys.exit(__doc__)
    for ruta in rutas:
        if ruta.suffix.lower() in ('.jpg', '.jpeg') and ruta.is_file():
            preparar(ruta)


if __name__ == '__main__':
    main()
