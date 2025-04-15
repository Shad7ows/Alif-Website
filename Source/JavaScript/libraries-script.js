let data = [
  {
    الاسم: "التاريخ الهجري",
    اسم_المستودع: "التاريخ_الهجري",
    الاصدار: "0.1.0",
    الصورة:
      "https://tabayu.com/up_image/1aef83649e7e22d2faf8084ab78cadcb240609040314_image.png",
    الوصف: "اضافة تحول التاريخ الميلادي الي هجري",
    المطور: "سكيبر",
    حساب_المطور: "https://github.com/skepr/hijredate/",
  },
  {
    الاسم: "تحويل العملات",
    اسم_المستودع: "محول_العملات",
    الاصدار: "0.1.0",
    الصورة:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjvrqJLqf71YT4zYej2GNcjgbLjd1O4ow-RA&s",
    الوصف: "تحويل العملات اونلاين باستخدام API",
    المطور: "كودرز",
    حساب_المطور: "coders",
  },
  {
    الاسم: "مكتبة قرآنية",
    اسم_المستودع: "القرآن_الكريم",
    الاصدار: "0.1.0",
    الصورة:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsCY583n2uKVMT4Gj6PEefSl1yblXsQL3OIw&s",
    الوصف: "قراءة واستعراض سور وآيات القرآن الكريم",
    المطور: "نور الإسلام",
    حساب_المطور: "noor-islamr",
  },
  {
    الاسم: "قراءة الباركود",
    اسم_المستودع: "قارئ_باركود",
    الاصدار: "0.1.0",
    الصورة:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdS9gaWrcCwYiLmhwalZPj8yTvqUApwZ_6Bw&s",
    الوصف: "مسح وقراءة الباركود باستخدام الكاميرا",
    المطور: "علي حمدي",
    حساب_المطور: "alihamdy",
  },
  {
    الاسم: "مكتبة تحديد الموقع",
    اسم_المستودع: "تحديد_الموقع",
    الاصدار: "0.1.0",
    الصورة:
      "https://img.freepik.com/premium-vector/gps-navigation-design_24877-38755.jpg",
    الوصف: "الحصول على احداثيات الموقع GPS",
    المطور: "أحمد تقي",
    حساب_المطور: "ahmedtaqi",
  },
  {
    الاسم: "تحويل نص لصوت",
    اسم_المستودع: "نص_الى_صوت",
    الاصدار: "0.1.0",
    الصورة:
      "https://images.squarespace-cdn.com/content/v1/584ee3cc2994cac9e545aadd/1614723936610-2YKDTL8LYQ5H2HT147LG/image2.png",
    الوصف: "قراءة النصوص صوتيًا بعدة لغات",
    المطور: "م.يوسف",
    حساب_المطور: "eng-youssef",
  },
  {
    الاسم: "مكتبة استيراد ملفات",
    اسم_المستودع: "مستعرض_ملفات",
    الاصدار: "0.1.0",
    الصورة:
      "https://learnsql.com/blog/how-to-import-csv-to-postgresql/how-to-import-csv-to-postgresql.png",
    الوصف: "اختيار واستعراض الملفات من الجهاز",
    المطور: "فريق المطورArabia",
    حساب_المطور: "dev_arabia",
  },
  {
    الاسم: "مكتبة التخزين المحلي",
    اسم_المستودع: "تخزين_محلي",
    الاصدار: "0.1.0",
    الصورة:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt_GjWpWmqWQ6WPdPdr6ABx9JkcCodqZJE5A&s",
    الوصف: "حفظ البيانات على الجهاز باستخدام shared_preferences",
    المطور: "عمر فوزي",
    حساب_المطور: "omar-fawzy",
  },
  {
    الاسم: "مكتبة التنبيهات",
    اسم_المستودع: "تنبيهات_محلية",
    الاصدار: "0.1.0",
    الصورة:
      "https://bs-uploads.toptal.io/blackfish-uploads/components/blog_post_page/5834437/cover_image/regular_1708x683/Untitled-2b3a5d6414ec7f1635c0e730f62bc92b.png",
    الوصف: "ارسال تنبيهات محلية للمستخدم",
    المطور: "فريق برمجيات العرب",
    حساب_المطور: "arabsoft",
  },
];

const libraryDiv = document.getElementById("libCards");
const searchInput = document.getElementById("searchLib");

function getLibraries(data) {
  libraries = data;
  libraryDiv.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const lib = data[i];
    libraryDiv.innerHTML += `
      <button onclick="openData(${i})" class="card">
        <img src="${lib.الصورة}" alt="مكتبة لغة البرمجة العربية الف ${lib.الوصف}">
        <h4 class="title">${lib.الاسم}</h4>
        <p class="الوصف">${lib.الوصف}</p>
        <h5>${lib.المطور} @</h5>
      </button>
    `;
    console.log(i);
  }
}

function openData(index) {
  openWindow("200px");
  const lib = libraries[index];
  document.querySelector("#window .content").innerHTML = `
    <h1>مكتبة ${lib.الاسم}</h1>
    <h3>
        تحمل المكتبة:
        <button onclick="copyToClipboard('alif install ${lib.اسم_المستودع}')">
            alif install ${lib.الاسم.replace(" ", "_")}
        </button>
    </h3>
    <p><strong>الوصف:</strong> ${lib.الوصف}</p>
    <p><strong>الإصدار:</strong> ${lib.الاصدار}</p>
    <p><strong>المطور:</strong> ${lib.المطور}</p>
    <a href="https://github.com/${
      lib.حساب_المطور
    }" target="_blank"><img src="../Source/Assets/Github.svg"> حساب المطور</a>
    <a href="https://github.com/${lib.حساب_المطور}/${
    lib.اسم_المستودع
  }" target="_blank"><img src="../Source/Assets/Github.svg"> المستودع</a>`;
}
getLibraries(data);

searchInput.oninput = function () {
  let query = this.value;
  let filterLibs = data.filter(
    (lib) =>
      lib.الاسم.includes(query) ||
      lib.اسم_المستودع.includes(query) ||
      lib.الوصف.includes(query) ||
      lib.المطور.includes(query)
  );
  getLibraries(filterLibs);
};
