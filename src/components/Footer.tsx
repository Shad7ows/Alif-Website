import { Logo } from "@/ui/Logo";

/**
 * Footer component displayed at the bottom of all pages
 *
 * Layout (RTL - Right to Left for Arabic):
 * - Top section: Logo, description, social icons on the right
 * - Middle section: Three columns of links
 * - Bottom section: Copyright and legal links
 */
export function Footer() {
  return (
    <footer className="w-full bg-site-bg py-2">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-6">
          {/* Logo and Description - Right side in RTL */}
          <div className="flex flex-col items-start gap-6 lg:col-span-3">
            <Logo />
            <p className="max-w-sm text-[#BBBBBB] leading-relaxed text-right font-tajawal">
              ألف هي أول لغة برمجة عربية متكاملة، مبنية بـ C++ وتعتمد قواعد
              Python. نؤمن بأن البرمجة يجب أن تكون متاحة للجميع بلغتهم الأم.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#247BFF]/30 text-[#EEEEEE] transition-all hover:border-[#247BFF] hover:bg-[#247BFF]/10"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#247BFF]/30 text-[#EEEEEE] transition-all hover:border-[#247BFF] hover:bg-[#247BFF]/10"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#247BFF]/30 text-[#EEEEEE] transition-all hover:border-[#247BFF] hover:bg-[#247BFF]/10"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="mailto:contact@alif.dev"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#247BFF]/30 text-[#EEEEEE] transition-all hover:border-[#247BFF] hover:bg-[#247BFF]/10"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Language Column */}
          <div className="flex w-35 flex-col items-start gap-4">
            <h3 className="text-lg font-bold text-[#EEEEEE]">اللغة</h3>
            <ul className="flex flex-col gap-3 mr-3">
              <li>
                <a
                  href="/docs"
                  className="text-[#BBBBBB] transition-colors hover:text-[#247BFF]"
                >
                  الوثائق
                </a>
              </li>
              <li>
                <a
                  href="/libraries"
                  className="text-[#BBBBBB] transition-colors hover:text-[#247BFF]"
                >
                  المكتبات القياسية
                </a>
              </li>
              <li>
                <a
                  href="/roadmap"
                  className="text-[#BBBBBB] transition-colors hover:text-[#247BFF]"
                >
                  خارطة الطريق
                </a>
              </li>
            </ul>
          </div>

          {/* Community Column */}
          <div className="flex w-35 flex-col items-start gap-4">
            <h3 className="text-lg font-bold text-[#EEEEEE]">المجتمع</h3>
            <ul className="flex flex-col gap-3 mr-3">
              <li>
                <a
                  href="/forum"
                  className="text-[#BBBBBB] transition-colors hover:text-[#247BFF]"
                >
                  المنتدى
                </a>
              </li>
              <li>
                <a
                  href="https://t.me"
                  className="text-[#BBBBBB] transition-colors hover:text-[#247BFF]"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  className="text-[#BBBBBB] transition-colors hover:text-[#247BFF]"
                >
                  Github
                </a>
              </li>
              <li>
                <a
                  href="/contribute"
                  className="text-[#BBBBBB] transition-colors hover:text-[#247BFF]"
                >
                  المساهمة
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-[#BBBBBB] transition-colors hover:text-[#247BFF]"
                >
                  المدونة
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="flex w-35 flex-col items-start gap-4">
            <h3 className="text-lg font-bold text-[#EEEEEE]">المصادر</h3>
            <ul className="flex flex-col gap-3 mr-3">
              <li>
                <a
                  href="/tutorials"
                  className="text-[#BBBBBB] transition-colors hover:text-[#247BFF]"
                >
                  البرامج التعليمية
                </a>
              </li>
              <li>
                <a
                  href="/youtube"
                  className="text-[#BBBBBB] transition-colors hover:text-[#247BFF]"
                >
                  قناة اليوتيوب
                </a>
              </li>
              <li>
                <a
                  href="/examples"
                  className="text-[#BBBBBB] transition-colors hover:text-[#247BFF]"
                >
                  أمثلة
                </a>
              </li>
              <li>
                <a
                  href="/open-source"
                  className="text-[#BBBBBB] transition-colors hover:text-[#247BFF]"
                >
                  مشاريع مفتوحة
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-[#BBBBBB] transition-colors hover:text-[#247BFF]"
                >
                  الأسئلة الشائعة
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-7 border-t border-gray-900 pt-1 text-[14px]">
          <div className="flex h-16 flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-[#9C9C9C] font-tajawal">
              صُنع بـ ❤️ من مطوري ألف – جميع الحقوق محفوظة © 2023
            </p>
            <div className="flex items-center gap-8">
              <a
                href="/license"
                className="text-[#9C9C9C] transition-colors hover:text-[#247BFF] font-tajawal"
              >
                رخصة ألف
              </a>
              <a
                href="/terms"
                className="text-[#9C9C9C] transition-colors hover:text-[#247BFF] font-tajawal"
              >
                شروط الإستخدم
              </a>
              <a
                href="/privacy"
                className="text-[#9C9C9C] transition-colors hover:text-[#247BFF] font-tajawal"
              >
                سياسة الخصوصية
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
