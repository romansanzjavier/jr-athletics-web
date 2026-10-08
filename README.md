# jr-athletics-web

Web oficial de JR ATHLETICS · [jrathleticsfit.com](https://jrathleticsfit.com/)

HTML, CSS y JavaScript puros, sin frameworks ni paso de compilación. Pensada para GitHub Pages (todas las rutas son relativas). Sin cookies, sin analítica y sin scripts de terceros.

## Archivos

| Archivo | Qué es |
| --- | --- |
| `index.html` | La página principal (una sola página, de la portada al pie) |
| `styles.css` | Todos los estilos |
| `main.js` | **Bloque de datos del producto** (arriba del todo) y el funcionamiento de la web |
| `aviso-legal.html`, `privacidad.html` | Páginas legales |
| `404.html` | Página de error con la estética de la marca |
| `fonts/` | Inter en woff2 (400, 500, 600, 700, 800) y su licencia OFL |
| `media/` | Fotos, vídeos y logos. Lee `media/LEEME.txt` |
| `media/provisional/` | Recortes y versiones reducidas de las fotos provisionales (se borra al final) |
| `herramientas/preparar-imagenes.py` | Genera las versiones de 800, 1600 y 2400 px de cada foto |

## Cambios habituales

- **Enlace de Amazon:** en `main.js`, `DATOS.enlaces.amazon` (se aplica a todos los botones). También puedes pegarlo en cada enlace marcado con `<!-- ENLACE DE AMAZON -->` en `index.html`.
- **Datos del producto, tabla de especificaciones, contenido de la caja y bandas:** en `main.js`, bloque `DATOS`. Lo que vale `null` no se muestra.
- **Email de contacto:** `DATOS.enlaces.email` en `main.js` y los datos del titular en `aviso-legal.html`.
- **Fotos definitivas:** busca `PENDIENTE: sustituir por media/` en `index.html`.
- **Logos y vídeos:** basta con subirlos a `media/` con el nombre exacto; la web los usa sola.

Para ver todo lo pendiente: busca `PENDIENTE` y `BORRADOR` en el proyecto.
