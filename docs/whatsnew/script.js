import { marked } from "../../source/javascript/markdown.js";
import { highlightAlif, alifRepoLink, alifRowRepoLink } from "../docs-script.js";

const versionsContainer = document.getElementById("versions-container");
const lastVer = document.getElementById("lastVer");

async function fetchWhatsNew() {
    try {
        const cacheKey = "doc-whats-new";
        let fileTxt = localStorage.getItem(cacheKey);
        let date = localStorage.getItem(cacheKey + "date");

        // كاش لمدة 24 ساعة لتسريع اول فتح وتقليل من التحميل
        if (!fileTxt || new Date().getTime() - date > 24 * 60 * 60 * 1000) {
            const res = await fetch(
                `${alifRowRepoLink}/ما الجديد.md`,
            );
            if (!res.ok) throw new Error("لم يتم تحميل الملف");
            fileTxt = await res.text();

            localStorage.setItem(cacheKey, fileTxt);
            localStorage.setItem(cacheKey + "date", new Date().getTime());
        }

        marked.setOptions({
            gfm: true,
            breaks: true,
        });

        const rawHtml = marked.parse(fileTxt);

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = rawHtml;

        versionsContainer.innerHTML = "";
        let currentVersionDiv = null;
        let lastVersion = null;

        const allVers = Array.from(tempDiv.querySelectorAll("h1")).map(
            (h) => h.innerText.match(/\d+\.\d+\.\d+/)?.[0],
        );

        Array.from(tempDiv.children).forEach((el) => {
            if (el.tagName === "H1") {
                currentVersionDiv = document.createElement("div");
                currentVersionDiv.className = "version GlassBG";

                const textParts = el.innerText.split("|");
                const versionText = textParts[0] ? textParts[0].trim() : "";
                let dateText = textParts[1] ? textParts[1].trim() : "";
                dateText = dateText.replaceAll("-", "/");

                const matchVer = versionText.match(/\d+\.\d+\.\d+/);
                const version = matchVer ? matchVer[0] : "unknown";

                // الاصدار القبل الاخير لمقارنة التغيرات
                const prev = allVers[allVers.indexOf(version) + 1];
                const comp = prev
                    ? `Alif${prev.replace(/\.0$/, "")}...Alif${version.replace(/\.0$/, "")}`
                    : "";

                if (!lastVersion) lastVersion = version;

                const links = [versionText];
                if (comp) {
                    links.push(
                        `<a target="_blank" href="${alifRepoLink}/compare/${comp}">مقارنة التغيرات</a>`,
                    );
                }
                links.push(
                    `<a target="_blank" href="${alifRepoLink}/releases/tag/v${version}">جيت هاب</a>`,
                );

                const h2 = document.createElement("h2");
                h2.id = version;
                h2.innerHTML = `<span>${links.join(" • ")}</span><span class="date">${dateText}</span>`;

                currentVersionDiv.appendChild(h2);
                versionsContainer.appendChild(currentVersionDiv);
            } else if (currentVersionDiv) {
                currentVersionDiv.appendChild(el);
            }
        });

        if (lastVersion && lastVer) {
            lastVer.innerText = lastVersion;
            lastVer.href = `#${lastVersion}`;
        }

        const codes = versionsContainer.querySelectorAll("code");
        codes.forEach((block) => {
            if (!block.dataset.enhanced) {
                block.innerHTML = highlightAlif(block.innerText);
                block.dataset.enhanced = "1";
            }
        });
    } catch (e) {
        console.error("Error:", e.message);
    }
}

fetchWhatsNew();
