import { highlightAlif, copyCode } from "../docs-script.js";

const versionsDiv = document.querySelector(".versions");

let fileTxt;

async function getFileTxt() {
    try {
        const res = await fetch(
            "https://raw.githubusercontent.com/Shad7ows/Alif/Alif5.0/documents/ما الجديد.md"
        );
        if (!res.ok) throw new Error("فشل في تحميل الملف");
        fileTxt = await res.text();
        fileTxt = marked.parse(fileTxt);
        versionsDiv.innerHTML = fileTxt;

        document.querySelectorAll("code").forEach((block) => {
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
