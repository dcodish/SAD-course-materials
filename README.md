# ניתוח ועיצוב מערכות מידע — חומרי הקורס

המאגר המרכזי של הקורס. כאן מתפרסמים **כל** החומרים — מצגות ההרצאות, קובצי Markdown, דוגמאות וחומרי עזר. אפשר לעיין בקבצים ישירות כאן ב-GitHub (התיקיות למעלה), או להוריד את הכול.

## 📄 סילבוס הקורס

**[הסילבוס העדכני](https://dcodish.github.io/SAD-course-materials/syllabus.html)** — דרישות הקורס, מבנה הציון, לוח המפגשים ומדיניות השימוש בכלי AI. הגרסה שכאן היא הגרסה הקובעת ומתעדכנת במהלך הסמסטר.

## 📚 הרצאות — צפייה אונליין

לחצו על הרצאה כדי לצפות במצגת האינטראקטיבית בדפדפן. לצד כל הרצאה יש גם קובץ PDF להדפסה — שימו לב שהחלקים האינטראקטיביים (תרשימים שנפתחים בלחיצה, חלוניות הסבר) קיימים **רק** בגרסת ה-HTML:

- **הרצאה 1** — מבוא לניתוח ועיצוב מערכות מידע → [צפייה במצגת](https://dcodish.github.io/SAD-course-materials/lecture-01/) · [PDF להדפסה](Lectures%20PDF%20Format/lecture-01.pdf) · _עודכן 17.08.2026_
- **הרצאה 2** — תיעוד תהליכים עסקיים — BPMN → [צפייה במצגת](https://dcodish.github.io/SAD-course-materials/lecture-02/) · [PDF להדפסה](Lectures%20PDF%20Format/lecture-02.pdf) · _עודכן 17.08.2026_
- **הרצאה 3** — דרישות → [צפייה במצגת](https://dcodish.github.io/SAD-course-materials/lecture-03/) · [PDF להדפסה](Lectures%20PDF%20Format/lecture-03.pdf) · _עודכן 30.08.2026_
- **הרצאה 4-5** — תרשים תרחישי שימוש — Use Case → [צפייה במצגת](https://dcodish.github.io/SAD-course-materials/lecture-04-05/) · [PDF להדפסה](Lectures%20PDF%20Format/lecture-04-05.pdf) · _עודכן 30.08.2026_
- **הרצאה 6-7** — תרשים מחלקות — Class Diagram → [צפייה במצגת](https://dcodish.github.io/SAD-course-materials/lecture-06-07/) · [PDF להדפסה](Lectures%20PDF%20Format/lecture-06-07.pdf) · _עודכן 30.08.2026_
- **הרצאה 8** — תרשים מצבים — State Diagram → [צפייה במצגת](https://dcodish.github.io/SAD-course-materials/lecture-08/) · [PDF להדפסה](Lectures%20PDF%20Format/lecture-08.pdf) · _עודכן 20.09.2026_
- **הרצאה 10** — חקר ישימות והערכת חלופות → [צפייה במצגת](https://dcodish.github.io/SAD-course-materials/lecture-10/) · [PDF להדפסה](Lectures%20PDF%20Format/lecture-10.pdf) · _עודכן 30.08.2026_
- **הרצאה 11** — מתודולוגיות פיתוח → [צפייה במצגת](https://dcodish.github.io/SAD-course-materials/lecture-11/) · [PDF להדפסה](Lectures%20PDF%20Format/lecture-11.pdf) · _עודכן 30.08.2026_

עמוד נחיתה מסודר לכל ההרצאות: <https://dcodish.github.io/SAD-course-materials/>

## 📂 חומרי הקורס — לפי שלבי ה-SDLC

החומרים מאורגנים לפי **שלבי מחזור חיי הפיתוח (SDLC)** בתיקיית [`materials/`](materials/) — כך אפשר לעקוב אחרי הדוגמה הרצה (הזמנת אוכל בקמפוס) שלב אחרי שלב. כל תיקייה מתמלאת ככל שמתקדמים בקורס.

- [`1-ייזום/`](materials/1-ייזום/)
- [`2-חקר-מצב-קיים/`](materials/2-חקר-מצב-קיים/)
- [`3-ניתוח-דרישות/`](materials/3-ניתוח-דרישות/)
- [`4-חקר-ישימות/`](materials/4-חקר-ישימות/)
- [`5-עיצוב/`](materials/5-עיצוב/)
- [`6-פיתוח/`](materials/6-פיתוח/)
- [`7-בדיקות/`](materials/7-בדיקות/)
- [`8-הטמעה-ותפעול/`](materials/8-הטמעה-ותפעול/)

## 🔌 חיבור ל-MCP של הקורס (sad-mcp)

דרך ה-MCP של הקורס תיפגשו ב-Claude את בעלי העניין של הדוגמה הרצה (כמו שמעון, מנהל הקפיטריה), תתרגלו ראיונות לאיסוף דרישות ותקבלו גישה לחומרי הקורס ולכלי התרשימים.

**מה שצריך:** [Claude Desktop](https://claude.ai/download) ו-[Node.js](https://nodejs.org) (גרסת LTS). את השאר Claude יעשה בשבילכם.

### ההתקנה — העתיקו את הבקשה הזו ושלחו ל-Claude Desktop

```text
אני סטודנט בקורס ניתוח ועיצוב מערכות מידע. תתקין לי בבקשה את ה-MCP של הקורס.

מה שצריך לעשות:
1. לוודא שמותקן Node.js. אם לא — תגיד לי להוריד מ-https://nodejs.org (גרסת LTS) ולעצור כאן.
2. למצוא את claude_desktop_config.json. הוא באחד משני המקומות:
   %LOCALAPPDATA%\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\
   %APPDATA%\Claude\
   אם שניהם קיימים — עדכן את שניהם.
3. לגבות את הקובץ לפני שינוי.
4. להוסיף למפתח mcpServers את הרשומה הזו, בלי למחוק שרתים אחרים שכבר מוגדרים:
   "sad-mcp": { "command": "npx", "args": ["-y", "sad-mcp@latest"] }
5. להגיד לי לסגור לגמרי את Claude Desktop (Quit מהאייקון ליד השעון) ולפתוח מחדש.

אם אין לך גישה לקבצים במחשב שלי — תגיד לי את זה, ותן לי במקום את הפקודה להריץ ב-PowerShell.
```

**אם Claude עונה שאין לו גישה לקבצים** — הריצו את זה ב-PowerShell:

```powershell
irm https://dcodish.github.io/SAD-course-materials/install.ps1 | iex
```

בסוף שאלו את Claude: **"מה הגרסה של sad-mcp?"** — התשובה צריכה להיות `sad-mcp@2.12.0` או גבוה יותר. אם קיבלתם מספר נמוך יותר, סגרו את Claude Desktop לגמרי ופתחו מחדש.

> **למה דווקא ככה:** ההתקנה הזו מגדירה את Claude להריץ את השרת דרך `npx` עם התג `@latest`, כך שבכל פתיחה של Claude אתם מקבלים את הגרסה האחרונה. **לא תצטרכו להתקין שוב אף פעם** — גם כשנוסיף כלים או נעדכן חומר במהלך הסמסטר.

<details><summary>חלופה: התקנה בלחיצה אחת (בלי Node, אבל לא מתעדכנת לבד)</summary>

הורידו את [`sad-mcp.mcpb`](downloads/sad-mcp.mcpb) וגררו אותו ב-Claude Desktop אל **Settings → Extensions**.

**שימו לב:** תוסף שמותקן כך נשאר על הגרסה שהורדתם ואינו מתעדכן. כדי לקבל עדכון תצטרכו להסיר אותו ולהתקין מחדש. עדיף להשתמש בבקשה שלמעלה.

</details>

## ⬇️ הורדה למחשב

כפתור ירוק **Code → Download ZIP**. המצגות עובדות גם ללא אינטרנט — פתחו את `index.html` של ההרצאה.

---

ניווט במצגת: חצים / רווח = קדימה-אחורה · `F` = מסך מלא · `O` = מפת שקופיות · `Esc` = חזרה.
