/* SAHNE 5 — DAR, DİK, GENİŞ (66–80 s)
   Opening the arm makes the number grow (50° → 130°). Then three angles
   side by side: acute < 90° = right < obtuse. */
(function (LI) {
  'use strict';
  const { seg, hump, outBack, inOut } = LI.E;
  const A = LI.Ang, KD = LI.KD;
  const SMALL = [
    { d: 40, name: 'dar açı', t0: 71.4 },
    { d: 90, name: 'dik açı', t0: 73.4 },
    { d: 130, name: 'geniş açı', t0: 75.6 },
  ];
  function camera(t, env) {
    return LI.Camera.breathe(LI.Camera.track([[66, KD.cam(env, { x: env.V ? 40 : 20, y: env.V ? 0 : 60, zoom: 1.08 })], [71, KD.cam(env, { zoom: 1 })], [80, KD.cam(env, { zoom: 1.02 })]], t), t, 0.4);
  }
  function render(ctx, lt, env, t) {
    const cam = camera(t, env);
    const { O, th, L, pr } = LI.Film.base(ctx, env, t, cam, { arc: 1 });
    // live reading while the arm opens
    if (t < 71.2 && pr) A.deg(ctx, pr.read, ...A.at(O, pr.read, L.R + 90), { size: 88, halo: true, alpha: 1 - seg(t, 70.4, 71.0) });
    // three small angles
    SMALL.forEach((s, i) => {
      const k = seg(t, s.t0, s.t0 + 0.8), a = seg(t, s.t0, s.t0 + 0.3) * (1 - seg(t, 80.2, 80.8));
      if (a <= 0) return;
      const P = env.V ? [-10 + (i - 1) * 0, -560 + i * 390] : [-300 + i * 420, 160];
      const len = env.V ? 220 : 240;
      ctx.globalAlpha = a;
      LI.Ink.dot(ctx, P[0], P[1], 9, { seed: 40 + i });
      A.arm(ctx, P, 0, len, { p: k, seed: 50 + i, w: 7 });
      A.arm(ctx, P, s.d, len, { p: seg(t, s.t0 + 0.3, s.t0 + 0.9), seed: 60 + i, w: 7 });
      if (k >= 1) { A.wedge(ctx, P, 90, 0, s.d, 0.16); if (s.d === 90) A.square(ctx, P, 0, 40); else A.arc(ctx, P, 90, 0, s.d, { w: 6 }); }
      A.deg(ctx, s.d, ...A.at(P, Math.max(s.d / 2, 25), 150), { size: 60, p: seg(t, s.t0 + 0.8, s.t0 + 1.2), halo: true });
      A.text(ctx, s.name, P[0] + (env.V ? 120 : 60), P[1] + 64, { size: 50, p: seg(t, s.t0 + 1.0, s.t0 + 1.6) });
      ctx.globalAlpha = 1;
    });
  }
  LI.registerScene({ id: 5, start: 66, end: 80, name: 'Acute, right, obtuse', nameTr: 'Dar, dik, geniş', concept: 'Bigger opening, bigger degrees', conceptTr: 'Kol açıldıkça derece büyür', render });
})(window.LI = window.LI || {});
