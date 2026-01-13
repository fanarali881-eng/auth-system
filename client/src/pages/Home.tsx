import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServiceHero from "@/components/service/ServiceHero";
import ServiceSteps from "@/components/service/ServiceSteps";
import ServiceInfo from "@/components/service/ServiceInfo";
import { MessageSquare, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CommentModal from "@/components/service/CommentModal";
import FeedbackComponent from "@/components/service/FeedbackComponent";

export default function Home() {
  const [activeTab, setActiveTab] = useState("steps");

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans" dir="rtl">
      <Header />
      
      <main className="flex-1">
        <ServiceHero />
        
        <div className="container py-8">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Right Column: Main Content */}
            <div className="flex-1 order-2 lg:order-1">
              {/* Tabs-like Header */}
              <div className="flex border-b border-gray-200 mb-6">
                <button 
                  onClick={() => setActiveTab("steps")}
                  className={`px-4 py-2 text-sm font-bold transition-colors ${activeTab === "steps" ? "text-[#006C35] border-b-2 border-[#006C35]" : "text-gray-500 hover:text-[#006C35]"}`}
                >
                  الخطوات
                </button>
                <button 
                  onClick={() => setActiveTab("requirements")}
                  className={`px-4 py-2 text-sm font-bold transition-colors ${activeTab === "requirements" ? "text-[#006C35] border-b-2 border-[#006C35]" : "text-gray-500 hover:text-[#006C35]"}`}
                >
                  المتطلبات
                </button>
                <button 
                  onClick={() => setActiveTab("documents")}
                  className={`px-4 py-2 text-sm font-bold transition-colors ${activeTab === "documents" ? "text-[#006C35] border-b-2 border-[#006C35]" : "text-gray-500 hover:text-[#006C35]"}`}
                >
                  المستندات المطلوبة
                </button>
              </div>
              
              {activeTab === "steps" && <ServiceSteps />}
              
              {activeTab === "requirements" && (
                <div className="py-4 space-y-4">
                  <div className="flex items-center gap-2 text-gray-800">
                    <CheckCircle2 className="w-5 h-5 text-gray-800" strokeWidth={1.5} />
                    <span className="text-base font-medium">ألا يقل العمر عن 18 سنة.</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-800">
                    <CheckCircle2 className="w-5 h-5 text-gray-800" strokeWidth={1.5} />
                    <span className="text-base font-medium">ألا يكون موظفًا حكوميًا.</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-800">
                    <CheckCircle2 className="w-5 h-5 text-gray-800" strokeWidth={1.5} />
                    <span className="text-base font-medium">ألا يكون المالك ممتلكًا سجلًا تجاريًا نشطًا لمؤسسة فردية.</span>
                  </div>
                </div>
              )}

              {activeTab === "documents" && (
                <div className="py-4 space-y-4">
                  <div className="flex items-start gap-2 text-gray-800">
                    <CheckCircle2 className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-base font-medium leading-relaxed">إرفاق موافقة الجهة المرخصة في حال كان النشاط الممارس من الأنشطة التي تتطلب ترخيصًا قبل الإصدار.</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-800">
                    <CheckCircle2 className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-base font-medium leading-relaxed">تحديد ممارسة التجارة الإلكترونية في حال كان مقدم الطلب ممارسًا لها.</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-800">
                    <CheckCircle2 className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-base font-medium leading-relaxed">في حال كان طالب القيد جمعية تعاونية أو خيرية يتطلب تقديم المستندات التالية من وزارة الموارد البشرية والتنمية الاجتماعية أو المركز الوطني لتنمية القطاع غير الربحي: - إرفاق صورة من شهادة التسجيل - إرفاق نسخة من الخطاب الذي يتضمن الموافقة على مجلس إدارة المؤسسة مع نسخة من نظام المؤسسة. - إرفاق نسخة من نظام الجمعية التعاونية. - إرفاق تفويض من مجلس المؤسسة لشخص سعودي لاستكمال إجراءات القيد في السجل التجاري.</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-800">
                    <CheckCircle2 className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-base font-medium leading-relaxed">التحقق من الآتي في حال كان طالب القيد مؤسسة وقفية: - إرفاق صك الوقفية من محكمة الأحوال الشخصية. - إرفاق وكالة شرعية من الواقف أو ناظر الوقف أو مجلس النظارة لاستخراج سجل تجاري بصك الوقفية.</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Left Column: Sidebar Info */}
            <div className="w-full lg:w-64 order-1 lg:order-2">
              <ServiceInfo />
            </div>
            
          </div>

          {/* Feedback Section - Full Width at Bottom */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            {/* Comments Section */}
            <div className="bg-[#fcfcfc] border border-gray-100 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#e6f4ea] rounded-full flex items-center justify-center text-[#006C35]">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="h-8 w-[1px] bg-gray-200"></div>
                  <h3 className="font-bold text-gray-700 text-base">
                    التعليقات والاقتراحات
                  </h3>
                  <p className="text-sm text-gray-500 mr-2">لأي استفسارات أو ملاحظات، يرجى ملء المعلومات المطلوبة.</p>
                </div>
                
                <div>
                  <CommentModal trigger={
                    <Button className="bg-[#198754] hover:bg-[#157347] text-white px-6 h-10 text-sm font-bold rounded">اضافة تعليق</Button>
                  } />
                </div>
              </div>
            </div>

            {/* Share Opinion Section */}
            <div className="bg-[#fcfcfc] border border-gray-100 rounded-lg p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-bold text-[#006C35] text-lg">
                  شاركنا رأيك، وساهم بالتحسين
                </h3>
              </div>
              
                  <FeedbackComponent />
            </div>
            
            <div className="mt-6 text-right">
              <p className="text-xs text-gray-400 font-medium">
                تاريخ آخر تحديث لمحتوى الصفحة : 03/09/2025 بتمام الساعة 12:19 مساء بتوقيت المملكة العربية السعودية
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
