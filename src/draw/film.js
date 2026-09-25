/* ─────────────────────────────────────────────────────────────
   The film's continuous state as pure functions of time, so the angle,
   the protractor and Nokta flow smoothly across scene boundaries.
   Scenes (scenes/*.js) call LI.Film.base() and then add their extras.
   ───────────────────────────────────────────────────────────── */
(function (LI) {
  'use strict';
  const { seg, clamp, lerp, track, outBack, outCubic, inOut, hump } = LI.E;
  const A = LI.Ang, KD = LI.KD, Ink = LI.Ink;

  /** the moving arm's angle in degrees */
  function theta(t) {
    return track([
      [0, 50], [12.0, 50], [13.3, 0], [14.3, 0], [19.3, 360], [29.99, 360], [30.0, 0], [31.2, 0], [33.6, 180],
      [37.2, 180], [38.6, 90], [46.0, 90], [47.4, 50], [66.4, 50], [69.6, 130], [80, 130],
    ], t);
  }
  /** how much of the big angle is visible */
  const angleAlpha = (t) => 1 - seg(t, 70.4, 71.2);

  /** protractor pose */
  function protractor(t, env) {
    const L = KD.L(env), O = L.O;
    if (t < 48 || t > 71.4) return null;
    const inK = outCubic(seg(t, 48.0, 50.4));
    let C = [lerp(O[0] + 820, O[0] + 170, inK), lerp(O[1] - 140, O[1] - 110, inK)], rot = lerp(24, 14, inK);
    const k1 = inOut(seg(t, 52.4, 53.6));
    C = [lerp(C[0], O[0], k1), lerp(C[1], O[1], k1)];
    rot = lerp(rot, 0, inOut(seg(t, 56.6, 57.8)));
    const out = inOut(seg(t, 70.4, 71.3));
    C = [C[0] + out * 900, C[1] - out * 120];
    let read = null;
    if (t > 61.4 && t < 66.4) read = 50 * outCubic(seg(t, 61.4, 63.0));
    if (t >= 66.4) read = theta(t);
    return { C, rot, alpha: seg(t, 48.0, 48.4) * (1 - out), read };
  }

  /** Nokta, as a function of time */
  function nokta(t, env) {
    const L = KD.L(env), O = L.O;
    const p = { x: L.nx, y: L.gy, s: L.s, mouth: 0.4, brow: 0.1 };
    // birth: a drop lands, the body gathers, legs and arms sprout, eyes open
    const g = outCubic(seg(t, 1.3, 2.3));
    p.born = { body: lerp(0.3, 1, g), legs: outCubic(seg(t, 2.0, 2.6)), arms: outCubic(seg(t, 2.3, 2.8)), tuft: outBack(seg(t, 2.5, 2.9)) };
    if (t < 3.0) { p.sq = lerp(0.4, 1, clamp(LI.E.spring(seg(t, 1.3, 3.0) * 2, 8, 3.4), 0, 1.3)); p.drop = 1 - g; p.wobble = 1 - seg(t, 1.3, 2.8); }
    p.eyeOpen = outCubic(seg(t, 2.8, 3.1));
    // default gaze: the tip of the moving arm
    const tip = A.at(O, theta(t), L.len * 0.8);
    KD.look(p, tip);
    // drawing the angle with a brush (scene 1)
    if (t > 2.9 && t < 5.4) { p.hold = 'brush'; p.brushAng = -0.8 + 0.3 * Math.sin(t * 9); p.hands = { R: [1.35, -0.2 + 0.15 * Math.sin(t * 9)] }; }
    // puzzled: scratches its head, then has an idea
    const puz = seg(t, 7.4, 7.8) * (1 - seg(t, 10.2, 10.5));
    if (puz > 0) { p.hands = { L: [-1.2, 0.55], R: [0.75, -1.05 + 0.08 * Math.sin(t * 14)] }; p.brow = -0.6 * puz; p.mouth = -0.1; p.lookY = -0.6; p.lookX = 0.2; }
    if (t > 10.3 && t < 11.6) { p.squint = 1; p.mouth = 1; p.sq = 1 + 0.12 * hump(t, 10.3, 10.9); p.y -= 30 * hump(t, 10.3, 10.9); }
    // points at the arm when it moves
    const pointing = (a, b) => { if (t > a && t < b) { p.point = 'R'; p.hands = { L: [-1.2, 0.55], R: [1.5, -0.35] }; } };
    pointing(12.0, 19.6); pointing(31.0, 33.8); pointing(37.0, 38.8); pointing(66.2, 69.8);
    // amazed at 360° / 180°
    if ((t > 19.3 && t < 21.0) || (t > 33.6 && t < 35.2)) { p.mouthOpen = 0.6; p.eyeScale = 1.1; p.sq = 1.05; }
    // happy after each measurement
    const joy = (a, b) => { if (t > a && t < b) { p.squint = 1; p.mouth = 1; p.sq = 1 + 0.1 * hump(t, a, a + 0.6); p.y -= 26 * hump(t, a, a + 0.6); p.hands = { L: [-1.3, -0.35], R: [1.3, -0.35] }; } };
    joy(43.6, 45.2); joy(63.4, 65.2);
    // scene 5: watches the three small angles
    if (t > 71 && t < 80) { p.hands = { L: [-1.2, 0.55], R: [1.2, 0.55] }; p.mouth = 0.5; }
    // scene 6: walks to the middle and celebrates
    if (t > 80.4) {
      const k = inOut(seg(t, 80.6, 82.4));
      const x0 = L.nx, x1 = env.V ? 0 : -60;
      p.x = lerp(x0, x1, k);
      const G = LI.Nokta.gait((p.x - x0) * 1.6, { stride: 64, lift: 14 });
      if (k > 0 && k < 1) { p.feet = G.feet; p.bob = G.bob; }
      p.turn = k < 1 ? 0.35 : 0; p.lookX = k < 1 ? 0.8 : 0; p.lookY = k < 1 ? 0 : 0.1;
      if (t > 82.6) {
        const j = (t - 82.6) % 1.4;
        p.squint = 1; p.mouth = 1;
        p.sq = 1 + 0.1 * Math.sin(Math.PI * clamp(j / 0.6)); p.y -= 40 * Math.sin(Math.PI * clamp(j / 0.6));
        p.hands = { L: [-1.35, -0.6 - 0.2 * Math.sin(t * 6)], R: [1.35, -0.6 + 0.2 * Math.sin(t * 6)] };
      }
      if (t > 88.2) { p.squint = 0; p.lookX = 0; p.lookY = 0.2; p.hands = { L: [-1.2, 0.55], R: [1.2, -1.0 + 0.25 * Math.sin(t * 10)] }; }
    }
    p.blink = Math.max(hump(t, 5.8, 5.95), hump(t, 16.2, 16.35), hump(t, 26.0, 26.15), hump(t, 41.0, 41.15), hump(t, 55.0, 55.15), hump(t, 74.0, 74.15));
    return p;
  }

  /** common render: ground, Nokta, the big angle, its amber arc and live degrees, the protractor */
  function base(ctx, env, t, cam, o = {}) {
    const L = KD.L(env), O = L.O;
    LI.Ambient.specks(ctx, env, cam, t, { alpha: 0.22, n: 18, depth: 0.4, seed: 21 });
    LI.Camera.apply(ctx, env, cam);
    const nx = nokta(t, env).x;
    KD.ground(ctx, env, nx, L.gy);

    // ── the big angle
    const aa = angleAlpha(t);
    const th = theta(t);
    if (aa > 0.01 && t > 3.2) {
      ctx.globalAlpha = aa;
      // opening (soft wedge) + amber arc, i.e. the measurement
      const showArc = o.arc ?? 1;
      if (showArc > 0 && th > 0.5) {
        A.wedge(ctx, O, 150, 0, th, 0.14 * showArc);
        A.arc(ctx, O, 150, 0, th, { alpha: showArc, p: 1 });
      }
      Ink.dot(ctx, O[0], O[1], 11 * outBack(seg(t, 3.2, 3.5)), { seed: 3, bleed: 0.6 });
      A.arm(ctx, O, 0, L.len, { p: seg(t, 3.4, 4.1), seed: 11 });
      A.arm(ctx, O, th, L.len, { p: seg(t, 4.2, 4.9), seed: 12 });
      ctx.globalAlpha = 1;
    }
    // ── the protractor
    const pr = protractor(t, env);
    if (pr) A.protractor(ctx, pr.C, L.R, pr.rot, { alpha: pr.alpha, read: pr.read });
    // ── Nokta
    LI.Nokta.draw(ctx, LI.Nokta.follow((tt) => nokta(tt, env), t), t);
    // the ink drop and splash at birth
    if (t < 1.35 && t > 0.3) { const f = seg(t, 0.3, 1.3); Ink.dot(ctx, L.nx, lerp(-700, L.gy - 14, f * f), 15, { seed: 2, bleed: 0 }); }
    if (t > 1.3) Ink.drops(ctx, L.nx, L.gy - 4, t - 1.3, { n: 9, seed: 5, ground: L.gy + 4, scale: 0.8, alpha: 1 - seg(t, 4, 8) * 0.6 });
    return { O, th, L, pr };
  }

  LI.Film = { theta, angleAlpha, protractor, nokta, base };
})(window.LI = window.LI || {});
