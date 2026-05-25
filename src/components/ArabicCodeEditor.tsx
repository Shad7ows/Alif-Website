"use client";

import { useState, useRef } from "react";

type TokenType =
  | "keyword"
  | "string"
  | "comment"
  | "number"
  | "function"
  | "arabic"
  | "operator"
  | "default";

interface CodeExample {
  title: string;
  code: string;
  output: string;
}

const codeExamples: CodeExample[] = [
  {
    title: "مرحباً مجتمع ألف",
    code: `# برنامج ترحيب
اطبع("مرحباً مجتمع ألف!")

# تعريف متغير
اسم = "ألف"
اطبع("أهلاً بك في لغة " + اسم)`,
    output: `مرحباً مجتمع ألف!
أهلاً بك في لغة ألف`,
  },
  {
    title: "حلقة تكرار",
    code: `# حلقة تكرار بسيطة
لكل رقم في مدى(1, 3):
      اطبع("العدد: ", رقم)

# مجموع الأعداد
مجموع = 0
لكل رقم في مدى(1, 11):
      مجموع += رقم
اطبع("المجموع: ",مجموع)`,
    output: `العدد: 1
العدد: 2
المجموع: 55`,
  },
  {
    title: "دالة وشرط",
    code: `# تعريف دالة
دالة احسب_مساحة(طول, عرض):
      مساحة = طول * عرض
      ارجع مساحة

# استخدام الدالة
مساحة = احسب_مساحة(5, 3)
إذا مساحة > 10:
      اطبع("المساحة كبيرة: ", مساحة)
وإلا:
      اطبع("المساحة صغيرة")`,
    output: `المساحة كبيرة: 15`,
  },
];

function tokenizeLine(line: string): Array<{ text: string; type: TokenType }> {
  const tokens: Array<{ text: string; type: TokenType }> = [];

  if (line.trim().startsWith("#")) {
    tokens.push({ text: line, type: "comment" });
    return tokens;
  }

  const keywords = ["لكل", "في", "مدى", "إذا", "وإلا", "دالة", "ارجع"];
  const functions = ["اطبع", "نص", "احسب_مساحة"];

  let remaining = line;
  while (remaining.length > 0) {
    let matched = false;

    // String literals
    const strMatch = remaining.match(/^(".*?")/);
    if (strMatch) {
      tokens.push({ text: strMatch[1], type: "string" });
      remaining = remaining.slice(strMatch[1].length);
      matched = true;
    }

    if (!matched) {
      // Comments
      const commentMatch = remaining.match(/^(#.*$)/);
      if (commentMatch) {
        tokens.push({ text: commentMatch[1], type: "comment" });
        remaining = remaining.slice(commentMatch[1].length);
        matched = true;
      }
    }

    if (!matched) {
      // Numbers
      const numMatch = remaining.match(/^(\d+)/);
      if (numMatch) {
        tokens.push({ text: numMatch[1], type: "number" });
        remaining = remaining.slice(numMatch[1].length);
        matched = true;
      }
    }

    if (!matched) {
      // Keywords and functions
      let wordMatched = false;
      for (const kw of keywords) {
        if (
          remaining.startsWith(kw) &&
          (remaining.length === kw.length ||
            /[\s(:=+\-*/<>!]/.test(remaining[kw.length]))
        ) {
          tokens.push({ text: kw, type: "keyword" });
          remaining = remaining.slice(kw.length);
          wordMatched = true;
          break;
        }
      }
      if (!wordMatched) {
        for (const fn of functions) {
          if (remaining.startsWith(fn)) {
            tokens.push({ text: fn, type: "function" });
            remaining = remaining.slice(fn.length);
            wordMatched = true;
            break;
          }
        }
      }
      if (wordMatched) matched = true;
    }

    if (!matched) {
      // Operators
      const opMatch = remaining.match(/^([=+\-*/:(),<>!.;])/);
      if (opMatch) {
        tokens.push({ text: opMatch[1], type: "operator" });
        remaining = remaining.slice(1);
        matched = true;
      }
    }

    if (!matched) {
      // Arabic/Latin words (variables, identifiers)
      const wordMatch = remaining.match(
        /^([\u0600-\u06FFa-zA-Z_][\u0600-\u06FFa-zA-Z_0-9]*)/,
      );
      if (wordMatch) {
        tokens.push({ text: wordMatch[1], type: "arabic" });
        remaining = remaining.slice(wordMatch[1].length);
        matched = true;
      }
    }

    if (!matched) {
      // Whitespace
      const spaceMatch = remaining.match(/^(\s+)/);
      if (spaceMatch) {
        tokens.push({ text: spaceMatch[1], type: "default" });
        remaining = remaining.slice(spaceMatch[1].length);
        matched = true;
      }
    }

    if (!matched) {
      // Single character
      tokens.push({ text: remaining[0], type: "default" });
      remaining = remaining.slice(1);
    }
  }

  return tokens;
}

const tokenColors: Record<TokenType, string> = {
  keyword: "#C084FC",
  string: "#86EFAC",
  comment: "#6B7280",
  number: "#FCA5A5",
  function: "#67E8F9",
  arabic: "#FCD34D",
  operator: "#F9A8D4",
  default: "#E2E8F0",
};

function SyntaxHighlightedCode({ code }: { code: string }) {
  const lines = code.split("\n");

  return (
    <div className="code-editor">
      {lines.map((line, i) => (
        <div key={i} className="flex gap-3 items-start">
          <span className="select-none text-white/20 text-right w-8 shrink-0 text-sm leading-6 font-mono">
            {i + 1}
          </span>
          <span
            dir="rtl"
            className="flex-1 text-sm leading-6"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {tokenizeLine(line).map((token, j) => (
              <span
                key={j}
                style={{
                  color: tokenColors[token.type],
                  fontStyle: token.type === "comment" ? "italic" : "normal",
                }}
              >
                {token.text || "\u00A0"}
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ArabicCodeEditor() {
  const [activeExample, setActiveExample] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [copied, setCopied] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const handleRun = () => {
    setIsRunning(true);
    setShowOutput(false);
    setTimeout(() => {
      setIsRunning(false);
      setShowOutput(true);
    }, 600);
  };

  const handleReset = () => {
    setShowOutput(false);
    setIsRunning(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeExample].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExampleChange = (idx: number) => {
    setActiveExample(idx);
    setShowOutput(false);
    setIsRunning(false);
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Glow effects behind the editor */}
      <div className="absolute w-70 h-70 bg-[#247BFF]/25 rounded-full blur-3xl -top-15 -left-15 pointer-events-none" />
      <div className="absolute w-64 h-64 bg-[#00F2FF]/15 rounded-full blur-3xl -bottom-5 -right-20 pointer-events-none" />
      <div className="absolute w-260 h-48 bg-[#812EFF]/15 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Editor Container */}
      <div
        className="relative w-full max-w-xl rounded-2xl overflow-hidden border border-[#247BFF]/45"
        style={{
          background:
            "linear-gradient(135deg, rgba(36,123,255,0.1) 0%, rgba(129,46,255,0.05) 100%)",
          backdropFilter: "blur(5rem)",
        }}
      >
        {/* Editor Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/3">
          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-md text-text-secondary hover:bg-white/5 transition-all hover:text-accent-primary"
              title="نسخ الشيفرة"
            >
              {copied ? (
                // تم النسخ
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#247BFF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              ) : (
                // نسخ
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
              )}
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-md text-text-secondary hover:bg-white/5 transition-all hover:text-accent-primary"
              title="إعادة تعيين"
            >
              {/* إعادة تعيين الشيفرة */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>
          </div>

          {/* Example tabs */}
          <div className="flex items-center gap-1">
            {codeExamples.map((ex, i) => (
              <button
                key={i}
                onClick={() => handleExampleChange(i)}
                className={`px-3 py-1 rounded-md text-xs font-medium border-0 transition-all duration-300 ${
                  activeExample === i
                    ? "bg-[#247BFF]/18 text-[#247BFF] border border-[#247BFF]/40"
                    : "text-text-secondary hover:text-text hover:bg-white/5"
                }`}
                style={{ fontFamily: "'Tajawal', sans-serif" }}
              >
                {ex.title}
              </button>
            ))}
          </div>

          {/* Window dots */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#296BCD]" />
            <div className="w-3 h-3 rounded-full bg-[#CDAC29]" />
            <div className="w-3 h-3 rounded-full bg-[#8B29CD]" />
          </div>
        </div>

        {/* Code Area - Tall editor */}
        <div
          ref={editorRef}
          className="p-5 w-120 min-h-80 max-h-100 overflow-y-auto bg-[#0A0A1A]/60"
          dir="rtl"
        >
          <SyntaxHighlightedCode code={codeExamples[activeExample].code} />
        </div>

        {/* Bottom bar */}
        <div className="px-5 py-3 border-t border-white/5 flex items-center justify-between bg-white/2">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#247BFF] text-text text-sm font-semibold hover:bg-[#358bff] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_1rem_rgba(32,121,255,0.7)] "
            style={{ fontFamily: "'Tajawal', sans-serif" }}
          >
            {isRunning ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                جاري التشغيل...
              </>
            ) : (
              <>
                تشغيل
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <g transform="rotate(180 12 12)">
                    <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                  </g>
                </svg>
              </>
            )}
          </button>
          <span className="text-xs text-white/30 font-[Tajawal]">
            ألف نـ5.3 - "{codeExamples[activeExample].title}.ألف"
          </span>
        </div>

        {/* Output Panel */}
        {showOutput && (
          <div
            className="border-t border-white/5 bg-[#020B1A]/80 px-5 py-4"
            style={{
              animation: "fadeIn 0.5s ease-out",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-[#247BFF] animate-pulse" />
              <span
                className="text-xs text-[#247BFF] font-medium"
                style={{ fontFamily: "'Tajawal', sans-serif" }}
              >
                المخرجات
              </span>
            </div>
            <pre
              className="text-sm text-[#86EFAC] font-mono whitespace-pre-wrap leading-6"
              dir="rtl"
              style={{ fontFamily: "'Noto Kufi Arabic', monospace" }}
            >
              {codeExamples[activeExample].output}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
