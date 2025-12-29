const heads = document.querySelector(".heads");
const CatDiv = document.querySelector("#Catalogue");
const GramDiv = document.getElementById("Grammar");
const headingsDiv = document.querySelector(".headings");
const openHeadsButton = document.getElementById("openheads");

async function showDocs(docType) {
    document.title = docType;
    const hash = encodeURIComponent(docType.replace(/\s+/g, "_"));
    if (location.hash !== "#" + hash) location.hash = hash;

    if (docType === "إرشادات استعمال ألف") {
        location.hash = "";
        try {
            const url =
                "https://raw.githubusercontent.com/alifcommunity/Alif/refs/heads/main/documents/إرشادات إستعمال ألف.md";
            const cacheKey = "doc-" + docType;
            let markdown = localStorage.getItem(cacheKey);
            let date = localStorage.getItem(cacheKey + "date");
            if (
                !markdown ||
                new Date().getTime() - date > 7 * 24 * 60 * 60 * 1000
            ) {
                const res = await fetch(url);
                markdown = await res.text();
                localStorage.setItem(cacheKey, markdown);
                localStorage.setItem(cacheKey + "date", new Date().getTime());
            }

            GramDiv.style.display = "none";
            CatDiv.style.display = "block";
            headingsDiv.style.display = "flex";
            if (window.innerWidth < 500) openHeadsButton.style.display = "flex";
            CatDiv.innerHTML = marked.parse(markdown);

            // اضافة زر نسخ الشفرة وتلوين الشفرة
            observeCodeBlocks();

            // اضافة العناوين الجانبية
            const headings = CatDiv.querySelectorAll("h5");
            heads.innerHTML = "";
            const frag = document.createDocumentFragment();
            headings.forEach((h5) => {
                const text = h5.innerText.replace(/["#:]/g, "").trim();
                const id = text.replace(/\s+/g, "_");
                h5.id = id;
                const link = document.createElement("a");
                link.href = "#" + id;
                link.className = "section-link";
                link.dataset.id = id;
                link.innerHTML = `<h3 dir="rtl">- ${text}</h3>`;
                frag.appendChild(link);
            });
            heads.appendChild(frag);

            // مكتبة انميشن النزول
            const titles = CatDiv.querySelectorAll("ol li");
            titles.forEach((li) => {
                const h5 = li.querySelector("h5");
                if (h5) li.id = h5.id;
                li.dataset.aos = "fade-up";
            });
            if (typeof AOS !== "undefined") {
                AOS.init({ duration: 400 });
                AOS.refresh();
            }

            // تلوين الزر مع القسم المعروض
            const links = heads.querySelectorAll(".section-link");
            const sectionMap = {};
            links.forEach((link) => (sectionMap[link.dataset.id] = link));
            const sections = CatDiv.querySelectorAll("ol li");
            const offset = 20;
            window.addEventListener("scroll", () => {
                let currentSection = null;
                let minTop = Infinity;
                sections.forEach((sec) => {
                    const rect = sec.getBoundingClientRect();
                    if (rect.top >= offset && rect.top < minTop) {
                        minTop = rect.top;
                        currentSection = sec.id;
                    }
                });
                if (currentSection) {
                    links.forEach((link) => {
                        link.style.color =
                            link.dataset.id === currentSection
                                ? "var(--bur--)"
                                : "#fff";
                    });
                }
            });
        } catch (e) {
            console.error(e.message);
        }
    } else if (docType === "قواعد مطابق ألف") {
        try {
            GramDiv.style.display = "block";
            CatDiv.style.display = "none";
            headingsDiv.style.display = "none";
            heads.innerHTML = "";
            openHeadsButton.style.display = "none";

            // const res = await fetch(
            //     "https://raw.githubusercontent.com/alifcommunity/Alif/refs/heads/main/documents/قواعد مطابق ألف.md"
            // );
            // if (!res.ok) throw new Error("الملف غير موجود");
            // const docs = await res.text();
            // GramDiv.innerHTML = highlightAlif(
            //     docs.replaceAll(/\[\^\d+\]/g, "")
            // ).replaceAll(
            //     /<span class="(keyword|boolean|explain|operator)">(.*?)<\/span>/g,
            //     "$2"
            // );
        } catch (e) {
            console.error(e.message);
        }
    }
}
// التلوين Lazy
function observeCodeBlocks() {
    const codes = document.querySelectorAll("code");
    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const block = entry.target;
                    if (!block.dataset.enhanced) {
                        block.innerHTML = highlightAlif(block.innerText);
                        const copyButton = document.createElement("div");
                        copyButton.className = "copy";
                        copyButton.innerHTML = "نسخ";
                        copyButton.addEventListener("click", () =>
                            copyCode(copyButton, block.innerText)
                        );
                        block.appendChild(copyButton);
                        block.dataset.enhanced = "1";
                    }
                    obs.unobserve(block); // عشان مينفذش تاني
                }
            });
        },
        { threshold: 0.2 }
    ); // يبدأ التلوين لما 20% من الكود يظهر

    codes.forEach((block) => observer.observe(block));
}

// التبديل بين المستندات
document.addEventListener("DOMContentLoaded", () => {
    const docButtons = document.querySelectorAll(
        "#window button[data-doc-type]"
    );
    docButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const docType = button.getAttribute("data-doc-type");
            showDocs(docType);
        });
    });

    const urlHash = decodeURIComponent(location.hash.replace("#", ""));
    if (urlHash === "قواعد_مطابق_ألف") showDocs("قواعد مطابق ألف");
    else showDocs("إرشادات استعمال ألف");
});

// اضافة المسافة العلوية للنزول
document.addEventListener("click", (e) => {
    const link = e.target.closest("a.section-link");
    if (!link) return;
    const id = link.getAttribute("href").slice(1);
    const target = document.getElementById(id);
    if (target) {
        e.preventDefault();
        const offset = window.innerHeight * 0.1;
        const top = target.offsetTop - offset;
        window.scrollTo({
            top,
            behavior: "smooth",
        });
        if (location.hash !== "#" + id) history.pushState(null, "", "#" + id);
        else history.replaceState(null, "", "#" + id);
    }
});

export function highlightAlif(code) {
    const tokens = [
        { regex: /alif\s/y, cls: "function" },
        { regex: /-{1,2}[ء-يA-Za-z_][ء-يA-Za-z0-9_]*/y, cls: "explain" },
        {
            regex: /م?(['"])(?:\\.|(?!\1).)*?(?:\{.*?\}(?:\\.|(?!\1).)*?)*\1/y,
            cls: "string",
            inner: (match) =>
                match.replace(
                    /\{([^}]*)\}/g,
                    (m, inside) =>
                        `<span class="interp"><span class="mainC">{</span>${highlightAlif(
                            inside
                        )}<span class="mainC">}</span></span>`
                ),
        },
        { regex: /!![^\r\n]*/y, cls: "explain" },
        { regex: /#[^\r\n]*/y, cls: "comment" },
        { regex: /\b\d+(?:\.\d+)?\b/y, cls: "number" },
        {
            regex: /(?<!\w)(دالة|اذا|إذا|استورد|حاول|خلل|نهاية|عام|ارجع|بينما|لأجل|لكل|لاجل|استمر|توقف|احذف|اوإذا|اواذا|والا|وإلا|صنف|الزمن|الرياضيات|نوع)(?!\w)/y,
            cls: "keyword",
        },
        { regex: /\s*(صح|خطأ|خطا)(?=(?:\s|[\)\]]|$))/y, cls: "boolean" },
        {
            regex: /(?:\+=|-=|\*=|\/=|\^=|==|!=|<|>|\+|-|\||\*|\\|\^|=|و |او | ليس )/y,
            cls: "operator",
        },
        { regex: /([ء-يA-Za-z_][ء-يA-Za-z0-9_]*)\s*(?=\()/y, cls: "function" },
    ];

    let out = "";
    let i = 0;
    while (i < code.length) {
        let hit = false;
        for (const { regex, cls, inner } of tokens) {
            regex.lastIndex = i;
            const m = regex.exec(code);
            if (m && m.index === i) {
                let content = inner ? inner(m[0]) : m[0];
                out += `<span class="${cls}">${content}</span>`;
                i += m[0].length;
                hit = true;
                break;
            }
        }
        if (!hit) {
            out += code[i] === "\n" ? "<br>" : code[i];
            i++;
        }
    }
    return out;
}

// نسخ الشفرة
export function copyCode(but, code) {
    const formatted = code
        .replace(/&gt;/g, ">")
        .replace(/&lt;/g, "<")
        .replace(/<br>/g, "\n")
        .replace(/<\/?span[^>]*>/g, "");
    navigator.clipboard.writeText(formatted);
    but.textContent = "نُسِخ";
    notify("تم النسخ إلى الحافظة");
    setTimeout(() => (but.textContent = "نسخ"), 3000);
}
