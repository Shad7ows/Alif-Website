import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import ArabicCodeEditor from "@/components/ArabicCodeEditor";

export default function Home() {
  return (
    <div className="relative flex h-svh min-h-180 max-h-300 flex-col items-center justify-center bg-site-bg overflow-hidden">
      {/* Main Content Grid */}
      <div className="relative z-10 w-full max-w-360 mx-auto px-8">
        <div className="grid grid-cols-2 h-full">
          {/* Right Block - Content */}
          <div className="flex flex-col items-start justify-center gap-1">
            {/* Release Badge */}
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2">
              <span className="absolute w-6 h-6 bg-[#247BFF] right-7 blur-md rounded-full z-0"></span>
              <span className="absolute w-45 h-10 rounded-full border border-[#247BFF]/40 bg-[#247BFF]/10 backdrop-blur-md z-10"></span>
              <div className="w-2 h-2 rounded-full bg-[#247BFF] animate-pulse z-20" />
              <span className="text-[#247BFF] text-sm font-medium font-tajawal z-20">
                الإصدار 5.3 - متاح الآن
              </span>
            </div>
            {/* Gradient Title */}
            <div className="flex relative items-center justify-center">
              <h1 className="relative text-6xl md:text-7xl font-bold font-tajawal text-start leading-tight justify-center ">
                <span className="bg-linear-to-r/srgb from-[#00F2FF] to-[#812EFF] bg-clip-text text-transparent">
                  البرمجة
                  <br />
                  أصبحت أسهل
                </span>
                <span className="absolute w-45 h-15 rounded-full left-0 bottom-3 bg-[#00F2FF] blur-[7.5rem]"></span>
              </h1>
            </div>
            {/* Description Text */}
            <p className="text-2xl md:text-2xl text-[#BBBBBB] font-tajawal text-start leading-relaxed">
              قم بتجربة لغة البرمجة العربية ألف والتي ستفتح لك
              <br />
              آفاق جديدة في البرمجة
            </p>
            {/* Paddle Components (Info Cards) */}
            <div className="flex gap-6 mt-12">
              {/* Version Card */}
              <div className="flex flex-col items-center justify-center w-42 h-19 rounded-[1.3rem] border border-[#247BFF]/60 bg-[#247BFF]/10 backdrop-blur-md">
                <span className="text-2xl font-bold text-[#247BFF] font-tajawal">
                  5.3
                </span>
                <span className="text-[#EEEEEE]/70 text-sm font-tajawal">
                  الإصدار
                </span>
              </div>

              {/* Built With Card */}
              <div className="flex flex-col items-center justify-center w-42 h-19 rounded-[1.3rem] border border-[#247BFF]/60 bg-[#247BFF]/10 backdrop-blur-md">
                <span
                  dir="ltr"
                  className="text-2xl font-bold text-[#247BFF] font-tajawal"
                >
                  C++
                </span>
                <span className="text-[#EEEEEE]/70 text-sm font-tajawal">
                  مبنية بـ
                </span>
              </div>
              {/* Built With Card */}
              <div className="flex flex-col items-center justify-center w-42 h-19 rounded-[1.3rem] border border-[#247BFF]/60 bg-[#247BFF]/10 backdrop-blur-md">
                <span
                  dir="ltr"
                  className="text-2xl font-bold text-[#247BFF] font-tajawal"
                >
                  Python
                </span>
                <span className="text-[#EEEEEE]/70 text-sm font-tajawal">
                  قواعد
                </span>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex gap-6 mt-12">
              {/* Primary Button */}
              <PrimaryButton>تحميل اللغة</PrimaryButton>

              {/* Secondary Button */}
              <SecondaryButton>اكتشف المزيد</SecondaryButton>
            </div>
          </div>
          {/* Left Block - Code Editor */}
          <div className="flex items-center justify-center">
            <ArabicCodeEditor />
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span
          className="text-xs text-white/30"
          style={{ fontFamily: "'Tajawal', sans-serif" }}
        >
          اسحب للأسفل
        </span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-[#247BFF] animate-bounce" />
        </div>
      </div>
    </div>
  );
}
