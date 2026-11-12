(function () {
  const WA = "6281230808333";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Tombol WhatsApp umum
  $$("[data-wa]").forEach(a => {
    a.href = `https://wa.me/${WA}?text=${encodeURIComponent(a.dataset.wa)}`;
    a.target = "_blank"; a.rel = "noopener";
  });

  // Nav: bayangan saat scroll + drawer mobile
  const nav = $(".nav");
  const onScroll = () => nav.classList.toggle("scrolled", scrollY > 16);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const burger = $(".burger"), drawer = $(".drawer");
  if (burger && drawer) {
    const set = (open) => { drawer.classList.toggle("open", open); burger.setAttribute("aria-expanded", String(open)); };
    burger.addEventListener("click", () => set(!drawer.classList.contains("open")));
    $$("a", drawer).forEach(a => a.addEventListener("click", () => set(false)));
    addEventListener("keydown", e => { if (e.key === "Escape") set(false); });
  }

  // Galeri: filter + lightbox
  const figs = $$(".masonry figure");
  if (figs.length) {
    const chips = $$(".filters button");
    chips.forEach(b => b.addEventListener("click", () => {
      chips.forEach(c => c.setAttribute("aria-pressed", String(c === b)));
      const cat = b.dataset.cat;
      figs.forEach(f => f.hidden = !(cat === "all" || f.dataset.cat === cat));
    }));
    const lb = $("#lb"), lbImg = $("#lbImg"), lbCap = $("#lbCap");
    let list = [], idx = 0, lastFocus = null;
    const visible = () => figs.filter(f => !f.hidden);
    const show = (i) => {
      list = visible(); idx = (i + list.length) % list.length;
      const f = list[idx], media = f.querySelector("img");
      if (media) { lbImg.src = media.dataset.full || media.src; lbImg.alt = media.alt; lbImg.hidden = false; }
      lbCap.textContent = f.querySelector("figcaption")?.textContent || "";
    };
    const open = (f) => { lastFocus = document.activeElement; list = visible(); show(list.indexOf(f)); lb.classList.add("open"); $(".lb .x").focus(); };
    const close = () => { lb.classList.remove("open"); lastFocus?.focus(); };
    figs.forEach(f => { const btn = f.querySelector("button"); if (btn) btn.addEventListener("click", () => open(f)); });
    $(".lb .x").addEventListener("click", close);
    $(".lb .p").addEventListener("click", () => show(idx - 1));
    $(".lb .n").addEventListener("click", () => show(idx + 1));
    lb.addEventListener("click", e => { if (e.target === lb) close(); });
    addEventListener("keydown", e => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  // Formulir reservasi -> pesan WhatsApp (tidak membuat jadwal otomatis)
  const form = $("#resv");
  if (form) form.addEventListener("submit", e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    const err = $("#err");
    if (!d.nama || !d.wa || !d.treatment) { err.style.display = "block"; err.textContent = "Mohon isi nama, nomor WhatsApp, dan pilihan treatment."; return; }
    err.style.display = "none";
    const lines = [
      "Halo DERMA scb Krian, saya ingin mengajukan permintaan reservasi.",
      "",
      `Nama: ${d.nama}`,
      `No. WhatsApp: ${d.wa}`,
      `Treatment: ${d.treatment}`,
      `Tanggal diinginkan: ${d.tanggal || "-"}`,
      `Jam diinginkan: ${d.jam || "-"}`,
      `Catatan: ${d.catatan || "-"}`,
      "",
      "Mohon konfirmasi ketersediaan jadwal. Terima kasih."
    ];
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
  });

  // Animasi halus (GSAP opsional; konten tetap tampil tanpa JS)
  if (window.gsap && !reduce) {
    gsap.from(".hero h1 > *, .phead h1", { y: 40, opacity: 0, duration: 1, stagger: .12, ease: "power3.out" });
    gsap.from(".hero .figure", { scale: 1.05, opacity: 0, duration: 1.4, ease: "power2.out" });
    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray(".card, .svc article, .prod .card").forEach((el, i) => {
        gsap.from(el, { y: 28, opacity: 0, duration: .8, delay: (i % 3) * .08, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });
      gsap.utils.toArray(".split img, .split video").forEach(el => {
        gsap.fromTo(el, { yPercent: -4 }, { yPercent: 4, ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });
    }
  }
})();
