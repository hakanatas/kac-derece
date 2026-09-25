/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 5. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 3.6, end: 6.8, tr: 'Bu bir açı', en: 'This is an angle',
      note: 'Nokta iki ışın çizdi. Başlangıç noktaları ortak: bu bir açı.' },
    { scene: 1, start: 7.6, end: 11.4, tr: 'Ne kadar açık? Ölçelim!', en: 'How wide is it? Let’s measure!',
      note: 'Peki bu açı ne kadar açık? Bunu ölçmek için önce bir ölçü birimine ihtiyacımız var.' },
    { scene: 2, start: 13.4, end: 17.0, tr: 'Kolu bir tam tur döndürelim', en: 'Turn the arm all the way round',
      note: 'Açının bir kolunu kapatıp bir tam tur döndürelim.' },
    { scene: 2, start: 19.4, end: 23.4, tr: 'Tam tur: 360 derece', en: 'A full turn: 360 degrees',
      note: 'Bir tam dönme 360 derecedir. Buna tam açı denir.' },
    { scene: 2, start: 24.4, end: 29.4, tr: '360 eşit parçadan biri: 1°', en: 'One of 360 equal parts: 1°',
      note: 'Tam turu 360 eşit parçaya bölersek her parça 1 derecedir. Derece açı ölçü birimidir.' },
    { scene: 3, start: 32.6, end: 37.0, tr: 'Yarım tur: 180° · doğru açı', en: 'Half turn: 180° · straight angle',
      note: 'Yarım tur 180 derecedir. Kollar düz bir çizgi oluşturur: doğru açı.' },
    { scene: 3, start: 38.8, end: 43.4, tr: 'Çeyrek tur: 90° · dik açı', en: 'Quarter turn: 90° · right angle',
      note: 'Çeyrek tur 90 derecedir: dik açı. Köşesine küçük bir kare çizeriz.' },
    { scene: 4, start: 48.2, end: 51.6, tr: 'Açıölçer ile ölçelim', en: 'Measure with a protractor',
      note: 'Bu açının kaç derece olduğunu açıölçer ile bulalım. Üç adım var.' },
    { scene: 4, start: 52.0, end: 55.6, tr: '1. Merkezi köşeye koy', en: '1. Centre on the vertex',
      note: 'Birinci adım: açıölçerin merkezini açının köşesine koyarız.' },
    { scene: 4, start: 56.2, end: 59.8, tr: '2. 0 çizgisini bir kola hizala', en: '2. Line up 0 with one arm',
      note: 'İkinci adım: 0 çizgisini açının bir koluyla çakıştırırız.' },
    { scene: 4, start: 60.4, end: 64.4, tr: '3. Öbür kolun sayısını oku', en: '3. Read where the other arm points',
      note: 'Üçüncü adım: 0’dan başlayarak sayarız ve öbür kolun geçtiği sayıyı okuruz: 50 derece.' },
    { scene: 5, start: 67.0, end: 70.6, tr: 'Kol açıldıkça derece büyür', en: 'Open the arm, the degrees grow',
      note: 'Kolu açarsak derece büyür: şimdi 130 derece.' },
    { scene: 5, start: 71.4, end: 75.0, tr: 'Dar açı: 90°’den küçük', en: 'Acute: less than 90°',
      note: 'Ölçüsü 90 dereceden küçük olan açılar dar açıdır.' },
    { scene: 5, start: 75.6, end: 79.4, tr: 'Geniş açı: 90°’den büyük', en: 'Obtuse: more than 90°',
      note: 'Ölçüsü 90 dereceden büyük, 180 dereceden küçük açılar geniş açıdır.' },
    { scene: 6, start: 82.4, end: 88.0, tr: 'Açıölçerle ölç, dereceyle söyle!', en: 'Measure with a protractor, say it in degrees!',
      note: 'Bundan sonra bir açı gördüğünüzde açıölçerle ölçüp derecesini söyleyebilirsiniz.' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
