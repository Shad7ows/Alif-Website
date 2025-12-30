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
    window.style.height = !height ? "150px" : height;
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

const ua = navigator.userAgent;
if(!/mobile|tablet|ipad|playbook|silk/i.test(ua)){
  let cursor = document.createElement("div");
  cursor.setAttribute("id", "cursor");
  cursor.style = `
      position: fixed;
      border-radius: 100%;
      box-shadow: 0 0 200px 80px #2079ff50;`;
  document.body.appendChild(cursor);

  const mouse = { x: 0, y: 0 };
  const previousMouse = { x: 0, y: 0 };
  const circle = { x: 0, y: 0 };
  let currentScale = 0;

  window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
  });

  const speed = 0.17;

  const tick = () => {
      // position
      circle.x += (mouse.x - circle.x) * speed;
      circle.y += (mouse.y - circle.y) * speed;
      const position = `translate(${circle.x}px, ${circle.y}px)`;

      const deltaMouseX = mouse.x - previousMouse.x;
      const deltaMouseY = mouse.y - previousMouse.y;

      // scale
      previousMouse.x = mouse.x;
      previousMouse.y = mouse.y;
      const mouseVelocity = Math.min(
          Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 10,
          150
      );
      const scaleValue = (mouseVelocity / 150) * 0.5;
      currentScale += (scaleValue - currentScale) * speed;
      const scale = `scaleX(${1 + currentScale}) scaleY(${1.5 - currentScale})`;

      // rotate
      const angle = (Math.atan2(deltaMouseY, deltaMouseX) * 180) / Math.PI;
      const rotate = `rotate(${angle}deg)`;

      cursor.style.transform = position + rotate + scale;

      window.requestAnimationFrame(tick);
  };

  tick();
}
