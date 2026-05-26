import { Logo } from "./ui/Logo";
import { SocialButton } from "./ui/SocialButton";
import GitHubIcon from "@/assets/icons/github.svg";
import TelegramIcon from "@/assets/icons/telegram.svg";
import YouTubeIcon from "@/assets/icons/youtube.svg";
import EmailIcon from "@/assets/icons/email.svg";

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
      <div className="flex mx-auto w-full flex-col items-center justify-center">
        {/* Top Section */}
        <div className="grid w-full max-w-360 grid-cols-1 gap-12 md:grid-cols-5 lg:grid-cols-6 px-9">
          {/* Logo and Description - Right side in RTL */}
          <div className="flex flex-col items-start gap-6 md:col-span-2 lg:col-span-3">
            <Logo />
            <p className="max-w-sm text-text-secondary leading-relaxed text-right font-tajawal">
              ألف هي أول لغة برمجة عربية متكاملة، مبنية بـ C++ وتعتمد قواعد
              Python. نؤمن بأن البرمجة يجب أن تكون متاحة للجميع بلغتهم الأم.
            </p>
            <div className="flex gap-5">
              <SocialButton
                href="https://github.com"
                bgColor="#FF00F2"
                ariaLabel="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.7rem"
                  height="1.7rem"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                  >
                    <path d="M9.096 21.25v-3.146a3.33 3.33 0 0 1 .758-2.115c-3.005-.4-5.28-1.859-5.28-5.798c0-1.666 1.432-3.89 1.432-3.89c-.514-1.13-.5-3.084.06-3.551c0 0 1.95.175 3.847 1.75c1.838-.495 3.764-.554 5.661 0c1.897-1.575 3.848-1.75 3.848-1.75c.558.467.573 2.422.06 3.551c0 0 1.432 2.224 1.432 3.89c0 3.94-2.276 5.398-5.28 5.798a3.33 3.33 0 0 1 .757 2.115v3.146" />
                    <path d="M3.086 16.57c.163.554.463 1.066.878 1.496c.414.431.932.77 1.513.988a4.46 4.46 0 0 0 3.62-.216" />
                  </g>
                </svg>
              </SocialButton>
              <SocialButton
                href="https://t.me"
                bgColor="#00F2FF"
                ariaLabel="Telegram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.7rem"
                  height="1.7rem"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M40.83 8.48c1.14 0 2 1 1.54 2.86l-5.58 26.3c-.39 1.87-1.52 2.32-3.08 1.45L20.4 29.26a.4.4 0 0 1 0-.65l15.37-13.88c.7-.62-.15-.92-1.07-.36L15.41 26.54a.46.46 0 0 1-.4.05L6.82 24C5 23.47 5 22.22 7.23 21.33L40 8.69a2.16 2.16 0 0 1 .83-.21Z"
                  />
                </svg>
              </SocialButton>
              <SocialButton
                href="https://youtube.com"
                bgColor="#FF0000"
                ariaLabel="YouTube"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.7rem"
                  height="1.7rem"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="1"
                  >
                    <path d="M2.45 11.419c0-3.017.3-4.526 1.237-5.463s2.446-.937 5.463-.937h5.7c3.017 0 4.525 0 5.463.937s1.237 2.446 1.237 5.463v1.162c0 3.017-.3 4.526-1.237 5.463s-2.446.937-5.463.937h-5.7c-3.017 0-4.526 0-5.463-.937S2.45 15.598 2.45 12.581z" />
                    <path d="m14.686 11.491l-4.268-2.667a.6.6 0 0 0-.918.509v5.335a.6.6 0 0 0 .918.508l4.268-2.667a.6.6 0 0 0 0-1.018Z" />
                  </g>
                </svg>
              </SocialButton>
              <SocialButton
                href="mailto:aliflang47@gmail.com"
                bgColor="#33FF00"
                ariaLabel="Email"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.7rem"
                  height="1.7rem"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="currentColor"
                    stroke="none"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  >
                    <path d="M5 5h13a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3m0 1c-.5 0-.94.17-1.28.47l7.78 5.03l7.78-5.03C18.94 6.17 18.5 6 18 6H5m6.5 6.71L3.13 7.28C3.05 7.5 3 7.75 3 8v9a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V8c0-.25-.05-.5-.13-.72l-8.37 5.43Z" />
                  </g>
                </svg>
              </SocialButton>
            </div>
          </div>

          {/* Language Column */}
          <div className="flex w-35 flex-col items-start gap-4">
            <h3 className="text-lg font-bold text-text">اللغة</h3>
            <ul className="flex flex-col gap-3 mr-3">
              <li>
                <a
                  href="/docs"
                  className="text-text-secondary transition-colors hover:text-primary"
                >
                  الوثائق
                </a>
              </li>
              <li>
                <a
                  href="/libraries"
                  className="text-text-secondary transition-colors hover:text-primary"
                >
                  المكتبات القياسية
                </a>
              </li>
              <li>
                <a
                  href="/roadmap"
                  className="text-text-secondary transition-colors hover:text-primary"
                >
                  خارطة الطريق
                </a>
              </li>
            </ul>
          </div>

          {/* Community Column */}
          <div className="flex w-35 flex-col items-start gap-4">
            <h3 className="text-lg font-bold text-text">المجتمع</h3>
            <ul className="flex flex-col gap-3 mr-3">
              <li>
                <a
                  href="/forum"
                  className="text-text-secondary transition-colors hover:text-primary"
                >
                  المنتدى
                </a>
              </li>
              <li>
                <a
                  href="https://t.me"
                  className="text-text-secondary transition-colors hover:text-primary"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  className="text-text-secondary transition-colors hover:text-primary"
                >
                  Github
                </a>
              </li>
              <li>
                <a
                  href="/contribute"
                  className="text-text-secondary transition-colors hover:text-primary"
                >
                  المساهمة
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-text-secondary transition-colors hover:text-primary"
                >
                  المدونة
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="flex w-35 flex-col items-start gap-4">
            <h3 className="text-lg font-bold text-text">المصادر</h3>
            <ul className="flex flex-col gap-3 mr-3">
              <li>
                <a
                  href="/tutorials"
                  className="text-text-secondary transition-colors hover:text-primary"
                >
                  البرامج التعليمية
                </a>
              </li>
              <li>
                <a
                  href="/youtube"
                  className="text-text-secondary transition-colors hover:text-primary"
                >
                  قناة اليوتيوب
                </a>
              </li>
              <li>
                <a
                  href="/examples"
                  className="text-text-secondary transition-colors hover:text-primary"
                >
                  أمثلة
                </a>
              </li>
              <li>
                <a
                  href="/open-source"
                  className="text-text-secondary transition-colors hover:text-primary"
                >
                  مشاريع مفتوحة
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-text-secondary transition-colors hover:text-primary"
                >
                  الأسئلة الشائعة
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex mt-9 px-9 w-full items-center justify-center border-t border-gray-900 pt-1 text-[0.875rem]">
          <div className="flex h-16 w-full max-w-360 flex-col items-center justify-between md:flex-row">
            <p className="text-[#9C9C9C] font-tajawal">
              صُنع بـ 💙 من مطوري ألف – جميع الحقوق محفوظة © 2023
            </p>
            <div className="flex items-center gap-8">
              <a
                href="/license"
                className="text-[#9C9C9C] transition-colors hover:text-primary font-tajawal"
              >
                رخصة ألف
              </a>
              <a
                href="/terms"
                className="text-[#9C9C9C] transition-colors hover:text-primary font-tajawal"
              >
                شروط الإستخدم
              </a>
              <a
                href="/privacy"
                className="text-[#9C9C9C] transition-colors hover:text-primary font-tajawal"
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
