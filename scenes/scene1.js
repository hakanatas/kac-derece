/* SAHNE 1 — BU BİR AÇI (0–12 s)
   Nokta is born from a drop of ink, draws two rays from one point:
   an angle. "How wide is it?" — the question the film answers. */
(function (LI) {
  'use strict';
  const { seg, hump, outBack } = LI.E;
  const A = LI.Ang, KD = LI.KD;
  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 120, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 120, zoom: 1.6 })],
      [4.6, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) {
    const cam = camera(t, env);
    const { O, th, L } = LI.Film.base(ctx, env, t, cam, { arc: 0 });
    // the opening glows softly, then a question mark
    const g = hump(t, 5.8, 7.6);
    if (g > 0) A.wedge(ctx, O, 300, 0, th, 0.22 * g);
    const q = outBack(seg(t, 7.8, 8.3)) * (1 - seg(t, 11.3, 11.9));
    if (q > 0) A.text(ctx, '?', ...A.at(O, th / 2, 240), { size: 110 * q, color: A.amber });
  }
  LI.registerScene({ id: 1, start: 0, end: 12, name: 'This is an angle', nameTr: 'Bu bir açı', concept: 'Two rays from one point', conceptTr: 'Başlangıcı ortak iki ışın', render });
})(window.LI = window.LI || {});
