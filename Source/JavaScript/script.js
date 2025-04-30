// supabase
const supabaseUrl = "https://gfyxjkwchsnczsmthpiw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmeXhqa3djaHNuY3pzbXRocGl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyODUyODUsImV4cCI6MjA1OTg2MTI4NX0.b40Gi7Jsk_XkJSW-W5OU8oXyQZMHLUfqVw0R09Njyj4";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// القائمة
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

window.addEventListener('pageshow', function() { // اغلاق النوافذ المفتوحة عند الرجوع
  document.querySelectorAll('input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.checked = false;
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
    window.style.height = !height ? "120px" : height;
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
