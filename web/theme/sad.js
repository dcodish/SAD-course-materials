/* sad.js — Reveal initializer for the SAD HTML lecture decks.
   Loaded after reveal.js and its plugins (RevealNotes, RevealHighlight).

   Content is RTL (dir="rtl" on every slide), but horizontal navigation stays
   LTR-conventional on purpose: Right arrow / Space / PageDown = next,
   Left arrow / PageUp = previous — what a presenter's clicker expects.
*/
Reveal.initialize({
  // 16:9 logical canvas, matches the 13.333" x 7.5" pptx decks; reveal scales it.
  width: 1280,
  height: 720,
  margin: 0.04,
  minScale: 0.2,
  maxScale: 2.0,

  center: false,            // top-align slides (we paint a title bar at the top)
  rtl: false,               // keep arrow-key nav conventional; content is RTL via dir
  hash: true,               // deep-link each slide in the URL
  slideNumber: 'c/t',
  showSlideNumber: 'all',
  controls: true,
  controlsTutorial: false,
  progress: true,
  history: false,
  keyboard: true,
  overview: true,
  touch: true,
  transition: 'slide',      // slide | fade | none
  transitionSpeed: 'default',
  backgroundTransition: 'fade',
  fragmentInURL: true,
  display: 'flex',

  plugins: [
    typeof RevealHighlight !== 'undefined' ? RevealHighlight : null,
    typeof RevealNotes !== 'undefined' ? RevealNotes : null,
  ].filter(Boolean),
});
