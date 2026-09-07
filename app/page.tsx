import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { WorldMap } from "@/components/ui/world-map";
import { Reveal } from "@/components/ui/reveal";
import { BotSequence } from "@/components/bot-sequence";
import source from "@/lib/source-content.json";
import assets from "@/lib/original-assets.json";
const areas = [
  ["كيانات جديدة", "من فرصة واعدة إلى مؤسسة قائمة."],
  ["مبادرات استراتيجية", "نحوّل الأولويات إلى مسارات تنفيذ."],
  ["وحدات أعمال", "قدرات جديدة داخل مؤسسات راسخة."],
  ["مشاريع نمو", "نصمم الأساس الذي يسمح بالتوسع."],
  ["نماذج تشغيل", "نربط الناس والعمليات والأنظمة."],
  ["شركات ناشئة مؤسسية", "نبني أذرعًا ابتكارية قابلة للاستقلال."],
];
const journey = [
  ["DISCOVER", "اكتشاف", "نفهم الاحتياج الحقيقي."],
  ["DESIGN", "تصميم", "نرسم نموذجًا قابلًا للعمل."],
  ["BUILD", "بناء", "نشكّل الفريق والأساس."],
  ["OPERATE", "تشغيل", "نختبر ونحسّن في الميدان."],
  ["TRANSFER", "نقل", "نمكّن الاستقلالية."],
];
export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        انتقل إلى المحتوى
      </a>
      <Navigation />
      <main id="main">
        <section id="home" className="hero">
          <WorldMap />
          <div className="hero-shade" />
          <div className="hero-content shell">
            <div className="hero-heading">
              <p className="eyebrow">
                <span className="small-dot" /> شركة بناء وتحويل تشغيلي
              </p>
              <h1>
                نبني محليًا.
                <br />
                <span>ونُشغّل عالميًا.</span>
              </h1>
            </div>
            <div className="hero-support">
              <p className="hero-description">
                نحوّل الاستراتيجيات والفرص إلى كيانات قابلة للتشغيل والنمو.
                <br className="desktop-break" /> ونبني القدرة على العمل، أينما
                كانت الفرصة.
              </p>
              <div className="bot-label" dir="ltr">
                BUILD <i /> OPERATE <i /> TRANSFER
              </div>
              <div className="hero-actions">
                <a className="button button-gold" href="#contact">
                  أخبرنا عن تحدّيك <span aria-hidden="true">↗</span>
                </a>
                <a className="text-link" href="#bot">
                  اكتشف كيف نعمل <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </div>
          <div className="hero-bottom shell">
            <span>من المملكة. إلى العالم.</span>
            <a href="#about" aria-label="اكتشف مَسبَك">
              <span aria-hidden="true">↓</span>
            </a>
            <span dir="ltr">BUILT TO STAND. READY TO SCALE.</span>
          </div>
        </section>
        <section id="about" className="positioning section-pad">
          <Reveal className="shell centered">
            <p className="eyebrow">ما الذي نفعله؟</p>
            <h2>
              الاستراتيجية وحدها
              <br />
              لا تبني كيانًا.
            </h2>
            <p className="statement-sub">
              نحن نغلق المسافة بين الفكرة والتنفيذ.
            </p>
            <p className="body-copy">
              نصمم نموذج العمل، نبني الفريق والأنظمة والعمليات، نطلق التشغيل، ثم
              ننقل كيانًا قادرًا على الاستمرار والنمو.
            </p>
            <div className="statement-signature">
              <span /> نحن بُناة الكيانات. <span />
            </div>
          </Reveal>
        </section>
        <BotSequence />
        <section id="services" className="builds section-pad">
          <div className="shell">
            <div className="editorial-heading">
              <div>
                <p className="eyebrow">مساحات البناء</p>
                <h2>
                  ماذا يمكن
                  <br />
                  أن نبني؟
                </h2>
              </div>
              <p>
                حين تكون الفرصة واضحة،
                <br />
                نصنع لها شكلًا قادرًا على العمل.
              </p>
            </div>
            <div className="area-list">
              {areas.map(([title, body], i) => (
                <Reveal key={title}>
                  <div className="area-row">
                    <span className="row-number">0{i + 1}</span>
                    <h3>{title}</h3>
                    <p>{body}</p>
                    <span className="row-mark" aria-hidden="true">
                      ↖
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section className="philosophy section-pad">
          <Reveal className="shell">
            <p className="eyebrow">فلسفتنا في العمل</p>
            <h2>
              لا نسلّم توصيات.
              <br />
              <span>نسلّم قدرة على التشغيل.</span>
            </h2>
            <div className="philosophy-bottom">
              <span className="english" dir="ltr">
                CAPABILITY. NOT JUST A PLAN.
              </span>
              <p>
                نعمل إلى جانبك، من داخل التحدّي، حتى تصبح القدرة التشغيلية
                واقعًا. نبقى حيث يصنع بقاؤنا قيمةً حقيقية.
              </p>
            </div>
          </Reveal>
        </section>
        <section className="global section-pad">
          <div className="shell global-layout">
            <div>
              <p className="eyebrow">جذور سعودية. أفق عالمي.</p>
              <h2>
                نبني حيث تبدأ الفرصة.
                <br />
                ونُشغّل حيث يحتاجها السوق.
              </h2>
              <p className="body-copy">
                فهم للسياق المحلي، ونماذج تشغيل قابلة للتكيّف مع الأسواق. لأن
                التوسع يبدأ من أساس متين.
              </p>
            </div>
            <div className="global-orbit" aria-hidden="true">
              <div />
              <div />
              <div />
              <span>
                من المملكة
                <br />
                <strong>إلى العالم</strong>
              </span>
            </div>
          </div>
          <div className="shell regions" dir="ltr">
            <span>Saudi Arabia</span>
            <i />
            <span>GCC</span>
            <i />
            <span>MENA</span>
            <i />
            <span>Global</span>
          </div>
        </section>
        <section id="method" className="journey section-pad">
          <div className="shell">
            <p className="eyebrow">رحلتنا معك</p>
            <h2>وضوح في كل خطوة.</h2>
            <p className="body-copy">
              من التشخيص إلى الكيان القائم. مسؤوليات واضحة، ومخرجات تبني عليها.
            </p>
            <ol className="journey-line">
              {journey.map(([en, ar, body], i) => (
                <li key={en}>
                  <span className="journey-number">0{i + 1}</span>
                  <span className="english">{en}</span>
                  <h3>{ar}</h3>
                  <p>{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section className="source-section section-pad">
          <div className="shell">
            <p className="eyebrow">مَسبَك عن قرب</p>
            <h2>خبرة تتحوّل إلى عمل.</h2>
            <p className="body-copy">
              تعرّف على أعمالنا، والجهات التي عملنا معها، والفريق الذي يقود
              البناء.
            </p>
            <details id="work" open>
              <summary>
                أعمالنا <span aria-hidden="true">+</span>
              </summary>
              <div className="case-list">
                {source.cases.map((c) => (
                  <article key={c.title}>
                    <h3>{c.title}</h3>
                    <p>{c.description}</p>
                  </article>
                ))}
              </div>
            </details>
            <details open>
              <summary>
                شركاء النجاح <span aria-hidden="true">+</span>
              </summary>
              <div className="partner-list">
                {assets.slice(1, 8).map((a) => (
                  <div key={a.src}>
                    <Image src={a.src} alt={a.alt} width={130} height={85} />
                  </div>
                ))}
                <p>
                  مصنع كسوة الكعبة المشرفة
                  <br />
                  <small>مكة المكرمة</small>
                </p>
              </div>
            </details>
            <details id="team" open>
              <summary>
                الفريق <span aria-hidden="true">+</span>
              </summary>
              <div className="people-list">
                {source.people.map((p) => (
                  <article key={p.name}>
                    <Image
                      src={assets.find((a) => a.alt === p.name)!.src}
                      alt={p.name}
                      width={104}
                      height={134}
                    />
                    <div>
                      <h3>{p.name}</h3>
                      <span>{p.role}</span>
                      <p>{p.bio}</p>
                    </div>
                  </article>
                ))}
              </div>
            </details>
          </div>
        </section>
        <section id="contact" className="contact section-pad">
          <Reveal className="shell centered">
            <p className="eyebrow">لنبدأ المحادثة</p>
            <h2>
              لديك فرصة.
              <br />
              <span>لنبنِ ما يمكن أن تصبح.</span>
            </h2>
            <p>نساعدك على تحويلها إلى كيان يعمل.</p>
            <a
              className="button button-gold"
              href="mailto:m.alhamed@masbak.sa?subject=استفسار%20عن%20خدمات%20مَسبَك"
            >
              ابدأ المحادثة <span aria-hidden="true">↗</span>
            </a>
            <a className="email" dir="ltr" href="mailto:m.alhamed@masbak.sa">
              m.alhamed@masbak.sa
            </a>
          </Reveal>
        </section>
      </main>
      <footer>
        <div className="shell footer-main">
          <a href="#home" aria-label="العودة إلى البداية">
            <Image
              src="/brand/asset-0.png"
              alt="مَسبَك"
              width={110}
              height={55}
            />
          </a>
          <p>
            شركة بناء وتحويل تشغيلي
            <br />
            المملكة العربية السعودية
          </p>
          <div>
            <a
              href="https://www.linkedin.com/company/masbak/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
            <a href="https://masbak.co">masbak.co ↗</a>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>© {new Date().getFullYear()} مَسبَك. جميع الحقوق محفوظة.</span>
          <a href="#home">إلى الأعلى ↑</a>
        </div>
      </footer>
    </>
  );
}

