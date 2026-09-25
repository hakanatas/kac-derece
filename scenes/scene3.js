/* SAHNE 3 — YARIM TUR, ÇEYREK TUR (30–46 s)
   Half a turn: 180°, a straight angle. A quarter turn: 90°, a right angle. */
(function (LI) {
  'use strict';
  const { seg, hump, outBack, inOut } = LI.E;
  const A = LI.Ang, KD = LI.KD;
  function camera(t, env) {
    return LI.Camera.breathe(LI.Camera.track([[30, KD.cam(env, { x: env.V ? 0 : -180, y: env.V ? 60 : 110, zoom: env.V ? 0.95 : 0.8 })], [32, KD.cam(env, { zoom: 1 })], [46, KD.cam(env, { zoom: 1.04 })]], t), t, 0.4);
  }
  function render(ctx, lt, env, t) {
    const cam = camera(t, env);
    const { O, th } = LI.Film.base(ctx, env, t, cam, { arc: seg(t, 31.2, 31.5) });
    const la = seg(t, 31.3, 31.7);
    const lp = A.at(O, Math.max(th / 2, 20), 250);
    if (la > 0) A.deg(ctx, th, lp[0], lp[1] - 20, { alpha: la, halo: true, size: 80 });
    A.text(ctx, 'doğru açı', O[0], O[1] + 70, { size: 54, p: seg(t, 33.8, 34.6), alpha: 1 - seg(t, 37.0, 37.4) });
    const sq = seg(t, 38.6, 39.1);
    if (sq > 0) A.square(ctx, O, 0, 48, { p: sq });
    A.text(ctx, 'dik açı', O[0] + 150, O[1] + 70, { size: 54, p: seg(t, 39.2, 40.0), alpha: 1 - seg(t, 45.6, 46) });
  }
  LI.registerScene({ id: 3, start: 30, end: 46, name: 'Half & quarter turn', nameTr: 'Yarım ve çeyrek tur', concept: '180° straight angle, 90° right angle', conceptTr: '180° doğru açı, 90° dik açı', render });
})(window.LI = window.LI || {});
