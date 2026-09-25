/* SAHNE 4 — AÇIÖLÇER (46–66 s)
   A new angle we don't know yet. The protractor, in three steps:
   1) centre on the vertex  2) line up 0 with one arm  3) read the other arm. */
(function (LI) {
  'use strict';
  const { seg, hump, outBack, inOut, clamp } = LI.E;
  const A = LI.Ang, KD = LI.KD;
  function camera(t, env) {
    const L = KD.L(env), O = L.O;
    return LI.Camera.breathe(LI.Camera.track([
      [46, KD.cam(env, { zoom: 1.04 })], [50.4, KD.cam(env, { x: env.V ? 40 : 20, y: env.V ? 0 : 60, zoom: 1.08 })],
      [60.4, KD.cam(env, { x: env.V ? 40 : 20, y: env.V ? 0 : 60, zoom: 1.08 })], [61.6, KD.cam(env, { x: O[0] + (env.V ? 60 : 140), y: O[1] - (env.V ? -180 : 120), zoom: env.V ? 1.2 : 1.4 })],
      [64.4, KD.cam(env, { x: O[0] + (env.V ? 60 : 140), y: O[1] - (env.V ? -180 : 120), zoom: env.V ? 1.2 : 1.4 })], [66, KD.cam(env, { x: env.V ? 40 : 20, y: env.V ? 0 : 60, zoom: 1.08 })],
    ], t), t, 0.3);
  }
  function render(ctx, lt, env, t) {
    const cam = camera(t, env);
    const measured = t > 63.2;
    const { O, th, L, pr } = LI.Film.base(ctx, env, t, cam, { arc: t < 46.8 ? 1 - seg(t, 46, 46.8) : seg(t, 63.2, 63.8) });
    // unknown: "?"
    const q = outBack(seg(t, 47.4, 47.9)) * (1 - seg(t, 60.6, 61.0));
    if (q > 0) A.text(ctx, '?', ...A.at(O, 25, 200), { size: 90 * q, color: A.amber });
    // step badges (top-left of the stage)
    const bx = env.V ? -420 : -760, by = env.V ? -620 : -330;
    const steps = [[52.0, 55.6], [56.2, 59.8], [60.4, 64.4]];
    steps.forEach(([a, b], i) => {
      const al = seg(t, a, a + 0.3) * (1 - seg(t, 65.2, 65.8));
      const on = t >= a && t < b + 0.4 ? 1 : 0.35;
      LI.Ang.badge(ctx, i + 1, bx, by + i * 100, { p: seg(t, a, a + 0.5), alpha: al * on });
    });
    // step 1: ping the vertex
    const p1 = seg(t, 53.6, 54.6);
    if (p1 > 0 && p1 < 1) { ctx.strokeStyle = A.amber(1 - p1); ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(O[0], O[1], 20 + 50 * p1, 0, Math.PI * 2); ctx.stroke(); }
    // step 2: ping the 0 mark, which sits on the lower arm
    const p2 = seg(t, 57.8, 58.8);
    if (p2 > 0 && p2 < 1) { const z = A.at(O, 0, L.R - 10); ctx.strokeStyle = A.amber(1 - p2); ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(z[0], z[1], 16 + 44 * p2, 0, Math.PI * 2); ctx.stroke(); }
    // step 3: follow the other arm out to the scale, count up from 0
    const f = seg(t, 60.6, 61.4);
    if (f > 0 && t < 65.6) LI.Ink.path(ctx, [O, A.at(O, th, L.R + 20)], { w: 16, p: f, color: LI.AMBER_RGB, alpha: 0.55 * (1 - seg(t, 65, 65.6)), taper: [0.1, 0.1] });
    if (t > 61.4 && pr) {
      const v = pr.read;
      A.deg(ctx, v, ...A.at(O, 50, L.R + 90), { size: measured ? 96 : 70, halo: true, alpha: 1 - seg(t, 65.4, 66) });
    }
    A.text(ctx, 'Bu açı 50°', env.V ? 0 : -330, env.V ? 330 : -200, { size: 70, p: seg(t, 63.6, 64.4), alpha: 1 - seg(t, 65.6, 66), halo: true });
  }
  LI.registerScene({ id: 4, start: 46, end: 66, name: 'The protractor', nameTr: 'Açıölçer', concept: '3 steps: vertex, line up 0, read', conceptTr: '3 adım: köşe, 0 çizgisi, oku', render });
})(window.LI = window.LI || {});
