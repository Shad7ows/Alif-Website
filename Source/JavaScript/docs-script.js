// عرض المستندات
let heads = document.querySelector(".heads");
let docsDiv = document.querySelector(".docs");
let docsHeader = `
<div class="docsHeader">
    <div class="but" id="openheads">
        <svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6H5C4.4 6 4 5.6 4 5C4 4.4 4.4 4 5 4H19C19.6 4 20 4.4 20 5C20 5.6 19.6 6 19 6Z">
            </path>
            <path d="M19 2H1C0.4 2 0 1.6 0 1C0 0.4 0.4 0 1 0H19C19.6 0 20 0.4 20 1C20 1.6 19.6 2 19 2Z">
            </path>
            <path d="M19 10H1C0.4 10 0 9.6 0 9C0 8.4 0.4 8 1 8H19C19.6 8 20 8.4 20 9C20 9.6 19.6 10 19 10Z">
            </path>
            <path
                d="M19 14H5C4.4 14 4 13.6 4 13C4 12.4 4.4 12 5 12H19C19.6 12 20 12.4 20 13C20 13.6 19.6 14 19 14Z">
            </path>
        </svg>
        <p>العناوين</p>
    </div>
</div>
`;
fetch(
  "https://raw.githubusercontent.com/Shad7ows/Alif/refs/heads/Alif5.0/documents/إرشادات إستعمال ألف.md"
)
  .then((res) => {
    if (!res.ok) {
      throw new Error("الملف غير موجود");
    }
    return res.text();
  })
  .then((markdown) => {
    // document.querySelector(".docs").innerHTML =
    //   docsHeader + marked.parse(markdown);

    // إضافة أرقام الأسطر
    // document.querySelectorAll("pre").forEach((pre) => {
    //   let numsDiv = document.createElement("div");
    //   numsDiv.className = "nums";
    //   pre.insertBefore(numsDiv, pre.firstChild);
    // });
    // function countLines(codeDiv) {
    //   let tempDiv = document.createElement("div");
    //   tempDiv.innerHTML = codeDiv.innerHTML;
    //   tempDiv.querySelectorAll("br").forEach((br) => br.replaceWith("\n"));
    //   return tempDiv.innerText.split("\n").length - 1;
    // }
    // function addNumLines(codeDiv, numsDiv) {
    //   let lines = countLines(codeDiv);
    //   numsDiv.innerHTML = Array.from(
    //     { length: lines },
    //     (_, i) => `<p>${i + 1}</p>`
    //   ).join("");
    // }
    // function syncScroll(codeDiv, numsDiv) {
    //   numsDiv.scrollTop = codeDiv.scrollTop;
    // }
    // document.querySelectorAll("pre").forEach((ide) => {
    //   let codeDiv = ide.querySelector("code");
    //   let numsDiv = ide.querySelector(".nums");
    //   if (codeDiv && numsDiv) {
    //     codeDiv.addEventListener("input", () => addNumLines(codeDiv, numsDiv));
    //     codeDiv.addEventListener("scroll", () => syncScroll(codeDiv, numsDiv));
    //     addNumLines(codeDiv, numsDiv);
    //   }
    // });

    // نسخ الشفرة
    document.querySelectorAll("code").forEach((block) => {
      // block.innerHTML = highlightAlif(block.innerHTML);
      let copyButton = document.createElement("div");
      copyButton.className = "copy";
      copyButton.innerText = "نسخ";
      copyButton.onclick = function () {
        copyCode(this, block.innerHTML);
      };
      block.appendChild(copyButton);
    });

    // استخراج كل العناوين
    let headings = document.querySelectorAll(".docs h5");
    let head = Array.from(headings).map((h5) => {
      let cleanedText = h5.innerText
        .replace(/"/g, "")
        .replace(/[:]/g, "")
        .trim();
      return cleanedText;
    });
    head.forEach((text, i) => {
      let id = text.replace(/\s+/g, "-");
      heads.innerHTML += `<a href="#${id}" class="section-link" data-id="${id}"><h3 dir="rtl">- ${text}</h3></a>`;
    });

    // جعل العرض في الوسط
    document.querySelectorAll(".section-link").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const id = link.getAttribute("data-id");
        const section = document.getElementById(id);
        const topPosition = section.offsetTop - 80;
        window.scrollTo({ top: topPosition, behavior: "smooth" });
      });
    });

    // تغيير لون العنوان حسب القسم الذي يتم التمرير إليه
    window.addEventListener("scroll", () => {
      let currentSection = "";
      titles.forEach((section) => {
        if (pageYOffset >= section.offsetTop - 100) {
          currentSection = section.getAttribute("id");
        }
      });
      document.querySelectorAll(".heads .section-link").forEach((link) => {
        link.style.color = "#fff";
        if (link.getAttribute("href").includes(currentSection)) {
          link.style.color = "var(--bur--)";
        }
        if (!currentSection || currentSection.trim() === "") {
          link.style.color = "#fff";
        }
      });
    });

    // استخراج كل li
    let titles = document.querySelectorAll(".docs li");
    titles.forEach((li) => {
      let h5 = li.querySelector("h5");
      li.setAttribute("data-aos", "fade-up");
      if (h5) {
        let cleanedText = h5.innerText
          .replace(/"/g, "")
          .replace(/[:]/g, "")
          .trim();
        let id = cleanedText.replace(/\s+/g, "-");
        li.setAttribute("id", id);
      }
    });

    // فتح أو إغلاق العناوين عند النقر على الزر
    const openHeadsButton = document.getElementById("openheads");
    const headingss = document.querySelector(".headings");
    let isheadingsVisible = false;
    openHeadsButton.addEventListener("click", (event) => {
      event.stopPropagation();
      if (isheadingsVisible) {
        headingss.style.transform = "translateX(300px)";
        docsDiv.style.opacity = 1;
      } else {
        headingss.style.transform = "translateX(0)";
        docsDiv.style.opacity = 0.5;
      }
      isheadingsVisible = !isheadingsVisible;
    });
    document.addEventListener("click", () => {
      if (isheadingsVisible) {
        headingss.style.transform = "translateX(300px)";
        docsDiv.style.opacity = 1;
        isheadingsVisible = false;
      }
    });
    headingss.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });

// تلوين الشفرة
function highlightAlif(code) {
  let stringPattern = /م?"[^"]*"|'[^']*'/g;
  let formattedStringPattern = /"([^"]*?)\{(.*?)\}([^"]*?)"/g;
  let stringMatches = [];

  let commentPattern = /(?:#.*$)/gm;
  let comments = [];
  let sanitizedCode = code.replace(commentPattern, (match, offset) => {
    comments.push({
      index: offset,
      length: match.length,
      replacement: `<span class="comment">${match}</span>`,
    });
    return "☀".repeat(match.length);
  });
  let explainPattern = /(?:!!.*$)/gm;
  let explains = [];
  sanitizedCode = code.replace(explainPattern, (match, offset) => {
    explains.push({
      index: offset,
      length: match.length,
      replacement: `<span class="explain">${match}</span>`,
    });
    return "☀".repeat(match.length);
  });

  sanitizedCode = sanitizedCode.replace(
    formattedStringPattern,
    (match, before, expr, after, offset) => {
      let formattedReplacement = `<span class="string">"${before}</span>{${expr}}<span class="string">"${after}"</span>`;
      stringMatches.push({
        index: offset,
        length: match.length,
        replacement: formattedReplacement,
      });
      return "☀".repeat(match.length);
    }
  );

  sanitizedCode = sanitizedCode.replace(stringPattern, (match, offset) => {
    stringMatches.push({
      index: offset,
      length: match.length,
      replacement: `<span class="string">${match}</span>`,
    });
    return "☀".repeat(match.length);
  });

  let patterns = [
    { txt: /\b\d+(\.\d+)?\b/g, className: "number" },
    { txt: /(صح|خطأ|خطا)(\)|]|\s)+/g, className: "boolean" },
    {
      txt: /(?<!\w)(دالة|اذا|استورد|ارجع|بينما|لاجل|استمر|توقف|احذف|اواذا|والا|صنف|الزمن|الرياضيات|نوع)(?!\w)/g,
      className: "keyword",
    },
    {
      txt: /(\+=|-=|\*=|\/=|\^=|==|!=|<|>|\+|- |\*|\\|\^|=| و | او | ليس )/g,
      className: "operator",
    },
    {
      txt: /([ء-يA-Za-z_][ء-يA-Za-z0-9_]*)\s*(?=\()/g,
      className: "function",
    },
  ];

  let matches = [];
  patterns.forEach(({ txt, className }) => {
    let match;
    while ((match = txt.exec(sanitizedCode)) !== null) {
      matches.push({
        index: match.index,
        length: match[0].length,
        replacement: `<span class="${className}">${match[0]}</span>`,
      });
    }
  });

  matches = matches.concat(stringMatches).concat(comments).concat(explains);
  matches.sort((a, b) => a.index - b.index);

  let highlightedCode = "";
  let lastIndex = 0;
  matches.forEach(({ index, length, replacement }) => {
    highlightedCode += sanitizedCode.substring(lastIndex, index) + replacement;
    lastIndex = index + length;
  });
  highlightedCode += sanitizedCode.substring(lastIndex);

  return highlightedCode.replace(/\n/g, "<br>");
}

// نسخ الشفرة
function copyCode(but, code) {
  let formattedCode = code
    .replace(/  /g, "")
    .replace(/&gt; /g, "")
    .replace(/&lt; /g, "")
    .replace(/<br>/g, "\n")
    .replace(/<\/span>/g, "")
    .replace(/<span class="[^"]+">/g, "")
    .replace(/<div class="copy">نسخ<\/div>/g, "");

  navigator.clipboard.writeText(formattedCode);
  but.innerHTML = "نُسِخ";
  setTimeout(function () {
    but.innerHTML = "نسخ";
  }, 3000);
}
