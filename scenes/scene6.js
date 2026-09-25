/* SAHNE 6 — KAPANIŞ (80–92 s)  Nokta celebrates; one sentence to remember. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const A = LI.Ang, KD = LI.KD;
  function camera(t, env) { return LI.Camera.breathe(LI.Camera.track([[80, KD.cam(env, { zoom: 1.02 })], [83, KD.cam(env, { x: env.V ? 0 : -60, y: env.V ? 300 : 80, zoom: 1.25 })], [92, KD.cam(env, { x: env.V ? 0 : -60, y: env.V ? 300 : 80, zoom: 1.1 })]], t), t, 0.4); }
  function render(ctx, lt, env, t) {
    const cam = camera(t, env);
    LI.Film.base(ctx, env, t, cam, { arc: 0 });
    // a little amber fan of angles bursting like fireworks around Nokta
    const k = seg(t, 83.0, 85.0);
    if (k > 0 && t < 90.5) {
      const n = LI.Film.nokta(t, env), C = [n.x, n.y - 170];
      [30, 60, 90, 120, 150].forEach((d, i) => {
        const r = 150 + 30 * Math.sin(t * 2 + i);
        A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 89.6, 90.5)), w: 6, seed: 80 + i });
      });
    }
  }
  LI.registerScene({ id: 6, start: 80, end: 92, name: 'Say it in degrees', nameTr: 'Dereceyle söyle', concept: 'Protractor → degrees', conceptTr: 'Açıölçerle ölç, dereceyle söyle', render });
})(window.LI = window.LI || {});
