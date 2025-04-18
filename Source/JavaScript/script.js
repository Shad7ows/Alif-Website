document.addEventListener("DOMContentLoaded", function () {
  const MenuCheckbox = document.getElementById("lines");
  const NavUl = document.querySelector(".menu-section");
  const PageClose = document.querySelector(".page");

  MenuCheckbox.addEventListener("change", function () {
    if (MenuCheckbox.checked) {
      NavUl.classList.add("open");
      PageClose.classList.add("close");
    } else {
      NavUl.classList.remove("open");
      PageClose.classList.remove("close");
    }
  });
});

// عرض النافذه
function openWindow(height) {
  const winBack = document.querySelector(".winBack");
  const window = document.querySelector("#window");
  winBack.onclick = () => {
    winBack.style.opacity = 0;
    setTimeout(() => {
      winBack.style.display = "none";
    }, 700);
    setTimeout(() => {
      window.style.height = "0px";
    }, 50);
  };
  winBack.style.display = "flex";
  setTimeout(() => {
    winBack.style.opacity = 1;
  }, 20);
  setTimeout(() => {
    window.style.height = !height ? "100px" : height;
  }, 50);
}

// زر النسخ
function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
  notify("تم النسخ الي الحافظة");
}

// لعرض اشعار
function notify(text) {
  const notify = document.createElement("div");
  notify.className = "notify";
  notify.textContent = text;
  document.body.appendChild(notify);

  setTimeout(() => {
    notify.style.opacity = "1";
    notify.style.transform = "translateX(0)";
  }, 10);

  setTimeout(() => {
    notify.style.opacity = "0";
    notify.style.transform = "translateX(20px)";
    setTimeout(() => {
      document.body.removeChild(notify);
    }, 500);
  }, 3000);
}
