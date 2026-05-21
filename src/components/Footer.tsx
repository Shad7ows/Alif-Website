import { Logo } from "@/ui/Logo";
import { SocialButton } from "./SocialButton";

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
            <div className="flex gap-5">
              <SocialButton
                href="https://github.com"
                icon="/github.svg"
                bgColor="#FF00F2"
                ariaLabel="GitHub"
              />
              <SocialButton
                href="https://t.me"
                icon="/telegram.svg"
                bgColor="#00F2FF"
                ariaLabel="Telegram"
              />
              <SocialButton
                href="https://youtube.com"
                icon="/youtube.svg"
                bgColor="#FF0000"
                ariaLabel="YouTube"
              />
              <SocialButton
                href="mailto:aliflang47@gmail.com"
                icon="/email.svg"
                bgColor="#33FF00"
                ariaLabel="Email"
              />
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
              صُنع بـ 💙 من مطوري ألف – جميع الحقوق محفوظة © 2023
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
