function getOS() {
  const userAgent = window.navigator.userAgent,
    platform =
      window.navigator?.userAgentData?.platform || window.navigator.platform,
    macosPlatforms = ["macOS", "Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    iosPlatforms = ["iPhone", "iPad", "iPod"];
  let os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "MacOS";
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = "iOS";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "Windows";
  } else if (/Android/.test(userAgent)) {
    os = "Android";
  } else if (/Linux/.test(platform)) {
    os = "Linux";
  }
  return os;
}

const osData = [
  {
    os: "Linux",
    name: "لينكس",
    img: "LinuxOS.svg",
    linkIDE: "#",
    linkLang: "#",
    version: "5.0.0",
    infoIDE: ` تحميل محرر اللغة مع اللغة لنظام تشغيل لينكس معمارية 64x`,
    infoLang: ` تحميل اللغة لنظام تشغيل لينكس معمارية 64x`,
  },
  {
    os: "Windows",
    name: "ويندوز",
    img: "WindowsOS.svg",
    linkIDE: "#",
    linkLang: "#",
    version: "5.0.0",
    infoIDE: `تحميل محرر اللغة مع اللغة لنظام تشغيل ويندوز 10-11 معمارية 64x `,
    infoLang: `تحميل اللغة لنظام تشغيل ويندوز 10-11 معمارية 64x `,
  },
  {
    os: "MacOS",
    name: "ماك",
    img: "MacOS.svg",
    linkIDE: "#",
    linkLang: "#",
    version: "5.0.0",
    infoIDE: `تحميل محرر اللغة مع اللغة لنظام تشغيل ماك معالج انتل معمارية 64x`,
    infoLang: `تحميل اللغة لنظام تشغيل ماك معالج انتل معمارية 64x`,
  },
];

const cardsDiv = document.querySelector(".os");
const currentOS = getOS();
const middleOrder = Math.ceil(osData.length / 2);
for (let i = 0; i < osData.length; i++) {
  const isCurrent = osData[i].os === currentOS;
  cardsDiv.innerHTML += `
        <div class="card" style="
            order: ${isCurrent ? middleOrder : i >= middleOrder ? i + 1 : i};
            ${isCurrent ? "scale: 1.1;" : ""}
        ">
          <div class="front">
              <img alt="${osData[i].name}" class="logo" src="../Source/Assets/${
      osData[i].img
    }" height="100px" />
              <h1 class="platform">${osData[i].name}</h1>
              <p class="info" dir="rtl">${osData[i].infoIDE}</p>
              <button onclick="newDownload('${osData[i].os}')" style="width: fit-content;">
                  <a href="${osData[i].linkIDE}" class="button1">تحميل</a>
              </button>
              <h5 class="vers">محرر لغة ألف | نـ${osData[i].version}</h5>
          </div>
          <div class="back">
                          <img alt="${osData[i].name}" class="logo" src="../Source/Assets/${
                  osData[i].img
                }" height="100px" />
              <h1 class="platform">${osData[i].name}</h1>
              <p class="info" dir="rtl">${osData[i].infoLang}</p>
              <button onclick="newDownload('${osData[i].os}')" style="width: fit-content;">
                  <a href="${osData[i].linkLang}" class="button1">تحميل</a>
              </button>
              <h5 class="vers">لغة ألف | نـ${osData[i].version}</h5>
          </div>
        </div>
    `;
}

async function newDownload(currentOS) {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    const ip = data.ip;

    const locationResponse = await fetch(`https://ipinfo.io/${ip}/json`);
    const locationData = await locationResponse.json();

    const country = `${locationData.country}/${locationData.city}/${locationData.timezone}`;

    supabase
      .from("Downloads")
      .insert({
        IP: ip,
        النظام_المحمل: currentOS,
        نظام_المستخدم: getOS(),
        الموقع: country,
      })
      .then(({error}) => {
        if (error) {
          console.error("Error inserting data:", error);
        }
      });
  } catch (error) {
    console.error(error);
  }
}
