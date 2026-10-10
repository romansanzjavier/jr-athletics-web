/* =========================================================================
   JR ATHLETICS · main.js
   JavaScript puro, sin librerías ni scripts de terceros. Sin cookies.
   ========================================================================= */


/* =========================================================================
   BLOQUE DE DATOS — edita aquí y la web se actualiza sola.
   Solo datos confirmados por el fabricante. Lo que vale null NO se muestra.
   ========================================================================= */
var DATOS = {

  producto: {
    marca: 'JR ATHLETICS',
    modelo: 'TX-11',
    nombre: 'Banco de musculación regulable TX-11'
  },

  /* Cifras que aparecen en varios textos de la página (titulares, tarjetas,
     tabla). Cámbialas aquí y se actualizan en todos los sitios a la vez. */
  cifras: {
    respaldo: 6,      // posiciones del respaldo
    predicador: 3,    // alturas del soporte predicador
    carga: 300,       // kg de CARGA ESTÁTICA (no es peso máximo de usuario)
    bandas: 4         // bandas de resistencia incluidas
  },

  /* Enlaces. La URL de Amazon está también escrita en cada botón del HTML, para
     que funcionen aunque falle el JavaScript. Si cambia, cámbiala en los dos sitios. */
  enlaces: {
    amazon: 'https://www.amazon.es/dp/B0HGLFN5TQ',   // ENLACE DE AMAZON (ficha del TX-11)
    instagram: 'https://www.instagram.com/jr.athleticsfit/',
    email: ''         // PENDIENTE: email de contacto (se muestra en Contacto al rellenarlo)
  },

  /* Tabla de especificaciones. {respaldo}, {predicador} y {carga} se sustituyen
     por las cifras de arriba. Las filas con valor null no se muestran. */
  especificaciones: [
    { etiqueta: 'Respaldo', valor: 'Regulable en {respaldo} posiciones' },
    { etiqueta: 'Posiciones de uso', valor: 'Plano e inclinado' },
    { etiqueta: 'Soporte predicador', valor: 'Regulable en {predicador} alturas' },
    { etiqueta: 'Extensión de piernas', valor: 'Accesorio frontal' },
    { etiqueta: 'Estructura', valor: 'Plegable' },
    { etiqueta: 'Acolchado', valor: 'Alta densidad' },
    { etiqueta: 'Rodillos y reposapiés', valor: 'Rodillos inferiores de sujeción y tubo reposapiés con empuñaduras' },
    { etiqueta: 'Soporte para mancuerna', valor: 'Con collarín de sujeción' },
    { etiqueta: 'Seguridad', valor: 'Pasadores de seguridad' },
    { etiqueta: 'Acabado', valor: 'Ribetes en cian y logo JR grabado en el respaldo' },
    { etiqueta: 'Carga estática', valor: 'Soporta {carga} kg de carga estática' },
    // PENDIENTE: datos que aún no están confirmados (no se muestran mientras sean null)
    { etiqueta: 'Medidas', valor: null },
    { etiqueta: 'Peso del producto', valor: null },
    { etiqueta: 'Peso máximo de usuario', valor: null },
    { etiqueta: 'Garantía', valor: null }
  ],

  /* Contenido de la caja (EL PACK y la pregunta "¿Qué incluye la caja?") */
  pack: [
    'El banco TX-11 con todas sus piezas',
    '{bandas} bandas elásticas de resistencia de distinta dureza: amarilla, roja, negra y morada',
    'Bolsa de transporte de las bandas con el logo JR ATHLETICS',
    'Manual de usuario impreso en español',
    'Llave fija y toda la tornillería para el montaje'
  ],

  /* Bandas: color y muestra. "resistencia" y "dureza" están PENDIENTES:
     mientras valgan null no se muestran. El orden de la lista NO indica dureza. */
  bandas: [
    { color: 'Amarilla', muestra: '#e9b02c', dureza: null, resistencia: null },
    { color: 'Roja',     muestra: '#c8242c', dureza: null, resistencia: null },
    { color: 'Negra',    muestra: '#0c0c0e', dureza: null, resistencia: null },
    { color: 'Morada',   muestra: '#6a3d9a', dureza: null, resistencia: null }
  ],

  /* Datos aún sin confirmar. No se muestran en ninguna parte de la web.
     PENDIENTE: medidas, peso del producto, peso máximo de usuario,
     resistencia de cada banda, material de las bandas, precio y garantía. */
  pendientes: {
    medidas: null,
    pesoProducto: null,
    pesoMaximoUsuario: null,
    materialBandas: null,
    precio: null,
    garantia: null
  },

  /* VÍDEOS. Sube cada archivo a su carpeta con el nombre exacto y cambia aquí
     su false por true. Mientras esté en false, la web no lo pide (así no hay
     errores en la consola) y se ve la foto de portada de ese hueco. */
  videos: {
    'media/hero/hero-loop.mp4': false,                 // portada, horizontal
    'media/hero/hero-loop-vertical.mp4': false,        // portada, vertical (móvil)
    'media/video/tx11-60s.mp4': false,                 // vídeo del producto (botón "Ver vídeo")
    'media/entreno/curl-predicador.mp4': false,
    'media/entreno/extension-piernas.mp4': false,
    'media/entreno/abdominales-declive.mp4': false,
    'media/entreno/sentado-banda.mp4': false
  },

  /* Vídeo de 60 s en YouTube (opcional, en lugar del archivo propio). Pon solo el
     ID del vídeo (lo que va tras "v=" en la URL): el reproductor (youtube-nocookie)
     se carga SOLO al pulsar play. Si lo usas, descomenta el párrafo de YouTube en
     privacidad.html. */
  multimedia: {
    video60: 'media/video/tx11-60s.mp4',
    videoYouTube: ''
  }
};


/* =========================================================================
   A partir de aquí, el funcionamiento de la web. No hace falta tocarlo.
   ========================================================================= */
(function () {
  'use strict';

  var root = document.documentElement;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  var reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  var saveData = !!(conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || '')));
  // Bucles de vídeo automáticos: nunca con "reducir movimiento" ni con ahorro de datos.
  var autoplayAllowed = function () { return !reduceMotionQuery.matches && !saveData; };
  var hasIO = 'IntersectionObserver' in window;

  /* Sustituye {clave} por la cifra correspondiente de DATOS.cifras */
  function fill(text) {
    return String(text).replace(/\{(\w+)\}/g, function (m, key) {
      return Object.prototype.hasOwnProperty.call(DATOS.cifras, key) ? DATOS.cifras[key] : m;
    });
  }

  /* ---------------------------------------------------------------------
     1. Datos → página
     --------------------------------------------------------------------- */
  function applyData() {
    // Cifras dentro de los textos
    $$('[data-cifra]').forEach(function (el) {
      var v = DATOS.cifras[el.getAttribute('data-cifra')];
      if (v !== undefined && v !== null) el.textContent = v;
    });

    // Tabla de especificaciones (solo filas con dato)
    $$('[data-lista="especificaciones"]').forEach(function (tbody) {
      tbody.textContent = '';
      DATOS.especificaciones.forEach(function (row) {
        if (row.valor === null || row.valor === undefined || row.valor === '') return;
        var tr = document.createElement('tr');
        var th = document.createElement('th');
        var td = document.createElement('td');
        th.scope = 'row';
        th.textContent = row.etiqueta;
        td.textContent = fill(row.valor);
        tr.appendChild(th);
        tr.appendChild(td);
        tbody.appendChild(tr);
      });
    });

    // Contenido de la caja
    $$('[data-lista="pack"]').forEach(function (list) {
      list.textContent = '';
      DATOS.pack.forEach(function (item) {
        var li = document.createElement('li');
        li.textContent = fill(item);
        list.appendChild(li);
      });
    });

    // Muestras de color de las bandas
    $$('[data-lista="bandas"]').forEach(function (list) {
      list.textContent = '';
      DATOS.bandas.forEach(function (b) {
        var li = document.createElement('li');
        li.className = 'swatch';
        var chip = document.createElement('span');
        chip.className = 'swatch-chip';
        chip.setAttribute('aria-hidden', 'true');
        chip.style.setProperty('--c', b.muestra);
        var name = document.createElement('span');
        name.className = 'swatch-name';
        name.textContent = b.color;
        li.appendChild(chip);
        li.appendChild(name);
        list.appendChild(li);
      });
    });

    // Enlaces de compra: misma URL en todos, en pestaña nueva
    $$('[data-amazon]').forEach(function (a) {
      if (DATOS.enlaces.amazon) a.href = DATOS.enlaces.amazon;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    });

    $$('[data-instagram]').forEach(function (a) {
      if (DATOS.enlaces.instagram) a.href = DATOS.enlaces.instagram;
    });

    // Email de contacto (solo si existe)
    var email = (DATOS.enlaces.email || '').trim();
    if (email) {
      $$('[data-email-item]').forEach(function (li) { li.hidden = false; });
      $$('[data-email]').forEach(function (a) { a.href = 'mailto:' + email; });
      $$('[data-email-text]').forEach(function (s) { s.textContent = email; });
    }

    // Año del pie
    $$('[data-year]').forEach(function (s) { s.textContent = String(new Date().getFullYear()); });
  }

  /* ---------------------------------------------------------------------
     2. Cabecera: transparente sobre la portada, sólida al hacer scroll
     --------------------------------------------------------------------- */
  function header() {
    var el = $('[data-header]');
    if (!el || document.body.classList.contains('page-simple')) return;
    var ticking = false;
    var update = function () {
      el.classList.toggle('is-solid', window.scrollY > 24);
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------------------------------------------------------------------
     3. Menú móvil a pantalla completa (accesible)
     --------------------------------------------------------------------- */
  function menu() {
    var toggle = $('[data-menu-toggle]');
    var nav = $('[data-menu]');
    if (!toggle || !nav) return;
    var label = $('[data-menu-label]', toggle);
    var desktop = window.matchMedia('(min-width: 1024px)');

    function setOpen(open, returnFocus) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (label) label.textContent = open ? 'Cerrar menú' : 'Abrir menú';
      root.classList.toggle('menu-open', open);
      if (open) {
        var first = $('a', nav);
        if (first) window.setTimeout(function () { first.focus(); }, 50);
      } else if (returnFocus) {
        toggle.focus();
      }
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true', false);
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a') && root.classList.contains('menu-open')) setOpen(false, false);
    });

    document.addEventListener('keydown', function (e) {
      if (!root.classList.contains('menu-open')) return;
      if (e.key === 'Escape') { setOpen(false, true); return; }
      if (e.key === 'Tab') {
        // Mantiene el foco dentro del menú abierto
        var items = [toggle].concat($$('a, button', nav));
        var firstEl = items[0];
        var lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
      }
    });

    var onChange = function () { if (desktop.matches) setOpen(false, false); };
    if (desktop.addEventListener) desktop.addEventListener('change', onChange);
  }

  /* ---------------------------------------------------------------------
     4. Aparición al hacer scroll
     --------------------------------------------------------------------- */
  function reveal() {
    var items = $$('.reveal');
    if (!hasIO || reduceMotionQuery.matches) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------------------
     5. Vídeos
     - Solo se cargan los marcados como disponibles en DATOS.videos; si no, se
       queda la imagen de portada (y no se pide ningún archivo que no exista).
     - Se pausan fuera de pantalla y cuando la pestaña no está visible.
     --------------------------------------------------------------------- */
  var activeVideos = [];

  function videoReady(path) {
    return !!(path && DATOS.videos && DATOS.videos[path] === true);
  }

  function playSafe(video) {
    var p = video.play();
    if (p && typeof p.catch === 'function') p.catch(function () {});
  }

  function watchVisibility(video, onEnter) {
    if (!hasIO) { onEnter(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        video._inView = entry.isIntersecting;
        if (entry.isIntersecting) onEnter();
        else if (!video.paused) video.pause();
      });
    }, { threshold: 0.25 });
    io.observe(video.parentNode);
  }

  function heroVideo() {
    var video = $('[data-hero-video]');
    if (!video) return;
    if (!autoplayAllowed()) { video.remove(); return; }

    var vertical = video.getAttribute('data-src-vertical');
    var horizontal = video.getAttribute('data-src');
    var portrait = window.matchMedia('(max-aspect-ratio: 4/5)').matches;
    var queue = ((portrait && vertical) ? [vertical, horizontal] : [horizontal]).filter(videoReady);
    if (!queue.length) { video.remove(); return; }

    function tryNext() {
      var src = queue.shift();
      if (!src) { video.remove(); return; }
      video.src = src;
      video.load();
    }

    video.addEventListener('error', tryNext);
    video.addEventListener('canplay', function () { if (video._inView !== false) playSafe(video); });
    video.addEventListener('playing', function () { video.classList.add('is-playing'); });
    activeVideos.push(video);
    watchVisibility(video, function () { if (video.src && video.paused) playSafe(video); });

    // Se empieza a cargar después de la imagen de portada, para no retrasarla.
    var start = function () { window.setTimeout(tryNext, 300); };
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
  }

  function loops() {
    $$('video[data-loop]').forEach(function (video) {
      if (!autoplayAllowed() || !videoReady(video.getAttribute('data-loop'))) { video.remove(); return; }
      video.addEventListener('error', function () { video.remove(); });
      video.addEventListener('playing', function () { video.classList.add('is-playing'); });
      activeVideos.push(video);
      watchVisibility(video, function () {
        if (!video.getAttribute('src')) {
          video.src = video.getAttribute('data-loop');
          video.load();
        }
        playSafe(video);
      });
    });
  }

  document.addEventListener('visibilitychange', function () {
    activeVideos.forEach(function (v) {
      if (!v.isConnected) return;
      if (document.hidden) v.pause();
      else if (v._inView && v.getAttribute('src')) playSafe(v);
    });
  });

  /* Vídeo de 60 s en ventana modal (se cierra con Escape o con un clic fuera) */
  function film() {
    var openBtn = $('[data-film-open]');
    var modal = $('[data-film-modal]');
    var player = $('[data-film-player]');
    var closeBtn = $('[data-film-close]');
    if (!openBtn || !modal || !player) return;

    var ytId = (DATOS.multimedia.videoYouTube || '').trim();
    var file = DATOS.multimedia.video60;

    function enable() { openBtn.hidden = false; }

    // El botón "Ver vídeo" solo aparece si hay vídeo (YouTube o archivo marcado como disponible).
    if (ytId || videoReady(file)) enable();

    function open() {
      player.textContent = '';
      if (ytId) {
        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(ytId) + '?autoplay=1&rel=0&modestbranding=1&playsinline=1';
        iframe.title = 'Vídeo del TX-11';
        iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        iframe.allowFullscreen = true;
        player.appendChild(iframe);
      } else {
        var v = document.createElement('video');
        v.src = file;
        v.controls = true;
        v.playsInline = true;
        v.preload = 'auto';
        var poster = $('.film-poster');
        if (poster && poster.currentSrc) v.poster = poster.currentSrc;
        player.appendChild(v);
        playSafe(v);
      }
      if (typeof modal.showModal === 'function') modal.showModal();
      else modal.setAttribute('open', '');
      if (closeBtn) closeBtn.focus();
    }

    function close() {
      if (modal.open && typeof modal.close === 'function') modal.close();
      else modal.removeAttribute('open');
    }

    modal.addEventListener('close', function () {
      player.textContent = '';   // detiene y descarga el vídeo
      openBtn.focus();
    });
    openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    // Clic fuera del vídeo (en el fondo oscuro)
    modal.addEventListener('click', function (e) {
      if (e.target === modal) close();
    });
  }

  /* Carruseles deslizables (móvil y tableta): se pueden recorrer con el teclado
     y tienen nombre para lectores de pantalla. En escritorio no se desplazan. */
  function scrollers() {
    var narrow = window.matchMedia('(max-width: 1023px)');
    var tracks = [
      [$('[data-versa-track]'), 'Posiciones del banco'],
      [$('.train-track'), 'Ejercicios con el banco']
    ].filter(function (t) { return t[0]; });
    function update() {
      tracks.forEach(function (t) {
        var el = t[0];
        // Las listas (<ul>) conservan su papel de lista; el resto pasa a ser una región con nombre
        var isList = el.tagName === 'UL' || el.tagName === 'OL';
        if (narrow.matches) {
          el.setAttribute('tabindex', '0');
          if (!isList) el.setAttribute('role', 'region');
          el.setAttribute('aria-label', t[1] + ' (desliza para ver más)');
        } else {
          el.removeAttribute('tabindex');
          if (!isList) el.removeAttribute('role');
          el.removeAttribute('aria-label');
        }
      });
    }
    update();
    if (narrow.addEventListener) narrow.addEventListener('change', update);
  }

  /* ---------------------------------------------------------------------
     6. Versatilidad: selector con fundido (escritorio) / tarjetas (móvil)
     --------------------------------------------------------------------- */
  function versatility() {
    var wrap = $('[data-versa]');
    if (!wrap) return;
    var tabs = $$('[data-versa-tab]', wrap);
    var cards = $$('[data-versa-card]', wrap);
    var track = $('[data-versa-track]', wrap);
    var desktop = window.matchMedia('(min-width: 1024px)');

    function select(key) {
      tabs.forEach(function (t) {
        t.setAttribute('aria-pressed', t.getAttribute('data-versa-tab') === key ? 'true' : 'false');
      });
      cards.forEach(function (c) {
        c.classList.toggle('is-active', c.getAttribute('data-versa-card') === key);
      });
    }

    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t.getAttribute('data-versa-tab')); });
      t.addEventListener('keydown', function (e) {
        var next = null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (next) { e.preventDefault(); next.focus(); next.click(); }
      });
    });

    // En móvil, la tarjeta visible pasa a ser la activa (por si se gira a escritorio)
    if (hasIO && track) {
      var io = new IntersectionObserver(function (entries) {
        if (desktop.matches) return;
        entries.forEach(function (entry) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) select(entry.target.getAttribute('data-versa-card'));
        });
      }, { root: track, threshold: [0.6] });
      cards.forEach(function (c) { io.observe(c); });
    }
  }

  /* ---------------------------------------------------------------------
     7. Barra de compra en móvil: aparece tras la portada, se oculta mientras
        hay otro botón de compra en pantalla (para no duplicarlo) y en el pie.
     --------------------------------------------------------------------- */
  function buybar() {
    var bar = $('[data-buybar]');
    var hero = $('#portada');
    var footer = $('[data-footer]');
    if (!bar || !hero || !hasIO) return;
    var pastHero = false;
    var atFooter = false;
    var otherCtas = new Set();

    function update() {
      var show = pastHero && !atFooter && otherCtas.size === 0;
      bar.classList.toggle('is-visible', show);
      bar.setAttribute('aria-hidden', show ? 'false' : 'true');
      if (show) bar.removeAttribute('inert');
      else bar.setAttribute('inert', '');
    }

    new IntersectionObserver(function (entries) {
      var e = entries[0];
      pastHero = !e.isIntersecting && e.boundingClientRect.top < 0;
      update();
    }).observe(hero);

    if (footer) {
      new IntersectionObserver(function (entries) {
        atFooter = entries[0].isIntersecting;
        update();
      }).observe(footer);
    }

    // Botones de compra de la propia página (portada, TX-11 y llamada final)
    // (el margen superior descuenta la cabecera fija: un botón tapado por ella no cuenta)
    var ctaIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) otherCtas.add(e.target); else otherCtas.delete(e.target);
      });
      update();
    }, { rootMargin: '-64px 0px 0px 0px' });
    $$('main .btn[data-amazon]').forEach(function (a) { ctaIO.observe(a); });
  }

  /* --------------------------------------------------------------------- */
  function init() {
    applyData();
    header();
    menu();
    reveal();
    heroVideo();
    loops();
    film();
    scrollers();
    versatility();
    buybar();
    window.JR_LISTO = true;
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
