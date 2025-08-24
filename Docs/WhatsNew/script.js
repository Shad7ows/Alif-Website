import { highlightAlif, copyCode } from "../docs-script.js";

const versionsDiv = document.querySelector(".versions");
let lastVer = document.getElementById("lastVer");

async function getFileTxt() {
    try {
        const res = await fetch(
            "https://raw.githubusercontent.com/Shad7ows/Alif/Alif5.0/documents/ما الجديد.md"
        );
        if (!res.ok) throw new Error("لم يتم تحميل الملف");
        let fileTxt = await res.text();
        let html = marked.parse(fileTxt);

        html = html.replace(
            /<h1>(.*?)\|(.+?)<\/h1>/g,
            (m, versionText, date) => {
                versionText = versionText.trim();
                let version = versionText.match(/\d+.\d+.\d+/);
                date = date.trim().replaceAll("-", "/");
                return `<h2 id=${version}><span>${versionText} . <a href="https://github.com/alifcommunity/Alif/releases/tag/v${version}">جيت هاب</a></span><span class="date">${date}</span></h2>`;
            }
        );

        versionsDiv.innerHTML = html;
        lastVer.innerText = versionsDiv.firstElementChild.id;
        lastVer.href = `#${versionsDiv.firstElementChild.id}`;

        document.querySelectorAll(".versions code").forEach((block) => {
            block.innerHTML = highlightAlif(block.innerHTML);
            let copyButton = document.createElement("div");
            copyButton.className = "copy";
            copyButton.innerText = "نسخ";
            copyButton.onclick = function () {
                copyCode(this, block.innerHTML);
            };
            block.appendChild(copyButton);
        });
    } catch (err) {
        console.error("Error:", err);
    }
}
getFileTxt();
