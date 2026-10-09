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
| `CNAME` | Dominio propio para GitHub Pages (jrathleticsfit.com). No lo borres |
| `fonts/` | Inter en woff2 (400, 500, 600, 700, 800) y su licencia OFL |
| `media/` | Fotos, vídeos y logos. Lee `media/LEEME.txt` |
| `media/relleno/` | Recortes de las fotos de frente, perfil y pack que rellenan los huecos sin foto específica |
| `herramientas/preparar-imagenes.py` | Genera las versiones de 800, 1600 y 2400 px de cada foto |

## Cambios habituales

- **Enlace de Amazon:** está escrito en cada botón de `index.html` (busca `ENLACE DE AMAZON`) y en `main.js`, `DATOS.enlaces.amazon`. Si cambia, cámbialo en los dos sitios. Cada botón lleva `data-cta` con su sitio (header, hero, tx11, faq, final, barra-movil) para poder medir clics en el futuro.
- **Datos del producto, tabla de especificaciones, contenido de la caja y bandas:** en `main.js`, bloque `DATOS`. Lo que vale `null` no se muestra.
- **Email de contacto:** `DATOS.enlaces.email` en `main.js` y los datos del titular en `aviso-legal.html`.
- **Fotos:** cada hueco de `index.html` lleva un comentario con la foto específica que puede ir ahí (busca `Relleno:`).
- **Vídeos:** súbelos a `media/` con el nombre exacto y cambia su `false` por `true` en `main.js` (`DATOS.videos`).
- **Logo:** `media/logo/` (SVG y PNG sacados del PDF vectorial).

Para ver todo lo pendiente: busca `PENDIENTE` y `BORRADOR` en el proyecto.
