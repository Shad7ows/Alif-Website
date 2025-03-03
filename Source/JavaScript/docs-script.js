// عرض المستندات
let heads = document.querySelector(".heads");
let docsDiv = document.querySelector(".docs");
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
    document.querySelector(".docs").innerHTML = marked.parse(markdown);
    // اضافة div للأرقام
    document.querySelectorAll("pre").forEach((pre) => {
      let numsDiv = document.createElement("div");
      numsDiv.className = "nums";
      pre.insertBefore(numsDiv, pre.firstChild);
    });
    // استخراج كل العناوين
    let headings = document.querySelectorAll(".docs h5");
    let head = Array.from(headings).map((h5) => h5.innerText.replace(":", ""));
    head.forEach((text, i) => {
      heads.innerHTML += `
        <a href="#${text.replace(/\s+/g, "-")}">
          <h3 dir="rtl">- ${text}</h3>
        </a>`;
    });
    // استخراج كل li
    let titles = document.querySelectorAll(".docs li");
    titles.forEach((li) => {
      let h5 = li.querySelector("h5");
      if (h5) {
        let id = h5.innerText.trim().replace(/\s+/g, "-").replace(":", ""); // تحويل النص إلى ID مناسب
        li.setAttribute("id", id);
      }
    });
    // نسخ الشفرة
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
    // إضافة أرقام الأسطر
    function countLines(codeDiv) {
      let tempDiv = document.createElement("div");
      tempDiv.innerHTML = codeDiv.innerHTML;
      tempDiv.querySelectorAll("br").forEach((br) => br.replaceWith("\n"));
      return tempDiv.innerText.split("\n").length - 1;
    }
    function addNumLines(codeDiv, numsDiv) {
      let lines = countLines(codeDiv);
      numsDiv.innerHTML = Array.from(
        { length: lines },
        (_, i) => `<p>${i + 1}</p>`
      ).join("");
    }
    function syncScroll(codeDiv, numsDiv) {
      numsDiv.scrollTop = codeDiv.scrollTop;
    }
    document.querySelectorAll("pre").forEach((ide) => {
      let codeDiv = ide.querySelector("code");
      let numsDiv = ide.querySelector(".nums");
      if (codeDiv && numsDiv) {
        codeDiv.addEventListener("input", () => addNumLines(codeDiv, numsDiv));
        codeDiv.addEventListener("scroll", () => syncScroll(codeDiv, numsDiv));
        addNumLines(codeDiv, numsDiv);
      }
    });
  });

// تلوين الشفرة
function highlightAlif(code) {
  let stringPattern = /م?"[^"]*"|'[^']*'/g;
  let formattedStringPattern = /"([^"]*?)\{(.*?)\}([^"]*?)"/g;
  let stringMatches = [];

  let sanitizedCode = code.replace(
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
    { txt: /#.*$/gm, className: "comment" },
    { txt: /\b\d+(\.\d+)?\b/g, className: "number" },
    { txt: /(?<!\w)( صح | خطا )(?!\w)/g, className: "boolean" },
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

  matches = matches.concat(stringMatches);
  matches.sort((a, b) => a.index - b.index);

  let highlightedCode = "";
  let lastIndex = 0;
  matches.forEach(({ index, length, replacement }) => {
    highlightedCode += code.substring(lastIndex, index) + replacement;
    lastIndex = index + length;
  });
  highlightedCode += code.substring(lastIndex);

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
