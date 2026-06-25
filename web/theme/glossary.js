/* glossary.js — clickable concept reminders for the SAD decks.

   Mark a term in a slide:  <span class="en term" data-term="smart">SMART</span>
   (the build needs nothing special — any element with data-term becomes clickable).
   Click it → a small popover shows a short reminder. Entries live in GLOSSARY below,
   so a concept defined once is reusable on every slide and in every lecture.

   Optional "see more" link per entry:
     more: { label, slug }  → jumps to a slide in THIS deck by its data-slug
     more: { label, href }  → any URL, e.g. another lecture: 'lecture-03.html#/4'
*/
(function () {
  "use strict";

  const GLOSSARY = {
    smart: {
      title: "SMART — דרישה טובה",
      html: `<p>קריטריונים לניסוח דרישה ברורה שאפשר לבדוק:</p>
        <ul class="g-list">
          <li><b>S</b> · <span dir="ltr">Specific</span> — ספציפית וחד-משמעית</li>
          <li><b>M</b> · <span dir="ltr">Measurable</span> — מדידה</li>
          <li><b>A</b> · <span dir="ltr">Achievable</span> — בת-השגה</li>
          <li><b>R</b> · <span dir="ltr">Relevant</span> — רלוונטית למטרה</li>
          <li><b>T</b> · <span dir="ltr">Time-bound</span> — תחומה בזמן</li>
        </ul>`,
      // When lecture 3 exists, point students to its SMART slide:
      // more: { label: "להרחבה — הרצאה 3", href: "lecture-03.html#/SLUG" }
    },
    crud: {
      title: "CRUD",
      html: `<p>ארבע פעולות היסוד על נתונים:
        <span dir="ltr">Create</span> (יצירה), <span dir="ltr">Read</span> (קריאה),
        <span dir="ltr">Update</span> (עדכון), <span dir="ltr">Delete</span> (מחיקה).</p>`,
    },
    jad: {
      title: "JAD — Joint Application Design",
      html: `<p>סדנה משותפת שבה מנתחים ובעלי-עניין מגדירים דרישות יחד בזמן אמת,
        במקום סבב ראיונות נפרדים — מקצר זמן ומפחית אי-הבנות.</p>`,
    },
    wetherbe: {
      title: "מסגרת Wetherbe (PIECES)",
      html: `<p>שיטה לזיהוי צרכים דרך שאלות על קשיים קיימים: ביצועים, מידע, כלכלה,
        בקרה, יעילות ושירות — כדי לחשוף דרישות שלא עלו מעצמן.</p>`,
    },
    "user-story": {
      title: "User Story",
      html: `<p>תיאור דרישה קצר מנקודת מבט המשתמש, בתבנית:</p>
        <p class="g-quote">״כ<b>[תפקיד]</b> אני רוצה <b>[יכולת]</b> כדי <b>[ערך]</b>״</p>`,
    },
    "use-case": {
      title: "Use Case — תרחיש שימוש",
      html: `<p>רצף פעולות שהמערכת מבצעת ומניב תוצאה בעלת ערך לשחקן — מה המערכת
        עושה, מנקודת מבטו של המשתמש.</p>`,
      more: { label: "להגדרה המלאה →", slug: "use-case-definition" },
    },
  };

  let pop = null;
  let current = null;

  function close() {
    if (pop) { pop.remove(); pop = null; }
    if (current) { current.setAttribute("aria-expanded", "false"); current = null; }
  }

  function gotoSlug(slug) {
    const sections = Array.from(document.querySelectorAll(".reveal .slides > section"));
    const idx = sections.findIndex((s) => s.getAttribute("data-slug") === slug);
    if (idx >= 0 && window.Reveal && Reveal.slide) { close(); Reveal.slide(idx); }
  }

  function open(el) {
    const entry = GLOSSARY[el.getAttribute("data-term")];
    if (!entry) return;
    if (current === el) { close(); return; }
    close();

    pop = document.createElement("div");
    pop.className = "glossary-pop";
    pop.setAttribute("dir", "rtl");
    let html =
      '<button class="glossary-close" aria-label="סגור">×</button>' +
      "<h4>" + entry.title + "</h4>" +
      '<div class="glossary-body">' + entry.html + "</div>";
    if (entry.more) {
      if (entry.more.slug) {
        html += '<a class="glossary-more" href="#" data-goto-slug="' + entry.more.slug + '">' + entry.more.label + "</a>";
      } else if (entry.more.href) {
        html += '<a class="glossary-more" href="' + entry.more.href + '">' + entry.more.label + " ↗</a>";
      }
    }
    pop.innerHTML = html;
    document.body.appendChild(pop);

    position(el);
    current = el;
    el.setAttribute("aria-expanded", "true");

    pop.querySelector(".glossary-close").addEventListener("click", close);
    const goto = pop.querySelector("[data-goto-slug]");
    if (goto) goto.addEventListener("click", (ev) => { ev.preventDefault(); gotoSlug(goto.getAttribute("data-goto-slug")); });
  }

  function position(el) {
    // getBoundingClientRect is in screen px (it accounts for reveal's transform
    // scale), and the popover is position:fixed — so the two coordinate spaces match.
    const r = el.getBoundingClientRect();
    const pr = pop.getBoundingClientRect();
    const pad = 10;
    let top = r.bottom + 8;
    if (top + pr.height > window.innerHeight - pad) {
      top = Math.max(pad, r.top - pr.height - 8); // not enough room below → above
    }
    let left = r.right - pr.width; // RTL: align the popover's right edge to the term
    left = Math.max(pad, Math.min(left, window.innerWidth - pr.width - pad));
    pop.style.top = top + "px";
    pop.style.left = left + "px";
  }

  function init() {
    document.querySelectorAll("[data-term]").forEach((el) => {
      if (!GLOSSARY[el.getAttribute("data-term")]) return; // unknown term → leave inert
      el.classList.add("term");
      el.setAttribute("role", "button");
      el.setAttribute("tabindex", "0");
      el.setAttribute("aria-expanded", "false");
      el.addEventListener("click", (ev) => { ev.preventDefault(); ev.stopPropagation(); open(el); });
      el.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); ev.stopPropagation(); open(el); }
      });
    });

    document.addEventListener("click", (ev) => {
      if (pop && !pop.contains(ev.target) && !ev.target.closest("[data-term]")) close();
    });
    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape" && pop) { ev.preventDefault(); ev.stopImmediatePropagation(); close(); }
    }, true);
    window.addEventListener("resize", close);
    if (window.Reveal && Reveal.on) {
      Reveal.on("slidechanged", close);
      Reveal.on("overviewshown", close);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
