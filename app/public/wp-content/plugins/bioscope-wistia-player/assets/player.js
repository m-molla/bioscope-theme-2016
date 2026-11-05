/* ═══════════════════════════════════════════
   BIOSCOPE PLAYER — bioscope-player.js
   Pair with bioscope-player.css
   Markup: .film-video-wrap > video.custom-video
           (+ optional select.native-video-quality for the quality menu)
   ═══════════════════════════════════════════ */
(function () {
  'use strict';

  var HIDE_DELAY = 2600;
  var SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];
  var players = [];

  function svg(inner, attrs, cls) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"' +
      (cls ? ' class="' + cls + '"' : '') + ' ' + (attrs || '') + '>' + inner + '</svg>';
  }
  var S = 'fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"';
  var ICON = {
    play:   svg('<path d="M8 5v14l11-7z"/>', 'data-play-icon'),
    pause:  svg('<path d="M6 5h4v14H6zM14 5h4v14h-4z"/>', 'data-pause-icon'),
    volOn:  svg('<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>', 'data-volume-on'),
    volOff: svg('<path d="M3 9v6h4l5 5V4L7 9H3zm13.6 3 2.2-2.2-1.4-1.4-2.2 2.2-2.2-2.2-1.4 1.4 2.2 2.2-2.2 2.2 1.4 1.4 2.2-2.2 2.2 2.2 1.4-1.4z"/>', 'data-volume-off'),
    gear:   svg('<path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.59-.22l-2.39.96a7 7 0 0 0-1.62-.94l-.36-2.54A.5.5 0 0 0 13.9 2h-3.84a.5.5 0 0 0-.49.42l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96a.5.5 0 0 0-.59.22L2.74 8.48a.5.5 0 0 0 .12.64l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.5.5 0 0 0-.12.64l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.25.42.49.42h3.84c.24 0 .44-.18.49-.42l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.01-1.58zM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2z"/>'),
    speed:  svg('<path d="M5.64 18.36A9 9 0 1 1 18.36 18.36" ' + S + ' stroke-width="2"/><path d="M12 13l4.2-4.2" ' + S + ' stroke-width="2"/>'),
    pip:    svg('<path d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98V5c0-1.1-.9-2-2-2zm0 16.01H3V4.98h18v14.03z"/>'),
    full:   svg('<path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>'),
    more:   svg('<path d="M15 5l-7 7 7 7" ' + S + ' stroke-width="2.4"/>', 'data-more'),
    less:   svg('<path d="M9 5l7 7-7 7" ' + S + ' stroke-width="2.4"/>', 'data-less'),
    check:  svg('<path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>', '', 'vp-check'),
    ring:   '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" style="fill:#fff;margin-left:3px"><path d="M8 5v14l11-7z"/></svg>'
  };

  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function fmt(s) {
    if (!isFinite(s) || s < 0) s = 0;
    var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = Math.floor(s % 60);
    return h ? h + ':' + pad(m) + ':' + pad(sec) : m + ':' + pad(sec);
  }
  function fmtTip(s) {
    if (!isFinite(s) || s < 0) s = 0;
    var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = Math.floor(s % 60);
    return (h ? h + ':' : '') + pad(m) + ':' + pad(sec);
  }

  /* Pointer-drag helper for custom sliders (mouse + touch + pen) */
  function dragSlider(el, rectEl, vertical, onMove, onStart, onEnd) {
    var active = false;
    function pos(e) {
      var r = rectEl.getBoundingClientRect();
      var p = vertical ? 1 - (e.clientY - r.top) / r.height : (e.clientX - r.left) / r.width;
      return clamp(p, 0, 1);
    }
    el.addEventListener('pointerdown', function (e) {
      if (e.button > 0) return;
      active = true;
      try { el.setPointerCapture(e.pointerId); } catch (err) {}
      if (onStart) onStart();
      onMove(pos(e), e);
      e.preventDefault();
    });
    el.addEventListener('pointermove', function (e) { if (active) onMove(pos(e), e); });
    function end() { if (!active) return; active = false; if (onEnd) onEnd(); }
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
  }


  function init(wrap) {
    var video = wrap.querySelector('video.custom-video');
    if (!video || wrap.dataset.vpInit) return;
    wrap.dataset.vpInit = '1';

    video.controls = false;
    video.removeAttribute('controls');
    video.setAttribute('playsinline', '');
    wrap.setAttribute('tabindex', '0');

    /* Quality select → data source for the menu, then hidden */
    var select = wrap.querySelector('select.native-video-quality') ||
                 (wrap.parentElement && wrap.parentElement.querySelector('select.native-video-quality'));
    var qualities = [];
    var currentQuality = '';
    if (select) {
      Array.prototype.forEach.call(select.options, function (o) {
        qualities.push({ label: o.textContent.trim(), value: o.value });
      });
      currentQuality = select.value;
      select.style.display = 'none';
    }
    var hasPip = !!(document.pictureInPictureEnabled && video.requestPictureInPicture) ||
                 !!video.webkitSetPresentationMode;

    /* Start overlay (reuse yours if present) */
    var overlay = wrap.querySelector('.film-play-overlay');
    if (!overlay) {
      overlay = document.createElement('button');
      overlay.type = 'button';
      overlay.className = 'film-play-overlay';
      overlay.innerHTML = '<span class="play-btn-ring"><i>' + ICON.ring + '</i></span>';
      wrap.appendChild(overlay);
    }
    overlay.classList.remove('native-video-start');
    overlay.setAttribute('aria-label', 'Play video');

    /* Build UI */
    var spinner = document.createElement('div');
    spinner.className = 'vp-spinner';
    wrap.appendChild(spinner);

    var controls = document.createElement('div');
    controls.className = 'vp-controls';
    controls.innerHTML =
      '<button type="button" class="vp-btn vp-play" aria-label="Play">' + ICON.play + ICON.pause + '</button>' +
      '<div class="vp-panel">' +
        '<div class="vp-progress" role="slider" tabindex="0" aria-label="Seek" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">' +
          '<div class="vp-track"><div class="vp-buffered"></div><div class="vp-played"></div><div class="vp-thumb"></div></div>' +
          '<div class="vp-tip">00:00</div>' +
        '</div>' +
        '<div class="vp-extra">' +
          '<div class="vp-vol">' +
            '<button type="button" class="vp-btn vp-mute" aria-label="Mute">' + ICON.volOn + ICON.volOff + '</button>' +
            '<div class="vp-vol-pop"><div class="vp-vol-box">' +
              '<div class="vp-vol-slider" role="slider" tabindex="0" aria-label="Volume" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100">' +
                '<div class="vp-vol-track"><div class="vp-vol-fill"></div><div class="vp-vol-thumb"></div></div>' +
              '</div>' +
            '</div></div>' +
          '</div>' +
          (qualities.length ? '<button type="button" class="vp-btn vp-settings" aria-label="Quality" aria-haspopup="menu" aria-expanded="false">' + ICON.gear + '</button>' : '') +
          '<button type="button" class="vp-btn vp-speed" aria-label="Playback speed" aria-haspopup="menu" aria-expanded="false">' + ICON.speed + '</button>' +
          (hasPip ? '<button type="button" class="vp-btn vp-pip" aria-label="Picture in picture">' + ICON.pip + '</button>' : '') +
          '<button type="button" class="vp-btn vp-full" aria-label="Fullscreen">' + ICON.full + '</button>' +
        '</div>' +
        '<button type="button" class="vp-btn vp-toggle" aria-label="More controls" aria-expanded="false">' + ICON.more + ICON.less + '</button>' +
      '</div>';
    wrap.appendChild(controls);

    var menu = document.createElement('div');
    menu.className = 'vp-menu';
    menu.setAttribute('role', 'menu');
    menu.hidden = true;
    wrap.appendChild(menu);

    var $ = function (s) { return controls.querySelector(s); };
    var btnPlay = $('.vp-play');
    var progress = $('.vp-progress');
    var played = $('.vp-played');
    var buffered = $('.vp-buffered');
    var thumb = $('.vp-thumb');
    var tip = $('.vp-tip');
    var btnMute = $('.vp-mute');
    var volSlider = $('.vp-vol-slider');
    var volTrack = $('.vp-vol-track');
    var volFill = $('.vp-vol-fill');
    var volThumb = $('.vp-vol-thumb');
    var btnSettings = $('.vp-settings');
    var btnSpeed = $('.vp-speed');
    var btnPip = $('.vp-pip');
    var btnFull = $('.vp-full');
    var btnToggle = $('.vp-toggle');

    var scrubbing = false;
    var started = false;
    var hideTimer = null;
    var wasHidden = false;
    var menuKind = null;

    /* ── UI sync ── */
    function updateProgress() {
      var d = video.duration || 0;
      var p = d ? video.currentTime / d : 0;
      if (!scrubbing) setProgressVisual(p);
      progress.setAttribute('aria-valuetext', fmt(video.currentTime) + ' of ' + fmt(d));
    }
    function setProgressVisual(p) {
      played.style.width = p * 100 + '%';
      thumb.style.left = p * 100 + '%';
      progress.setAttribute('aria-valuenow', Math.round(p * 100));
    }
    function updateBuffered() {
      var d = video.duration;
      if (!d || !video.buffered.length) return;
      var end = 0;
      for (var i = 0; i < video.buffered.length; i++) {
        if (video.buffered.start(i) <= video.currentTime + 0.5 && video.buffered.end(i) > end) end = video.buffered.end(i);
      }
      buffered.style.width = (end / d) * 100 + '%';
    }
    function updatePlayState() {
      var playing = !video.paused && !video.ended;
      btnPlay.classList.toggle('is-playing', playing);
      btnPlay.setAttribute('aria-label', playing ? 'Pause' : 'Play');
      wrap.classList.toggle('vp-playing', playing);
      if (playing) scheduleHide(); else showControls();
    }
    function updateVolumeUI() {
      var muted = video.muted || video.volume === 0;
      var v = muted ? 0 : video.volume;
      btnMute.classList.toggle('is-muted', muted);
      btnMute.setAttribute('aria-label', muted ? 'Unmute' : 'Mute');
      volFill.style.height = v * 100 + '%';
      volThumb.style.bottom = v * 100 + '%';
      volSlider.setAttribute('aria-valuenow', Math.round(v * 100));
    }

    /* ── Show / hide ── */
    function showControls() {
      wrap.classList.remove('vp-hidden');
      scheduleHide();
    }
    function scheduleHide() {
      clearTimeout(hideTimer);
      if (video.paused || scrubbing || !started || menuKind) return;
      hideTimer = setTimeout(function () {
        wrap.classList.add('vp-hidden');
      }, HIDE_DELAY);
    }

    /* ── Actions ── */
    function start() {
      started = true;
      players.forEach(function (p) { if (p !== video) p.pause(); });
      wrap.classList.add('vp-started');
      overlay.classList.add('playing');
      wrap.classList.add('vp-loading');
      var p = video.play();
      if (p && p.catch) p.catch(function () {
        started = false;
        wrap.classList.remove('vp-started', 'vp-loading');
        overlay.classList.remove('playing');
      });
    }
    function toggle() {
      if (!started) return start();
      if (video.paused || video.ended) video.play(); else video.pause();
    }
    function seekBy(s) {
      var d = video.duration || Infinity;
      video.currentTime = clamp(video.currentTime + s, 0, d);
    }
    function setVolume(v) {
      video.volume = clamp(v, 0, 1);
      video.muted = video.volume === 0;
    }
    function toggleFullscreen() {
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      } else if (wrap.requestFullscreen) {
        wrap.requestFullscreen();
      } else if (wrap.webkitRequestFullscreen) {
        wrap.webkitRequestFullscreen();
      } else if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
      }
    }
    function togglePip() {
      if (document.pictureInPictureEnabled) {
        if (document.pictureInPictureElement) document.exitPictureInPicture();
        else video.requestPictureInPicture().catch(function () {});
      } else if (video.webkitSetPresentationMode) {
        video.webkitSetPresentationMode(video.webkitPresentationMode === 'picture-in-picture' ? 'inline' : 'picture-in-picture');
      }
    }
    function setQuality(value) {
      if (value === currentQuality) return;
      var t = video.currentTime, wasPaused = video.paused, rate = video.playbackRate;
      currentQuality = value;
      wrap.classList.add('vp-loading');
      video.defaultPlaybackRate = rate;
      video.src = value;
      video.addEventListener('loadedmetadata', function () {
        video.currentTime = t;
        video.playbackRate = rate;
        if (!wasPaused) { var p = video.play(); if (p && p.catch) p.catch(function () {}); }
        updateProgress();
      }, { once: true });
      video.load();
    }
    function setSpeed(r) {
      video.defaultPlaybackRate = r;
      video.playbackRate = r;
    }

    /* ── Menu (quality / speed) ── */
    function closeMenu() {
      menu.hidden = true;
      menuKind = null;
      if (btnSettings) btnSettings.setAttribute('aria-expanded', 'false');
      btnSpeed.setAttribute('aria-expanded', 'false');
      scheduleHide();
    }
    function openMenu(kind, btn) {
      if (menuKind === kind) return closeMenu();
      var items, title, current, onPick;
      if (kind === 'quality') {
        title = 'Quality'; items = qualities; current = currentQuality; onPick = setQuality;
      } else {
        title = 'Speed';
        items = SPEEDS.map(function (s) { return { label: s === 1 ? 'Normal' : s + '×', value: s }; });
        current = video.playbackRate; onPick = setSpeed;
      }
      menu.textContent = '';
      var t = document.createElement('div');
      t.className = 'vp-menu-title';
      t.textContent = title;
      menu.appendChild(t);
      items.forEach(function (it) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('role', 'menuitemradio');
        b.setAttribute('aria-checked', String(it.value === current));
        b.innerHTML = ICON.check;
        var s = document.createElement('span');
        s.textContent = it.label;
        b.appendChild(s);
        b.addEventListener('click', function () { onPick(it.value); closeMenu(); });
        menu.appendChild(b);
      });
      menu.hidden = false;
      menuKind = kind;
      if (btnSettings) btnSettings.setAttribute('aria-expanded', String(kind === 'quality'));
      btnSpeed.setAttribute('aria-expanded', String(kind === 'speed'));
      clearTimeout(hideTimer);

      var wr = wrap.getBoundingClientRect();
      var cr = controls.getBoundingClientRect();
      var br = btn.getBoundingClientRect();
      menu.style.bottom = (wr.bottom - cr.top + 8) + 'px';
      menu.style.left = clamp(br.right - wr.left - menu.offsetWidth, 8, Math.max(8, wr.width - menu.offsetWidth - 8)) + 'px';
    }

    /* ── Video events ── */
    ['loadedmetadata', 'durationchange', 'timeupdate'].forEach(function (ev) {
      video.addEventListener(ev, function () { updateProgress(); updateBuffered(); });
    });
    video.addEventListener('progress', updateBuffered);
    video.addEventListener('play', updatePlayState);
    video.addEventListener('pause', updatePlayState);
    video.addEventListener('ended', updatePlayState);
    video.addEventListener('volumechange', updateVolumeUI);
    video.addEventListener('waiting', function () { wrap.classList.add('vp-loading'); });
    ['playing', 'canplay', 'error', 'pause'].forEach(function (ev) {
      video.addEventListener(ev, function () { wrap.classList.remove('vp-loading'); });
    });

    /* Tap / click on the picture: on touch the first tap only reveals controls */
    wrap.addEventListener('pointerdown', function () {
      wasHidden = wrap.classList.contains('vp-hidden');
    });
    video.addEventListener('click', function () {
      if (wasHidden) { wasHidden = false; showControls(); return; }
      closeMenu();
      toggle();
    });
    ['mousemove', 'touchstart', 'focusin'].forEach(function (ev) {
      wrap.addEventListener(ev, showControls, { passive: true });
    });
    wrap.addEventListener('mouseleave', scheduleHide);

    /* ── Controls ── */
    overlay.addEventListener('click', start);
    btnPlay.addEventListener('click', toggle);
    btnMute.addEventListener('click', function () {
      video.muted = !video.muted;
      if (!video.muted && video.volume === 0) video.volume = 0.5;
    });
    btnFull.addEventListener('click', toggleFullscreen);
    if (btnPip) btnPip.addEventListener('click', togglePip);
    if (btnSettings) btnSettings.addEventListener('click', function () { openMenu('quality', btnSettings); });
    btnSpeed.addEventListener('click', function () { openMenu('speed', btnSpeed); });
    btnToggle.addEventListener('click', function () {
      var open = wrap.classList.toggle('vp-expanded');
      btnToggle.setAttribute('aria-expanded', String(open));
      btnToggle.setAttribute('aria-label', open ? 'Fewer controls' : 'More controls');
      closeMenu();
    });
    document.addEventListener('click', function (e) {
      if (menuKind && !menu.contains(e.target) && !e.target.closest('.vp-settings, .vp-speed')) closeMenu();
    });

    /* Progress: hover tooltip + scrubbing */
    function showTip(clientX) {
      var r = progress.getBoundingClientRect();
      var p = clamp((clientX - r.left) / r.width, 0, 1);
      tip.textContent = fmtTip(p * (video.duration || 0));
      var w = tip.offsetWidth;
      tip.style.left = clamp(p * r.width, w / 2, r.width - w / 2) + 'px';
    }
    progress.addEventListener('pointermove', function (e) { showTip(e.clientX); });
    progress.addEventListener('pointerenter', function (e) { showTip(e.clientX); });
    dragSlider(progress, progress, false,
      function (p, e) {
        var d = video.duration || 0;
        setProgressVisual(p);
        if (d) video.currentTime = p * d;
        showTip(e.clientX);
      },
      function () { scrubbing = true; progress.classList.add('is-dragging'); },
      function () { scrubbing = false; progress.classList.remove('is-dragging'); updateProgress(); scheduleHide(); }
    );

    /* Volume slider */
    dragSlider(volSlider, volTrack, true, function (p) { setVolume(p); });

    /* Keyboard */
    wrap.addEventListener('keydown', function (e) {
      var t = e.target;
      if (t.closest && t.closest('.vp-menu')) {
        if (e.key === 'Escape') { closeMenu(); (menuKind === 'speed' ? btnSpeed : btnSettings).focus(); }
        return;
      }
      if (t === volSlider) {
        if (e.key === 'ArrowUp' || e.key === 'ArrowRight') { e.preventDefault(); setVolume(video.volume + 0.1); }
        else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') { e.preventDefault(); setVolume(video.volume - 0.1); }
        return;
      }
      switch (e.key) {
        case ' ':
        case 'k':
          if (t.tagName === 'BUTTON') return;
          e.preventDefault(); toggle(); break;
        case 'ArrowLeft':  e.preventDefault(); seekBy(-5); break;
        case 'ArrowRight': e.preventDefault(); seekBy(5); break;
        case 'm': video.muted = !video.muted; break;
        case 'f': toggleFullscreen(); break;
        case 'Escape': closeMenu(); return;
        default: return;
      }
      showControls();
    });

    players.push(video);
    updateProgress();
    updateVolumeUI();
  }

  function initAll() {
    document.querySelectorAll('.film-video-wrap').forEach(init);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAll);
  else initAll();

  window.initBioscopePlayers = initAll;
})();
