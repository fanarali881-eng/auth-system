import { Search, Globe, User, ChevronDown, Eye, ZoomIn, ZoomOut, Calendar, AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function Header() {
  return (
    <header className="w-full bg-white font-sans">
      {/* Top Bar - Gray Background */}
      <div className="bg-[#f5f5f5] border-b border-gray-200 py-2">
        <div className="container flex justify-between items-center h-8">
          {/* Right Side: Gov Info */}
          <div className="flex items-center gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/800px-Flag_of_Saudi_Arabia.svg.png" alt="Saudi Flag" className="w-6 h-4 object-cover border border-gray-200" />
            <span className="text-[10px] md:text-xs text-gray-800 font-medium">موقع حكومي رسمي تابع لحكومة المملكة العربية السعودية</span>
            <button className="flex items-center gap-1 text-[10px] md:text-xs text-[#006C35] font-medium hover:underline">
              كيف تتحقق
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          
          {/* Left Side: Date & Tools */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs text-gray-600">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">الاثنين، 12 يناير 2026</span>
            </div>
            
            <div className="hidden md:flex items-center gap-3 text-[#006C35] border-l border-gray-300 pl-4 ml-2 h-4">
              <button title="Zoom In"><ZoomIn className="w-4 h-4" /></button>
              <button title="Zoom Out"><ZoomOut className="w-4 h-4" /></button>
              <button title="High Contrast"><Eye className="w-4 h-4" /></button>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-full px-3 py-1 flex items-center gap-2 shadow-sm">
              <AlertCircle className="w-3 h-3 text-gray-800" />
              <span className="text-[10px] font-bold text-gray-800">نسخة تجريبية</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar - White Background */}
      <div className="container py-5">
        <div className="flex justify-between items-center">
          
          {/* Right: Logo & Nav */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <img 
                src="/images/gov_sa_logo.png" 
                alt="GOV.SA Logo" 
                className="h-12 object-contain"
              />
            </Link>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">
              <button className="flex items-center gap-1 hover:text-[#006C35]">
                عن المملكة
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>
              <button className="flex items-center gap-1 hover:text-[#006C35]">
                الجهات
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>
              <button className="flex items-center gap-1 hover:text-[#006C35]">
                الخدمات
              </button>
              <button className="flex items-center gap-1 hover:text-[#006C35]">
                المشاركة
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>
              <button className="flex items-center gap-1 hover:text-[#006C35]">
                نهتم بكم
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>
              <button className="flex items-center gap-1 hover:text-[#006C35]">
                عن المنصة
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>
            </nav>
          </div>

          {/* Left: Actions & Vision Logo */}
          <div className="flex items-center gap-6">
            <button className="hidden lg:flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-[#006C35]">
              <Search className="w-5 h-5" />
              البحث
            </button>
            
            <button className="hidden lg:flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-[#006C35]">
              <Globe className="w-5 h-5" />
              English
            </button>
            
            <button className="hidden lg:flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-[#006C35]">
              <User className="w-5 h-5" />
              تسجيل الدخول
            </button>

            <div className="w-[1px] h-8 bg-gray-200 mx-2 hidden lg:block"></div>

            {/* Vision 2030 Logo */}
            <div className="hidden lg:block">
              <img 
                src="/images/vision_2030_logo.png" 
                alt="Saudi Vision 2030" 
                className="h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb Bar - Green Background */}
      <div className="bg-[#006C35] py-5">
        <div className="container flex items-center gap-2 text-sm text-white font-medium">
          <Link href="/" className="hover:opacity-80">الرئيسية</Link>
          <span className="opacity-60">&gt;</span>
          <span>الخدمات</span>
        </div>
      </div>
    </header>
  );
}
