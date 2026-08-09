/* glossary.js — clickable concept reminders for the SAD decks.

   Mark a term in a slide:  <span class="en term" data-term="smart">SMART</span>
   (the build needs nothing special — any element with data-term becomes clickable).
   Click it → a small popover shows a short reminder. Entries live in GLOSSARY below,
   so a concept defined once is reusable on every slide and in every lecture.

   Popups are self-contained: NO "see more" / deep links that leave the current
   slide (David, 2026-07-14 — a jump has no way back and loses the student's place).
   Keep each reminder short; if a term needs more, teach it on its own slide.
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
          <li><b>T</b> · <span dir="ltr">Traceable</span> — עקיבה: מזהה, מקור, ושיוך לבדיקה ולתרחיש</li>
        </ul>`,
    },
    moscow: {
      title: "MoSCoW — תעדוף דרישות",
      html: `<p>תעדוף לפי מידת ההכרחיות ל<b>גרסה</b> — מה נכנס עכשיו, לא סדר הפיתוח:</p>
        <ul class="g-list">
          <li><b>M</b> · <span dir="ltr">Must</span> — חובה; בלעדיה הגרסה נכשלת</li>
          <li><b>S</b> · <span dir="ltr">Should</span> — רצוי; חשוב אך לא קריטי</li>
          <li><b>C</b> · <span dir="ltr">Could</span> — אפשרי; אם יישאר זמן</li>
          <li><b>W</b> · <span dir="ltr">Won't</span> — לא בגרסה זו (במכוון)</li>
        </ul>`,
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
      title: "Wetherbe — “Getting It Right” (1991)",
      html: `<p>המאמר (חומר הקריאה של הרצאה 3): מנהלים לא יודעים איזה מידע הם צריכים,
        ולכן קביעת דרישות נכשלת בארבע טעויות — מבט מחלקתי, ראיונות אישיים, השאלה
        הלא-נכונה, ובלי ניסוי-וטעייה. הפתרונות: עיצוב חוצה-פונקציות · סדנת JAD ·
        ראיון מובנה בשאלות עקיפות · אב-טיפוס.</p>`,
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
    },
  };

  let pop = null;
  let current = null;

  function close() {
    if (pop) { pop.remove(); pop = null; }
    if (current) { current.setAttribute("aria-expanded", "false"); current = null; }
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
    pop.innerHTML = html;
    document.body.appendChild(pop);

    position(el);
    current = el;
    el.setAttribute("aria-expanded", "true");

    pop.querySelector(".glossary-close").addEventListener("click", close);
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
