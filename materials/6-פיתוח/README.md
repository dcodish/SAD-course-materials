# שלב 6 — פיתוח (Development)

כותבים את הקוד — היום, הרבה עם AI. · **בקורס:** הרצאה 13.

**הדוגמה הרצה (קמפוס):** הפיכת המפרט למערכת CRUD עובדת בעזרת Claude Code.

<!-- The workshop dossier below is a COPY. Source of truth: the `SAD project` repo
     (markdown sources + `build-docs.sh`, which renders the self-contained HTML into
     `dist/`). If a handout changes there, re-run the build and re-copy the HTML here.
     Do not edit these HTML files by hand — they are generated. -->

## 🛠️ סדנה: מניתוח לפיתוח עם Claude Code

סדנה מעשית שבה כל קבוצה לוקחת את **הניתוח והעיצוב שלה** (חלק א׳ + חלק ב׳) והופכת אותם
למערכת WinForms שרצה — בסיס נתונים, מסך התחברות ומסכי CRUD — כשכל העבודה מונעת מתוך
Claude Code.

הקבצים הם **HTML עצמאיים**: נפתחים בכל דפדפן, עובדים גם בלי אינטרנט, וניתן להדפיס
אותם ל-PDF‏ (Ctrl+P ← Save as PDF).

### לפני הסדנה — חובה

- **[📖 מדריך ההכנה — פתחו כאן](https://dcodish.github.io/SAD-course-materials/materials/6-%D7%A4%D7%99%D7%AA%D7%95%D7%97/%D7%A1%D7%93%D7%A0%D7%AA-Claude-Code/PREREQS.html)** — התקנות, הקמת בסיס הנתונים
  (Azure SQL או מקומי), חשבון GitHub, ואימות שהכול עובד.
  **יש להשלים לפני המפגש** — ביצוע ההתקנות בכיתה מבזבז את זמן הקבוצה כולה.

  <sub>(הקובץ עצמו: [`סדנת-Claude-Code/PREREQS.html`](סדנת-Claude-Code/PREREQS.html) —
  קישור זה מציג את קוד המקור ב-GitHub, לא את המדריך.)</sub>

### חומרי הסדנה

| קובץ | מה זה |
|---|---|
| [📊 מצגת השיעור](https://dcodish.github.io/SAD-course-materials/materials/6-%D7%A4%D7%99%D7%AA%D7%95%D7%97/%D7%A1%D7%93%D7%A0%D7%AA-Claude-Code/SLIDE_DECK.html) | מצגת ההרצאה. ניווט בחצים, `O` לסקירת השקפים, `F` למסך מלא |
| [📘 שלבי השיעור — המדריך המלא](https://dcodish.github.io/SAD-course-materials/materials/6-%D7%A4%D7%99%D7%AA%D7%95%D7%97/%D7%A1%D7%93%D7%A0%D7%AA-Claude-Code/LESSON_STEPS.html) | כל שלב עם ההסברים, ה-Prompts ונקודות הבדיקה |
| [⚡ דף ה-Prompts](https://dcodish.github.io/SAD-course-materials/materials/6-%D7%A4%D7%99%D7%AA%D7%95%D7%97/%D7%A1%D7%93%D7%A0%D7%AA-Claude-Code/PROMPTS_CHEATSHEET.html) | כל ה-Prompts להעתקה-הדבקה, לפי שלבים |
| [🔀 עבודה עם git בקבוצה](https://dcodish.github.io/SAD-course-materials/materials/6-%D7%A4%D7%99%D7%AA%D7%95%D7%97/%D7%A1%D7%93%D7%A0%D7%AA-Claude-Code/GIT_GROUP_WORKFLOW.html) | שגרת pull/commit/push, חלוקת עבודה וקונפליקטים |

<sub>הקישורים מובילים לאתר הקורס. הקבצים עצמם יושבים ב-`סדנת-Claude-Code/` — לחיצה עליהם
ישירות ב-GitHub מציגה קוד מקור ולא את המסמך.</sub>

בסדנה עוקבים אחרי **שלבי השיעור**, ודף ה-Prompts פתוח לצידו להעתקה.

### לעיון — קוד הפרויקט לדוגמה

[`github.com/dcodish/SAD-sample-project`](https://github.com/dcodish/SAD-sample-project) —
מערכת ה-WinForms המלאה שהסדנה בנויה סביבה: ירושה, מחלקת קישור, ניווט Panels,
סקריפטי בסיס נתונים ו-Stored Procedures. זהו גם מקור המסמכים שלמעלה.

הקוד הוא **דוגמת ייחוס, לא תבנית להעתקה** — הפרויקט שלכם נבנה מהניתוח שלכם.
