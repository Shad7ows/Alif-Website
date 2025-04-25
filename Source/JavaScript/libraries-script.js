async function getData() {
  let { data, error } = await supabase.from("libraries").select("*");
  if (error) {
    console.error(error);
    return;
  }

  const libraryDiv = document.getElementById("libCards");
  const searchInput = document.getElementById("searchLib");

  function getLibraries(data) {
    libraries = data;
    libraryDiv.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      const lib = data[i];
      libraryDiv.innerHTML += `
      <button onclick="openData(${i})" class="card">
        <img src="${lib.المستودع}/blob/main/${lib.الصورة}?raw=true" alt="مكتبة لغة البرمجة العربية الف ${lib.الوصف} ${lib.المطور}">
        <h4 class="title">${lib.الاسم}</h4>
        <p class="الوصف">${lib.الوصف}</p>
        <h5>${lib.المطور} @</h5>
      </button>
    `;
      console.log(i);
    }
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
}
getData();

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
    <a href="${
      lib.المستودع
    }" target="_blank"><img src="../Source/Assets/Github.svg"> المستودع</a>`;
}
