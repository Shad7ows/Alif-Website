const versionsDiv = document.querySelector(".versions");

let fileTxt;

async function getFileTxt() {
    try {
        const res = await fetch(
            "https://raw.githubusercontent.com/Shad7ows/Alif/Alif5.0/documents/ما الجديد.md"
        );
        if (!res.ok) throw new Error("فشل في تحميل الملف");
        fileTxt = await res.text();
        versionsDiv.innerHTML = marked.parse(fileTxt);
    } catch (err) {
        console.error("Error:", err);
    }
}
getFileTxt();
