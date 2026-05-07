import { marked } from "../source/javascript/markdown.js";

let alifRepo = "alifcommunity/Alif";
export let alifRowRepoLink = `https://raw.githubusercontent.com/${alifRepo}/refs/heads/main/documents`;
export let alifRepoLink = `https://github.com/${alifRepo}`;

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
            const url = `${alifRowRepoLink}/إرشادات إستعمال ألف.md`;
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
            marked.setOptions({
                gfm: true,
                breaks: true,
            });
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
            const sections = CatDiv.querySelectorAll("ol li");

            const sectionObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const currentSectionId = entry.target.id;
                            links.forEach((link) => {
                                link.style.color =
                                    link.dataset.id === currentSectionId
                                        ? "var(--bur--)"
                                        : "#fff";
                            });
                        }
                    });
                },
                { rootMargin: "-20% 0px -80% 0px" },
            );

            sections.forEach((sec) => sectionObserver.observe(sec));
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
            //     `${alifRowRepoLink}/قواعد مطابق ألف.md`
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

function observeCodeBlocks() {
    // Only target proper code blocks, not inline code
    const codeContainers = document.querySelectorAll("pre");
    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const container = entry.target;
                    const codeBlock = container.querySelector("code");

                    if (!container.dataset.enhanced && codeBlock) {
                        // Highlight the code
                        codeBlock.innerHTML = highlightAlif(
                            codeBlock.innerText,
                        );

                        // Create copy button
                        const copyButton = document.createElement("div");
                        copyButton.className = "copy";
                        copyButton.innerHTML = "نسخ";
                        copyButton.addEventListener("click", () =>
                            copyCode(copyButton, codeBlock.innerText),
                        );

                        // Add copy button to the container
                        container.appendChild(copyButton);
                        container.dataset.enhanced = "1";
                    }
                    obs.unobserve(container);
                }
            });
        },
        { threshold: 0.2 },
    );

    codeContainers.forEach((container) => observer.observe(container));
}

// التبديل بين المستندات
document.addEventListener("DOMContentLoaded", () => {
    if (!document.getElementById("Grammar")) return;

    const windowDiv = document.getElementById("window");
    if (windowDiv) {
        windowDiv.addEventListener("click", (e) => {
            const button = e.target.closest("button[data-doc-type]");
            if (button) {
                showDocs(button.getAttribute("data-doc-type"));
            }
        });
    }

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

const alifTokens = [
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
                        inside,
                    )}<span class="mainC">}</span></span>`,
            ),
    },
    { regex: /!![^\r\n]*/y, cls: "explain" },
    { regex: /#[^\r\n]*/y, cls: "comment" },
    { regex: /\b\d+(?:\.\d+)?\b/y, cls: "number" },
    {
        regex: /(?<![\u0600-\u06FF])(دالة|اذا|إذا|استورد|حاول|خلل|نهاية|عام|ارجع|بينما|لأجل|لكل|لاجل|استمر|توقف|احذف|اوإذا|اواذا|والا|وإلا|صنف|الزمن|الرياضيات|نوع)(?![\u0600-\u06FF])/y,
        cls: "keyword",
    },
    { regex: /\s*(صح|خطأ|خطا)(?=(?:\s|[\)\]]|$))/y, cls: "boolean" },
    {
        regex: /(?:\+=|-=|\*=|\/=|\^=|==|!=|<|>|\+|-|\||\*|\\|\^|=|و |او | ليس )/y,
        cls: "operator",
    },
    { regex: /([ء-يA-Za-z_][ء-يA-Za-z0-9_]*)\s*(?=\()/y, cls: "function" },
];

export function highlightAlif(code) {
    const out = [];
    let i = 0;
    while (i < code.length) {
        let hit = false;
        for (const { regex, cls, inner } of alifTokens) {
            regex.lastIndex = i;
            const m = regex.exec(code);
            if (m && m.index === i) {
                let content = inner ? inner(m[0]) : m[0];
                out.push(`<span class="${cls}">${content}</span>`);
                i += m[0].length;
                hit = true;
                break;
            }
        }
        if (!hit) {
            out.push(code[i] === "\n" ? "<br>" : code[i]);
            i++;
        }
    }
    return out.join("");
}

// نسخ الشفرة
export async function copyCode(but, text) {
    try {
        await navigator.clipboard.writeText(text);
        but.textContent = "نُسِخ";
        notify("تم النسخ إلى الحافظة");
    } catch (err) {
        console.error("فشل النسخ:", err.message);
        notify("حدث خطأ أثناء النسخ");
    } finally {
        setTimeout(() => (but.textContent = "نسخ"), 3000);
    }
}
