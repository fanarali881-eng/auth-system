import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Link } from "wouter";

export default function Login() {
  return (
    <div className="min-h-screen relative flex flex-col font-sans" dir="rtl">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/official-bg-final.png" 
          alt="Background" 
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-[#2b1e4d]/30 mix-blend-multiply"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 w-full p-6 flex justify-between items-start">
        <div className="flex items-center gap-2 text-white">
          <img src="/images/sbc-logo-white.png" alt="Saudi Business Center" className="h-16 object-contain brightness-0 invert" />
        </div>
        
        <div className="flex items-center gap-2 text-white cursor-pointer hover:text-gray-200 transition-colors">
          <span className="font-bold text-lg">English</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
            <path d="M2 12h20"/>
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex items-center justify-center px-4">
        <div className="bg-white rounded-[20px] shadow-lg w-full max-w-[700px] p-8 text-center">
          <h1 className="text-[30px] font-bold text-[#35363a] mb-[1.5rem]">تسجيل دخول</h1>
          
          <p className="text-[#3b3b3b] text-[18px] mb-[16px] font-normal leading-[32px]">
            للمواطن السعودي أو المقيم الذي يحمل إقامة سعودية
          </p>
          
          <div className="flex justify-center mb-[24px]">
            <img src="/images/nafath-logo.png" alt="Nafath" className="h-[160px] object-contain" />
          </div>
          
          <p className="text-[#212529] text-[16px] mb-[16px] leading-[26px] max-w-full mx-auto font-normal">
            يمكن الدخول عن طريق "أبشر" من خلال بوابة النفاذ الوطني الموحد لكي تستفيد من الخدمات الإلكترونيه المقدمة من المركز السعودي للأعمال
          </p>
          
          <a href="https://sejel.vercel.app/home-new" className="w-full">
            <Button className="w-full bg-[#716da5] hover:bg-[#5a5684] text-white text-[19.2px] font-bold rounded-[7px] mb-[15px] transition-colors shadow-none h-[60px] border-[3px] border-[#716da5] flex items-center justify-center">
              الدخول بواسطة النفاذ الوطني الموحد
            </Button>
          </a>
          
          <div className="w-full flex items-center gap-2 text-[14px] text-[#212529] bg-[#f4f7fe] mt-[15px] h-[60px] px-[1.25rem] border border-[#E1E1E8] rounded-[7px]">
            <div className="flex-shrink-0">
              <img src="/images/info-icon.png" alt="info" className="w-6 h-6" />
            </div>
            <div className="flex-grow text-right">
              <span className="">للمستثمرين الذين لا يحملون هوية أو إقامة سعودية الرجاء </span>
              <a href="#" className="font-bold hover:no-underline text-[#35363A] no-underline bg-transparent cursor-pointer">الضغط هنا </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full p-8 flex justify-center items-center">
        <div className="flex items-center gap-4 flex-row-reverse">
          <span className="text-white text-sm font-medium opacity-90">تطوير الهيئة السعودية للبيانات والذكاء الاصطناعي</span>
          <div className="h-8 w-[1px] bg-white/30 mx-2"></div>
          <a href="https://sdaia.gov.sa" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">
            <img src="/images/sdaia-logo-new.png" alt="SDAIA" className="h-12 object-contain opacity-90" />
          </a>
        </div>
      </footer>
    </div>
  );
}
