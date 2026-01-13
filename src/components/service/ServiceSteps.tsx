const steps = [
  {
    title: "الدخول على المنصة:",
    description: "عبر النفاذ الوطني الموحد من خلال منصة المركز السعودي للأعمال."
  },
  {
    title: "اختيار الخدمة:",
    description: 'من "الخدمات الإلكترونية" > " قيد سجل تجاري" > تحديد نوع السجل "مؤسسة"، ثم البدء بالخدمة.'
  },
  {
    title: "تعبئة بيانات المؤسسة:",
    description: "مراجعة الشروط والموافقة عليها. - تعبئة بيانات المالك وبيانات الاتصال. - إدخال عنوان الأعمال المعتمد."
  },
  {
    title: "إضافة البيانات المطلوبة:",
    description: "إختيار الأنشطة التجارية. - إدخال بيانات التجارة الإلكترونية (إن وُجدت). - تحديد رأس المال. - اختيار نوع الإسم التجاري وتكوينه."
  },
  {
    title: "استكمال بيانات السجل التجاري:",
    description: "إدخال عنوان المؤسسة وبيانات الاتصال. - تعيين مدير المؤسسة وإدخال بياناته."
  },
  {
    title: "مراجعة وتقديم الطلب:",
    description: "استعراض ملخص الطلب. - الموافقة على الإقرار وتقديم الطلب."
  },
  {
    title: "موافقة الأطراف:",
    description: "في حال تطلب الأمر، تتم الموافقة من مالك السجل أو المدراء الآخرين."
  },
  {
    title: "الدفع:",
    description: "إصدار الفاتورة، ودفع الرسوم عبر خدمة سداد أو البطاقة. - بعد الدفع، يتم إصدار السجل التجاري رسميًا."
  },
  {
    title: "التسجيل التلقائي في الجهات ذات العلاقة:",
    description: "بعد إصدار السجل، يتم التسجيل تلقائيًا في: وزارة الموارد البشرية - هيئة الزكاة والضريبة والجمارك - المؤسسة العامة للتأمينات الاجتماعية - البريد السعودي (العنوان الوطني) - الغرفة التجارية."
  }
];

export default function ServiceSteps() {
  return (
    <div className="py-4">
      {/* YouTube Video Section */}
      <div className="mb-8 rounded-lg overflow-hidden shadow-sm border border-gray-200">
        <div className="relative pb-[56.25%] h-0 bg-black">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/uMDpYAV1oFA"
            title="شرح خدمة قيد سجل تجاري لمؤسسة فردية"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <ul className="space-y-3 list-none p-0 m-0">
        {steps.map((step, index) => (
          <li key={index} className="flex items-start gap-2 text-sm leading-relaxed text-gray-700">
            <span className="text-[#006C35] mt-1">•</span>
            <span>
              <strong className="text-[#006C35] font-bold ml-1">{step.title}</strong>
              {step.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
