/* SAHNE 2 — TAM TUR (12–30 s)
   The arm closes, then turns all the way round: the amber arc counts up
   to 360°. 360 tick marks appear; we zoom in on ONE part: 1 degree. */
(function (LI) {
  'use strict';
  const { seg, hump, outBack, inOut, clamp } = LI.E;
  const A = LI.Ang, KD = LI.KD;
  function camera(t, env) {
    const L = KD.L(env), O = L.O;
    const wide = KD.cam(env, { x: env.V ? 0 : -180, y: env.V ? 60 : 110, zoom: env.V ? 0.95 : 0.8 });
    const slice = A.at(O, 60.5, 262);
    const close = { x: slice[0], y: slice[1], zoom: 5.2, rot: 0, tilt: 1 };
    let cam = LI.Camera.track([[12, KD.cam(env, { zoom: 1 })], [14.2, wide], [30, wide]], t);
    cam = LI.Camera.dive(cam, close, inOut(seg(t, 25.4, 26.8)) * (1 - inOut(seg(t, 28.4, 29.8))));
    return LI.Camera.breathe(cam, t, 0.4);
  }
  function render(ctx, lt, env, t) {
    const cam = camera(t, env);
    const { O, th } = LI.Film.base(ctx, env, t, cam, { arc: seg(t, 14.2, 14.6) * (1 - 0.85 * seg(t, 24.6, 25.3)) });
    // live degrees while turning
    const la = seg(t, 14.4, 14.8) * (1 - seg(t, 24.2, 24.8));
    if (la > 0) A.deg(ctx, th, O[0] + 250, O[1] - 290, { alpha: la, size: t > 19.3 ? 96 + 14 * hump(t, 19.3, 20.0) : 76, halo: true });
    A.text(ctx, 'tam açı', O[0], O[1] + 200, { size: 54, p: seg(t, 19.8, 20.6), alpha: 1 - seg(t, 23.6, 24.2) });
    // 360 equal parts
    const tp = seg(t, 23.4, 25.2);
    if (tp > 0) LI.Ang.ticks(ctx, O, 230, tp, { alpha: 0.75 * (1 - seg(t, 29.4, 30)), lw: 1.4 / Math.max(1, cam.zoom * 0.6) });
    // one of them: 1°
    const one = seg(t, 26.2, 26.8) * (1 - seg(t, 28.8, 29.4));
    if (one > 0) {
      A.wedge(ctx, O, 300, 60, 61, 0.55 * one);
      LI.Ink.path(ctx, [A.at(O, 60, 228), A.at(O, 60, 300)], { w: 2.2 / cam.zoom * 2, color: LI.AMBER_RGB, alpha: one });
      LI.Ink.path(ctx, [A.at(O, 61, 228), A.at(O, 61, 300)], { w: 2.2 / cam.zoom * 2, color: LI.AMBER_RGB, alpha: one });
      const lp = A.at(O, 60.5, 300);
      A.text(ctx, '1°', lp[0] + 10 / cam.zoom * 3, lp[1] - 60 / cam.zoom, { size: 70 / cam.zoom, color: A.amber, alpha: one, align: 'left' });
    }
  }
  LI.registerScene({ id: 2, start: 12, end: 30, name: 'Full turn', nameTr: 'Tam tur', concept: 'Full turn = 360°; 1° = one of 360 parts', conceptTr: 'Tam tur = 360°; 1° = 360 parçadan biri', render });
})(window.LI = window.LI || {});
