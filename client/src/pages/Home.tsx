import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServiceHero from "@/components/service/ServiceHero";
import ServiceSteps from "@/components/service/ServiceSteps";
import ServiceInfo from "@/components/service/ServiceInfo";
import { MessageSquare, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRoute } from "wouter";
import CommentModal from "@/components/service/CommentModal";
import FeedbackComponent from "@/components/service/FeedbackComponent";

export default function Home() {
  const [activeTab, setActiveTab] = useState("steps");
  const [match, params] = useRoute("/service/:id?");
  const serviceId = match ? params?.id : null;

  const renderRequirements = () => {
    if (serviceId === 'reserve-name') {
      return (
        <div className="py-4 space-y-4">
          {[
            "ألا يقل العمر عن 18 سنة.",
            "أن يكون مقدم الطلب هو المستفيد من الاسم التجاري، أو مفوضًا عنه.",
            "أن يتكون الاسم من ألفاظ عربية، أو معربة، أو من حروف، أو أرقام عربية، أو من واحد أو أكثر منهما، في حال حجز اسم تجاري باللغة العربية.",
            "أن يتكون الاسم من ألفاظ أو حروف أو أرقام إنجليزية، أو من واحد أو أكثر منها، في حال حجز اسم تجاري باللغة الإنجليزية.",
            "ألا يكون مخالفًا للنظام العام، أو الآداب العامة، أو يؤدي إلى التضليل، أو محظور استعماله.",
            "ألا يشابه اسما تجاريًا محجوزًا أو مقيدًا في السجل التجاري أيًا كان نوع النشاط.",
            "ألا يشابه اسمًا تجاريًا، أو علامة تجارية مشهورة عالميًا، أو يشابه علامة تجارية مسجلة أو مشهورة في المملكة.",
            "ألا يحتوي على معنى أو دلالة أو مضمونًا سياسيًا أو عسكريًا أو دينيًا.",
            "ألا يشابه اسمًا أو شارة شرفية أو رمزًا خاصًا بأي من المنظمات المحلية أو الإقليمية أو الدولية أو إحدى مؤسساتها.",
            "ألا يحتوي على اسم محظور حسب قائمة الأسماء المحظورة، وللاطلاع على الأسماء المحظورة اضغط هنا ​",
            "ألا يحتوي على اسم حكومي أو جهة حكومية أو شبه حكومية.",
            "الالتزام بضوابط حجز أو قيد اسم (السعودية)، أو أسماء المدن والمناطق والأماكن العامة، وفق الضوابط الواردة في نظام الأسماء التجارية ولائحته التنفيذية."
          ].map((req, index) => (
            <div key={index} className="flex items-start gap-2 text-gray-800">
              <CheckCircle2 className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-base font-medium leading-relaxed">{req}</span>
            </div>
          ))}
        </div>
      );
    }

    if (serviceId === 'commercial-extract') {
      return (
        <div className="py-4 space-y-4">
          {[
            "التحقق من الآتي في حال طلب إفادة تجارية: أن يكون مقدم الطلب له صفة في السجل التجاري. ألا يكون هناك سجلًا تجاريًا في حال طلب إفادة بعدم وجود سجل.",
            "ملاحظة: يمكن للمستفيد طلب مستخرج سجل تجاري، وإن لم تكن له صفة في السجل."
          ].map((req, index) => (
            <div key={index} className="flex items-start gap-2 text-gray-800">
              <CheckCircle2 className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-base font-medium leading-relaxed">{req}</span>
            </div>
          ))}
        </div>
      );
    }

    if (serviceId === 'issue-license') {
      return (
        <div className="py-4 space-y-4">
          <div className="flex items-start gap-2 text-gray-800">
            <CheckCircle2 className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" strokeWidth={1.5} />
            <div className="flex flex-col gap-1">
              <span className="text-base font-bold leading-relaxed">الاشتراطات والموافقات الحكومية</span>
              <span className="text-base font-medium leading-relaxed">تختلف قائمة الاشتراطات والموافقات الحكومية المطلوبة بحسب نوع النشاط ويمكن الاطلاع عليها من خلال خدمة الاستعلام عن اشتراطات الأنشطة البلدية من خلال الرابط.</span>
            </div>
          </div>
          <div className="flex items-start gap-2 text-gray-800">
            <CheckCircle2 className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" strokeWidth={1.5} />
            <div className="flex flex-col gap-1">
              <span className="text-base font-bold leading-relaxed">ملاحظات/تنبيهات</span>
              <span className="text-base font-medium leading-relaxed">يرجى الالتزام بتجديد الرخصة قبل انتهاءها أو إلغاءها في حالة عدم الرغبة في تجديدها وذلك لتجنب رسوم غرامة المشترطة على التأخير في التجديد.</span>
              <span className="text-base font-medium leading-relaxed">يمكن الاطلاع على حاسبة الرسوم المعلوماتية من خلال الرابط.</span>
            </div>
          </div>
        </div>
      );
    }

    if (serviceId === 'renew-license') {
      return (
        <div className="py-4 space-y-4">
          <div className="flex items-start gap-2 text-gray-800">
            <CheckCircle2 className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" strokeWidth={1.5} />
            <span className="text-base font-medium leading-relaxed">رخصة تجارية سارية تنتهي خلال 3 أشهر أو رخصة منتهية لمدة أقصاها سنة واحدة.</span>
          </div>
        </div>
      );
    }

    if (serviceId === 'register-trademark') {
      return (
        <div className="py-4 space-y-4">
          {[
            "الدخول على موقع الهيئة واختيار الخدمات والضغط على خدمة العلامات التجارية.",
            "الدخول إلى بوابة العلامات التجارية.",
            "الانتقال إلى منصة الخدمة من خلال النفاذ الوطني الموحد / البريد الإلكتروني.",
            "طلب تسجيل علامة جديدة (كمالك أو كصاحب شأن أو كمالك للمؤسسة أو كشركة).",
            "تعبئة البيانات.",
            "يتم إصدار فاتورة لدراسة العلامة، وفي حال سدادها يتم استقبال الطلب ودراسته.",
            "بعد الدراسة يتم اتخاذ أحد القرارات التالية: القبول بشرط التعديل (مهلة التعديل 90 يوما)، وفي حال لم يقم مقدم الطلب بالتعديل المطلوب خلال 90 يوما يتحول الطلب إلى متنازل عنه. - الرفض مع إمكانية التعديل (مهلة التعديل 10 أيام). - الرفض النهائي في إحدى الحالتين: إذا لم يتم التعديل خلال المهلة المحددة (10 أيام) أو إذا تم التعديل من قبل العميل ولم يستوفِ الشروط النظامية المطلوبة.",
            "في حال قبول العلامة التجارية يتم إصدار فاتورة النشر ومن ثم الانتقال إلى مرحلة النشر بعد سداد الرسوم المستحقة من قبل مقدم الطلب.",
            "النشر (مدة النشر 60 يومًا).",
            "بعد انتهاء مرحلة النشر دون أي اعتراض مقدم يتعين على العميل سداد الفاتورة النهائية خلال 30 يوما من إصدارها، ومن ثم طباعة الشهادة عن طريق النظام."
          ].map((req, index) => (
            <div key={index} className="flex items-start gap-2 text-gray-800">
              <CheckCircle2 className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-base font-medium leading-relaxed">{req}</span>
            </div>
          ))}
        </div>
      );
    }

    if (serviceId === 'issue-saudi-passport') {
      return (
        <div className="py-4 space-y-4">
          {[
            "إذا كان عمر المستفيد أقل من 21 سنة، يتم إصدار الجواز لمدة 5 سنوات فقط",
            "إذا كان عمر المستفيد 21 سنة أو أكثر، يمكنه اختيار صلاحية الجواز (5 أو 10 سنوات)",
            "أن تكون هوية المواطن/المواطنة سارية المفعول",
            "توفر بصمة وصورة في أنظمة وزارة الداخلية",
            "سيتم اعتماد الصورة المسجلة في الأنظمة في الجواز الصادر",
            "أن يكون المستفيد متواجدًا داخل المملكة العربية السعودية عند تقديم الطلب",
            "ألا يكون لدى المستفيد جواز سفر سارٍ آخر أو مرافقًا في جواز سفر شخص آخر",
            "أن يكون المستفيد على قيد الحياة عند تقديم الطلب"
          ].map((req, index) => (
            <div key={index} className="flex items-start gap-2 text-gray-800">
              <CheckCircle2 className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-base font-medium leading-relaxed">{req}</span>
            </div>
          ))}
        </div>
      );
    }

    if (serviceId === 'renew-passport') {
      return (
        <div className="py-4 space-y-4">
          {[
            "سداد رسوم تجديد الجواز بما يتوافق مع مدة الصلاحية المختارة.",
            "سداد جميع المخالفات المرورية.",
            "صلاحية هوية المواطن/ المواطنة.",
            "يمكن تجديد الجواز لمدة 5 سنوات فقط في حال كان المستفيد في عمر أقل من 21 عام.",
            "إذا كان عمر المستفيد 21 سنة أو أكثر، يمكن اختيار مدة صلاحية الجواز لتكون 5 أو 10 سنوات.",
            "توفر بصمة وصورة للمواطن/ المواطنة في أنظمة وزارة الداخلية.",
            "تواجد المستفيد داخل المملكة العربية السعودية.",
            "أن يكون لدى المستفيد جواز سفر.",
            "أن يكون المستفيد على قيد الحياة.",
            "يجب الا يكون الجواز الحالي مفقودا أو تالفا.",
            "الصورة المسجلة في أنظمة وزارة الداخلية هي التي سيتم اعتمادها في الجواز المصدر."
          ].map((req, index) => (
            <div key={index} className="flex items-start gap-2 text-gray-800">
              <CheckCircle2 className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-base font-medium leading-relaxed">{req}</span>
            </div>
          ))}
        </div>
      );
    }

    if (serviceId === 'issue-driving-license') {
      return (
        <div className="py-4 space-y-4">
          {[
            "ألّا يقل عمر المتقدم عن 18 عامًا.",
            "التأكد من حجز موعد في أحد مدارس تعليم القيادة.",
            "وجود فحص طبي من أحد المراكز الطبية المعتمدة."
          ].map((req, index) => (
            <div key={index} className="flex items-start gap-2 text-gray-800">
              <CheckCircle2 className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-base font-medium leading-relaxed">{req}</span>
            </div>
          ))}
        </div>
      );
    }

    if (serviceId === 'renew-driving-license') {
      return (
        <div className="py-4 space-y-4">
          {[
            "تشمل هذه الخدمة تجديد رخصة القيادة من نوع خصوصي، والدراجات الآلية فقط.",
            "سداد رسوم تجديد الرخصة من خلال المدفوعات الحكومية عبر البنوك.",
            "سداد المخالفات المرورية؛ -إن وجدت-.",
            "أن تكون المدة المتبقية من صلاحية رخصة القيادة أقل من 365 يومًا.",
            "وجود فحص طبي من أحد المراكز الطبية المعتمدة."
          ].map((req, index) => (
            <div key={index} className="flex items-start gap-2 text-gray-800">
              <CheckCircle2 className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-base font-medium leading-relaxed">{req}</span>
            </div>
          ))}
        </div>
      );
    }

    if (serviceId === 'renew-vehicle-registration') {
      return (
        <div className="py-4 space-y-4">
          {[
            "وثيقة تأمين سارية على المركبة.",
            "شهادة الفحص الفني سارية المفعول.",
            "سداد رسوم التجديد ومخالفة التأخير إن وجدت.",
            "سداد المخالفات المرورية إن وجدت.",
            "ألا تقل صلاحية رخصة سير المركبة عن 180 يومًا."
          ].map((req, index) => (
            <div key={index} className="flex items-start gap-2 text-gray-800">
              <CheckCircle2 className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-base font-medium leading-relaxed">{req}</span>
            </div>
          ))}
        </div>
      );
    }

    if (serviceId === 'renew-national-id') {
      return (
        <div className="py-4 space-y-4">
          {[
            "لايمكن للمستفيد إجراء طلب في ظل وجود طلب قائم.",
            "تتاح هذه الخدمة عندما يتبقى على انتهاء الهوية الوطنية 180 يوما أو أقل.",
            "وجود عنوان مسجل للمستفيد"
          ].map((req, index) => (
            <div key={index} className="flex items-start gap-2 text-gray-800">
              <CheckCircle2 className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-base font-medium leading-relaxed">{req}</span>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="py-4 space-y-4">
        <div className="flex items-center gap-2 text-gray-800">
          <CheckCircle2 className="w-5 h-5 text-gray-800" strokeWidth={1.5} />
          <span className="text-base font-medium">ألا يقل العمر عن 18 سنة.</span>
        </div>
        <div className="flex items-center gap-2 text-gray-800">
          <CheckCircle2 className="w-5 h-5 text-gray-800" strokeWidth={1.5} />
          <span className="text-base font-medium">ألا يكون موظفًا حكوميًا.</span>
        </div>
        {serviceId !== 'renew-cr' && (
          <div className="flex items-center gap-2 text-gray-800">
            <CheckCircle2 className="w-5 h-5 text-gray-800" strokeWidth={1.5} />
            <span className="text-base font-medium">ألا يكون المالك ممتلكًا سجلًا تجاريًا نشطًا لمؤسسة فردية.</span>
          </div>
        )}
      </div>
    );
  };

  const renderDocuments = () => {
    if (serviceId === 'reserve-name') {
      return (
        <div className="py-4 space-y-4">
          {[
            "التقيد بالأحكام الواردة في اللائحة التنفيذية المتعلقة بحجز الأسماء العائلية بصفة الأسماء التجارية.",
            "تقديم خطاب من الجهة بطلب الخدمة، في حال كان المستفيد جهة حكومية أو جهة تابعة لها.",
            "تقديم ترخيص الجمعية أو شهادة الوقف عند طلب حجز اسم تجاري لجمعية أو وقف.",
            "تقديم شهادة ملكية العلامة التجارية عند التقدم بطلب حجز اسم تجاري بناء على علامة تجارية.",
            "ملاحظة: لن تتم عملية حجز اسم علامة تجارية في حال وجود أسماء مشابهة أو مطابقة مسجلة."
          ].map((doc, index) => (
            <div key={index} className="flex items-start gap-2 text-gray-800">
              <CheckCircle2 className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-base font-medium leading-relaxed">{doc}</span>
            </div>
          ))}
        </div>
      );
    }

    if (serviceId === 'commercial-extract') {
      return (
        <div className="py-4 space-y-4">
          <div className="flex items-start gap-2 text-gray-800">
            <CheckCircle2 className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" strokeWidth={1.5} />
            <span className="text-base font-medium leading-relaxed">حسب نوع الإفادة</span>
          </div>
        </div>
      );
    }

    if (serviceId === 'issue-license') {
      return (
        <div className="py-4 space-y-4">
          {[
            "صورة خارجية للمحل ويتم إبراز لوحة المحل.",
            "عقد الإيجار أو صك الملكية أو عقد الاستثمار للموقع من البلدية أو الجهات الحكومية الأخرى.",
            "عقد النظافة (اختياري حسب التعاقد ونوع النشاط).",
            "فاتورة أدوات السلامة أو تقرير سلامة من الدفاع المدني للأنشطة الفورية.",
            "صورة من رخصة البناء."
          ].map((doc, index) => (
            <div key={index} className="flex items-start gap-2 text-gray-800">
              <CheckCircle2 className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-base font-medium leading-relaxed">{doc}</span>
            </div>
          ))}
        </div>
      );
    }

    if (serviceId === 'renew-license') {
      return (
        <div className="py-4 space-y-4">
          {[
            "عقد الإيجار، أو صك الملكية، أو عقد الاستثمار للموقع من البلدية أو الجهات الحكومية الأخرى.",
            "عقد تنظيف (اختياري، يعتمد على العقد ونوع النشاط).",
            "رخصة تجارية سارية تنتهي خلال 3 أشهر أو رخصة منتهية لمدة أقصاها سنة واحدة."
          ].map((doc, index) => (
            <div key={index} className="flex items-start gap-2 text-gray-800">
              <CheckCircle2 className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-base font-medium leading-relaxed">{doc}</span>
            </div>
          ))}
        </div>
      );
    }

    if (serviceId === 'register-trademark') {
      return (
        <div className="py-4 space-y-4">
          {[
            "صورة العلامة التجارية",
            "إرفاق ترجمة العلامة مع بيان كيفية نطقها للعبارات الأجنبية من مكتب مترجم معتمد",
            "إرفاق معنى الكلمة العربية في حال كانت الكلمة غير مفهومة للعامة",
            "إرفاق شهادة اثبات تطابق مالك النطاق (.com) في حال الصورة تحتوي على اسم نطاق.",
            "ارفاق الوثائق الثبوتية لصحة التاريخ المذكور في حال احتواء صورة العلامة لتاريخ ميلادي او هجري",
            "في حال كانت العلامة مقدمة مسبقاً خلال ستة أشهر في دولة أخرى يتم ارفاق شهادة ايداع شهادة تبين تاريخ الايداع صادرة من الجهة المودع فيها الطلب مع صورة من الطلب السابق وترجمة إلى اللغة العربية وذلك خلال ستة أشهر من تاريخ تقديم طلب التسجيل",
            "إرفاق ما يثبت استحقاق الدرجة العلمية المشار إليها في صورة العلامة التجارية المُراد تسجيلها.",
            "موافقة صاحب الاسم/الصورة/اللقب/الشعار الظاهر/ة في صورة العلامة التجارية المُراد تسجيلها.",
            "ارفاق الأوراق الثبوتية في حال كان الاسم عائلي (السجل التجاري – الهوية الوطنية)",
            "ارفاق شهادة تسجيل العلامة في حال كانت العلامة منتهية وتجاوزت مهلة التجديد ويرغب المالك تسجيلها على سجل تجاري مختلف او معدل."
          ].map((doc, index) => (
            <div key={index} className="flex items-start gap-2 text-gray-800">
              <CheckCircle2 className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-base font-medium leading-relaxed">{doc}</span>
            </div>
          ))}
        </div>
      );
    }

    if (serviceId === 'renew-passport') {
      return (
        <div className="py-4 space-y-4">
          {[
            "سداد الرسوم الحكومية لإصدار الجواز بما يتوافق مع مدة الصلاحية",
            "أن يكون لدى المستخدم جواز مر على تاريخ إصداره 6 أشهر",
            "سداد جميع المخالفات المرورية المسجلة على صاحب الجواز إن وجدت",
            "وجود هوية وطنية للمستفيد",
            "تواجد المواطن داخل المملكة العربية السعودية",
            "أن يكون المواطن على قيد الحياة",
            "يجب ألا يكون الجواز الحالي مفقود أو تالف",
            "أن يكون عمر المواطن 21 سنة أو أكبر أو أصغر ومتزوج",
            "يمكن تجديد الجواز لمدة 5 سنوات فقط في حال كان صاحب الجواز أقل من 21 عاما",
            "تفعيل الجواز الجديد مع ضرورة إحضار الجواز السابق"
          ].map((doc, index) => (
            <div key={index} className="flex items-start gap-2 text-gray-800">
              <CheckCircle2 className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-base font-medium leading-relaxed">{doc}</span>
            </div>
          ))}
        </div>
      );
    }

    if (serviceId === 'issue-driving-license') {
      return (
        <div className="py-4 space-y-4">
          {[
            "سداد رسوم إصدار الرخصة عبر المدفوعات الحكومية من خلال البنوك."
          ].map((doc, index) => (
            <div key={index} className="flex items-start gap-2 text-gray-800">
              <CheckCircle2 className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-base font-medium leading-relaxed">{doc}</span>
            </div>
          ))}
        </div>
      );
    }

    if (serviceId === 'renew-driving-license') {
      return (
        <div className="py-4 space-y-4">
          {[
            "سداد المخالفات المرورية؛ -إن وجدت-.",
            "سداد رسوم تجديد الرخصة من خلال المدفوعات الحكومية عبر البنوك.",
            "وجود فحص طبي من أحد المراكز الطبية المعتمدة."
          ].map((doc, index) => (
            <div key={index} className="flex items-start gap-2 text-gray-800">
              <CheckCircle2 className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-base font-medium leading-relaxed">{doc}</span>
            </div>
          ))}
        </div>
      );
    }

    if (serviceId === 'renew-vehicle-registration') {
      return (
        <div className="py-4 space-y-4">
          {[
            "وجود رخصة سير سابقة."
          ].map((doc, index) => (
            <div key={index} className="flex items-start gap-2 text-gray-800">
              <CheckCircle2 className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-base font-medium leading-relaxed">{doc}</span>
            </div>
          ))}
        </div>
      );
    }

    if (serviceId === 'renew-national-id') {
      return (
        <div className="py-4 space-y-4">
          <div className="flex items-start gap-2 text-gray-800">
            <CheckCircle2 className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" strokeWidth={1.5} />
            <span className="text-base font-medium leading-relaxed">عدم وجود غرامات غير مسددة على المستفيد لقطاع الأحوال المدنية.</span>
          </div>
          <div className="flex items-start gap-2 text-gray-800">
            <CheckCircle2 className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" strokeWidth={1.5} />
            <div className="flex flex-col gap-1">
              <span className="text-base font-medium leading-relaxed">صورة شخصية حديثة مطابقة لاشتراطات الأحوال المدنية، وفقًا للمعايير التالية:</span>
              <ul className="list-disc list-inside mr-4 space-y-1 text-gray-700">
                <li>الصيغة: JPEG 2000</li>
                <li>الحجم: لا يتجاوز 1MB</li>
                <li>الأبعاد: من مضاعفات 4×6</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    if (serviceId === 'issue-saudi-passport') {
      return (
        <div className="py-4 space-y-4">
          {[
            "وجود عنوان وطني محدث على منصة أبشر",
            "سداد جميع المخالفات المرورية المسجلة على المستفيد",
            "سداد رسوم إصدار الجواز بما يتناسب مع مدة الصلاحية المختارة",
            "يجب على المستخدم الاطلاع والإقرار على بيانات"
          ].map((doc, index) => (
            <div key={index} className="flex items-start gap-2 text-gray-800">
              <CheckCircle2 className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-base font-medium leading-relaxed">{doc}</span>
            </div>
          ))}
        </div>
      );
    }

    return (
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
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans" dir="rtl">
      <Header />
      
      <main className="flex-1">
        <ServiceHero serviceId={serviceId} />
        
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
              
              {activeTab === "requirements" && renderRequirements()}

              {activeTab === "documents" && renderDocuments()}
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
