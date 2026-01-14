import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Plus, Search, Settings, User } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function HomeNew() {
  const [, setLocation] = useLocation();
  const [loadingService, setLoadingService] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const services = [
    { name: "قيد سجل تجاري", desc: "إصدار سجل تجاري جديد لمؤسسة فردية", icon: "🏢", link: "/service/new-cr" },
    { name: "تجديد سجل تجاري", desc: "تجديد صلاحية السجل التجاري القائم", icon: "🔄", link: "/service/renew-cr" },
    { name: "حجز اسم تجاري", desc: "حجز اسم تجاري جديد قبل إصدار السجل", icon: "abc", link: "/service/reserve-name" },
    { name: "تعديل سجل تجاري", desc: "تعديل بيانات السجل التجاري الحالي", icon: "✏️", link: "/service/edit-cr" },
    { name: "مستخرج سجل تجاري / الإفادة التجارية", desc: "الحصول على مستخرج رسمي لبيانات السجل التجاري", icon: "📄", link: "/service/commercial-extract" },
    { name: "إصدار رخصة تجارية", desc: "إصدار رخصة لمزاولة النشاط التجاري", icon: "📜", link: "/service/issue-license" },
    { name: "تسجيل علامة تجارية", desc: "تسجيل وحماية العلامة التجارية الخاصة بك", icon: "®️", link: "/service/register-trademark" },
    { name: "تجديد رخصة تجارية", desc: "تجديد صلاحية الرخصة التجارية المنتهية", icon: "🔄", link: "/service/renew-license" },
    { name: "إصدار الجواز السعودي", desc: "إصدار جواز السفر السعودي إلكترونياً", icon: "🛂", link: "/service/issue-saudi-passport" },
    { name: "تجديد الجواز السعودي", desc: "تجديد جواز السفر السعودي إلكترونياً", icon: "🛂", link: "/service/renew-passport" },
    { name: "تجديد الهوية الوطنية", desc: "تجديد بطاقة الهوية الوطنية إلكترونياً", icon: "🆔", link: "/service/renew-national-id" },
    { name: "إصدار رخصة قيادة", desc: "إصدار رخصة قيادة جديدة", icon: "🚗", link: "/service/issue-driving-license" },
    { name: "تجديد رخصة القيادة", desc: "تجديد رخصة القيادة الخاصة بك إلكترونياً", icon: "🚗", link: "/service/renew-driving-license" },
    { name: "تجديد رخصة سير", desc: "تجديد رخصة سير المركبة إلكترونياً", icon: "🚙", link: "/service/renew-vehicle-registration" },
  ];

  const filteredServices = services.filter(service => 
    service.name.includes(searchQuery) || service.desc.includes(searchQuery)
  );

  const handleServiceClick = (link: string | undefined, name: string) => {
    if (!link) return;
    setLoadingService(name);
    setTimeout(() => {
      setLocation(link);
      setLoadingService(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans" dir="rtl">
      <Header />
      
      <main className="flex-1 container py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8 border border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#006C35] mb-2">مرحباً بك في بوابة الخدمات</h1>
              <p className="text-gray-600">يمكنك الآن الوصول إلى جميع الخدمات الحكومية وإدارة طلباتك بسهولة.</p>
            </div>

          </div>
        </div>



        {/* Services List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-gray-800">الخدمات المتاحة</h2>
              <span className="bg-[#e6f4ea] text-[#006C35] text-xs font-bold px-3 py-1 rounded-md">الاكثر استخداما</span>
            </div>
            <div className="relative w-64">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="بحث في الخدمات..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-[#006C35]"
              />
            </div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {filteredServices.map((service, i) => (
              <div 
                key={i} 
                onClick={() => handleServiceClick(service.link, service.name)}
                className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#e6f4ea] rounded-lg flex items-center justify-center text-xl relative">
                    {loadingService === service.name ? (
                      <Loader2 className="w-6 h-6 text-[#006C35] animate-spin" />
                    ) : (
                      service.icon
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 group-hover:text-[#006C35] transition-colors">{service.name}</h3>
                    <p className="text-sm text-gray-500">{service.desc}</p>
                  </div>
                </div>
                <Button variant="ghost" className="text-[#006C35] opacity-0 group-hover:opacity-100 transition-opacity" disabled={loadingService === service.name}>
                  {loadingService === service.name ? "جاري التحميل..." : "بدء الخدمة ←"}
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center mt-6 mb-2">
          <img src="/images/pagination.png" alt="Pagination" className="h-8 object-contain" />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
