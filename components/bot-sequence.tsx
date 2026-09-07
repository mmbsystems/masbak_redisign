"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
const steps = [
  {
    en: "BUILD",
    ar: "نبني",
    title: "نحوّل الفكرة إلى كيان قابل للتشغيل.",
    body: "نبدأ من الاحتياج الحقيقي. نصمم نموذج العمل، ونبني الأساس الذي يجمع الناس والعمليات والأنظمة في كيان واحد.",
    items: [
      "نموذج العمل",
      "الهيكل والفريق",
      "العمليات والأنظمة",
      "مؤشرات الأداء",
    ],
    out: "كيان جاهز للانطلاق",
  },
  {
    en: "OPERATE",
    ar: "نُشغّل",
    title: "ندخل مرحلة التشغيل الفعلي.",
    body: "نعمل من داخل الميدان، نطلق العمليات وندير الأداء، ونطوّر النموذج حتى يصبح قادرًا على مواجهة الواقع والنمو معه.",
    items: ["إطلاق العمليات", "إدارة الأداء", "تحسين النموذج", "بناء القدرات"],
    out: "نموذج يعمل ويتحسّن",
  },
  {
    en: "TRANSFER",
    ar: "ننقل",
    title: "نبني الاستقلالية ثم ننقل التشغيل.",
    body: "ننقل المعرفة والقدرات، ونمكّن الفريق بحوكمة واضحة وانتقال منظم. نبني ما يقف ويستمرّ بعد رحيلنا.",
    items: ["توثيق المعرفة", "تمكين الفريق", "الحوكمة", "انتقال مستدام"],
    out: "كيان مستقل قادر على النمو",
  },
];
export function BotSequence() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting)
            setActive(Number((entry.target as HTMLElement).dataset.step));
      },
      { rootMargin: "-30% 0px -40% 0px", threshold: 0 },
    );
    root.current
      ?.querySelectorAll("[data-step]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <section id="bot" className="bot-section">
      <div className="shell">
        <div className="section-intro">
          <p className="eyebrow">نموذج البناء والتشغيل والنقل</p>
          <h2>
            من الفكرة.
            <br />
            إلى كيان يقف على قدميه.
          </h2>
        </div>
        <div className="bot-layout" ref={root}>
          <div className="bot-sticky" aria-hidden="true">
            <div className="step-count" dir="ltr">
              <span>0{active + 1}</span>
              <small>/ 03</small>
            </div>
            <div className="step-visual">
              <div className={`structure structure-${active}`}>
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
            <motion.div
              key={active}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="english">{steps[active].en}</span>
              <p className="active-title">{steps[active].ar}</p>
            </motion.div>
            <div className="step-track">
              {steps.map((s, i) => (
                <a
                  key={s.en}
                  href={`#step-${i}`}
                  tabIndex={-1}
                  className={active === i ? "is-active" : ""}
                >
                  {String(i + 1).padStart(2, "0")}
                </a>
              ))}
            </div>
          </div>
          <div className="step-stories">
            {steps.map((s, i) => (
              <article
                className="step-story"
                data-step={i}
                id={`step-${i}`}
                key={s.en}
              >
                <div className="mobile-step">
                  <span>0{i + 1}</span>
                  <span dir="ltr">{s.en}</span>
                  <strong>{s.ar}</strong>
                </div>
                <span className="eyebrow">
                  0{i + 1} / {s.ar}
                </span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <ul>
                  {s.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="step-outcome">
                  <span>ما الذي يبقى؟</span>
                  <strong>{s.out}</strong>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
