import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import ArabicCodeEditor from "@/components/ArabicCodeEditor";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      {/* Scroll indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-50">
        <span
          className="text-xs text-white/30"
          style={{ fontFamily: "'Tajawal', sans-serif" }}
        >
          اسحب للأسفل
        </span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
      <div
        className="relative flex h-auto flex-col items-center justify-center bg-site-bg overflow-hidden 
        tablet:min-h-180 tablet:max-h-320"
      >
        {/* Main Content Grid */}
        <div
          className="relative z-10 w-full max-w-360 mx-1 px-4
          tablet:mx-auto tablet:px-8"
        >
          <div
            className="grid h-full grid-cols-1
            tablet:grid-cols-2"
          >
            {/* Right Block - Content */}
            <div className="flex flex-col h-svh items-start justify-center gap-1">
              {/* Release Badge */}
              <div className="inline-flex items-center justify-center gap-2 px-3.5 py-2 tablet:px-5">
                <span
                  className="absolute w-4.5 h-4.5 bg-primary right-4 blur-sm rounded-full z-0  
              tablet:w-6 tablet:h-6 tablet:right-7 tablet:blur-md"
                ></span>
                <span
                  className="absolute w-33.75 h-7.5 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-md z-10 
              tablet:w-45 tablet:h-10"
                ></span>
                <div
                  className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse z-20
              tablet:w-2 tablet:h-2"
                />
                <span
                  className="text-primary text-[0.65rem] font-medium font-tajawal z-20
              tablet:text-sm"
                >
                  الإصدار 5.3 - متاح الآن
                </span>
              </div>
              {/* Gradient Title */}
              <div className="flex relative items-center justify-center py-2">
                <h1
                  className="relative text-5xl font-bold font-tajawal text-start leading-tight justify-center 
              tablet:text-7xl"
                >
                  <span className="py-2 bg-linear-to-r/srgb from-[#00F2FF] to-[#812EFF] bg-clip-text text-transparent">
                    البرمجة
                    <br />
                    أصبحت أسهل
                  </span>
                  <span
                    className="absolute w-33.75 h-11.25 rounded-full -left-2 bottom-2 bg-[#00F2FF] blur-[5.5rem] 
                tablet:w-45 tablet:h-15 tablet:left-0 tablet:bottom-3 tablet:blur-[7.5rem]"
                  ></span>
                </h1>
              </div>
              {/* Description Text */}
              <p className="tablet:text-2xl text-text-secondary font-tajawal text-start leading-relaxed">
                قم بتجربة لغة البرمجة العربية ألف والتي ستفتح لك
                <br />
                آفاق جديدة في البرمجة
              </p>
              {/* Paddle Components (Info Cards) */}
              <div
                className="relative flex items-center justify-between mt-9 w-full
            tablet:mt-12 tablet:gap-6 tablet:w-auto"
              >
                {/* Version Card */}
                <div className="relative">
                  <span
                    className="absolute w-20 h-6 bottom-3 left-1/2 -translate-x-1/2 blur-md
                   rounded-full bg-primary/45 tablet:blur-lg tablet:w-27 tablet:h-9"
                  />
                  <div
                    className="flex flex-col items-center justify-center w-27 h-14.25 rounded-2xl
                    border border-primary/70 bg-primary/10 backdrop-blur-lg
                    tablet:rounded-[1.3rem] tablet:w-42 tablet:h-19"
                  >
                    <span
                      className="text-lg font-bold text-primary font-tajawal 
                    tablet:text-2xl"
                    >
                      5.3
                    </span>
                    <span
                      className="text-[0.65rem] text-[#EEEEEE]/70 font-tajawal 
                    tablet:text-sm"
                    >
                      الإصدار
                    </span>
                  </div>
                </div>

                {/* Built With Card */}
                <div className="relative">
                  <span
                    className="absolute w-20 h-6 bottom-3 left-1/2 -translate-x-1/2 blur-md
                   rounded-full bg-primary/45 tablet:blur-lg tablet:w-27 tablet:h-9"
                  />
                  <div
                    className="flex flex-col items-center justify-center w-27 h-14.25 rounded-2xl
                    border border-primary/70 bg-primary/10 backdrop-blur-lg 
                    tablet:rounded-[1.3rem] tablet:w-42 tablet:h-19"
                  >
                    <span
                      dir="ltr"
                      className="text-lg font-bold text-primary font-tajawal 
                  tablet:text-2xl"
                    >
                      C++
                    </span>
                    <span
                      className="text-[0.65rem] text-[#EEEEEE]/70 font-tajawal 
                  tablet:text-sm"
                    >
                      مبنية بـ
                    </span>
                  </div>
                </div>
                {/* Grammer Of Card */}
                <div className="relative">
                  <span
                    className="absolute w-20 h-6 bottom-3 left-1/2 -translate-x-1/2 blur-md
                   rounded-full bg-primary/45 tablet:blur-lg tablet:w-27 tablet:h-9"
                  />
                  <div
                    className="flex flex-col items-center justify-center w-27 h-14.25 rounded-2xl
                    border border-primary/70 bg-primary/10 backdrop-blur-lg 
                    tablet:rounded-[1.3rem] tablet:w-42 tablet:h-19 "
                  >
                    <span
                      dir="ltr"
                      className="text-lg font-bold text-primary font-tajawal 
                  tablet:text-2xl"
                    >
                      Python
                    </span>
                    <span
                      className="text-[0.65rem] text-[#EEEEEE]/70 font-tajawal 
                  tablet:text-sm"
                    >
                      قواعد
                    </span>
                  </div>
                </div>
              </div>
              {/* Buttons */}
              <div className="flex gap-4 mt-9 tablet:gap-6 tablet:mt-12">
                {/* Primary Button */}
                <PrimaryButton>تحميل اللغة</PrimaryButton>

                {/* Secondary Button */}
                <SecondaryButton>اكتشف المزيد</SecondaryButton>
              </div>
            </div>
            {/* Left Block - Code Editor */}
            <div className="flex h-svh items-center justify-center">
              <ArabicCodeEditor />
            </div>
          </div>
        </div>
        {/* Back to Top Button */}
        <BackToTop />
      </div>
    </>
  );
}
