import { ArrowUp, MessageCircle, Eye, ZoomIn, ZoomOut, Ear } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#004d30] text-white font-sans pt-12 pb-6 relative">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-right">
          
          {/* Column 1: Overview */}
          <div>
            <h3 className="font-bold text-lg mb-6">نظرة عامة</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#" className="hover:underline">عن المملكة العربية السعودية</a></li>
              <li><a href="#" className="hover:underline">عن المنصة الوطنية</a></li>
              <li><a href="#" className="hover:underline">زائر جديد</a></li>
              <li><a href="#" className="hover:underline">الأخبار</a></li>
              <li><a href="#" className="hover:underline">الفعاليات</a></li>
              <li><a href="#" className="hover:underline">الملف الوطني</a></li>
              <li><a href="#" className="hover:underline">تطبيقات الجوال الحكومية</a></li>
              <li><a href="#" className="hover:underline">المشاركة الإلكترونية</a></li>
              <li><a href="#" className="hover:underline">اتفاقية مستوى الخدمة</a></li>
              <li><a href="#" className="hover:underline">ميثاق المستخدمين</a></li>
              <li><a href="#" className="hover:underline">تحديث محتوى المنصة الوطنية</a></li>
            </ul>
          </div>

          {/* Column 2: Important Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">روابط مهمة</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#" className="hover:underline">التقارير والبيانات</a></li>
              <li><a href="#" className="hover:underline">إحصائيات ومؤشرات المنصة</a></li>
              <li><a href="#" className="hover:underline">البيانات المفتوحة</a></li>
              <li><a href="#" className="hover:underline">التنمية المستدامة</a></li>
              <li><a href="#" className="hover:underline">منصات الحكومات الإلكترونية الخليجية</a></li>
              <li><a href="#" className="hover:underline">الخصوصية وحماية البيانات</a></li>
              <li><a href="#" className="hover:underline">الاستراتيجية الوطنية للبيانات والذكاء الاصطناعي</a></li>
              <li><a href="#" className="hover:underline">حق الحصول على المعلومة</a></li>
              <li><a href="#" className="hover:underline">الأمن السيبراني في المملكة</a></li>
              <li><a href="#" className="hover:underline">ميزانية الدولة</a></li>
              <li><a href="#" className="hover:underline">استبيان المشاركة في فعاليات الجهات الحكومية</a></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="font-bold text-lg mb-6">الدعم والمساعدة</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#" className="hover:underline">الدعم والمساعدة</a></li>
              <li><a href="#" className="hover:underline">تواصل معنا</a></li>
              <li><a href="#" className="hover:underline">مركز تفاعل المستفيدين آمر</a></li>
              <li><a href="#" className="hover:underline">بلاغ رقمي</a></li>
              <li><a href="#" className="hover:underline">قنوات تقديم الخدمة</a></li>
              <li><a href="#" className="hover:underline">الإبلاغ عن فساد</a></li>
              <li><a href="#" className="hover:underline">الإبلاغ عن أخبار كاذبة</a></li>
              <li><a href="#" className="hover:underline">الأسئلة الشائعة</a></li>
              <li><a href="#" className="hover:underline">سهولة الوصول</a></li>
              <li><a href="#" className="hover:underline">اشترك معنا</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Tools */}
          <div>
            <h3 className="font-bold text-lg mb-6">تواصل معنا</h3>
            <div className="flex justify-start mb-6 gap-2">
              <a href="#" className="w-10 h-10 bg-[#2d7a58] rounded flex items-center justify-center hover:bg-[#3d8a68]">
                <span className="font-bold text-xl">𝕏</span>
              </a>
            </div>

            <h3 className="font-bold text-lg mb-4">أدوات الاتاحة والوصول</h3>
            <div className="flex justify-end gap-2 mb-8">
              <button className="w-10 h-10 bg-[#2d7a58] rounded flex items-center justify-center hover:bg-[#3d8a68]" title="High Contrast">
                <Eye className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-[#2d7a58] rounded flex items-center justify-center hover:bg-[#3d8a68]" title="Zoom In">
                <ZoomIn className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-[#2d7a58] rounded flex items-center justify-center hover:bg-[#3d8a68]" title="Zoom Out">
                <ZoomOut className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-2 px-3 h-10 bg-[#2d7a58] rounded hover:bg-[#3d8a68]">
                <span className="text-xs font-bold">دعم لغة الاشارة الحية</span>
                <Ear className="w-5 h-5" />
              </button>
            </div>

            <h3 className="font-bold text-lg mb-4">تطبيقاتنا</h3>
            <div className="flex justify-start gap-2">
              <img src="/images/app-store-badges.png" alt="Download on App Store and Google Play" className="h-14 object-contain" />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-[#2d7a58] pt-8 mt-8">
          
          {/* Right: Copyright & Links */}
          <div className="text-right mt-6 md:mt-0 order-1 md:order-1 w-full md:w-auto">
            <div className="flex justify-start gap-4 text-sm font-bold mb-2 underline">
              <a href="#">سياسة الخصوصية</a>
              <a href="#">شروط الاستخدام</a>
              <a href="#">خريطة الموقع</a>
            </div>
            <p className="text-xs mb-1">2026 © جميع الحقوق محفوظة لمنصة GOV.SA (المنصة الحكومية السعودية)</p>
            <p className="text-xs opacity-80">تطوير وتشغيل هيئة الحكومة الرقمية</p>
          </div>

          {/* Left: Logos */}
          <div className="flex items-center justify-end order-2 md:order-2 gap-6 mt-6 md:mt-0">

            <div className="flex items-center h-16">
               <img src="/images/footer-logo.png" alt="SDAIA Logo" className="h-full object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Buttons */}
      <div className="fixed bottom-8 left-8 flex flex-col gap-4 z-50">
        <button className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-[#006C35] hover:bg-gray-50 relative group">
          <MessageCircle className="w-7 h-7" />
          <span className="absolute right-full mr-3 bg-white text-[#006C35] text-xs font-bold px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            آمر
          </span>
          {/* Red dot removed */}
        </button>
        <button className="w-12 h-12 bg-[#2d7a58] rounded-full shadow-lg flex items-center justify-center text-white hover:bg-[#3d8a68]" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <ArrowUp className="w-6 h-6" />
        </button>
      </div>
    </footer>
  );
}
