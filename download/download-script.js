// supabase
const supabaseUrl = "https://mntokubwootojjrkvlym.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1udG9rdWJ3b290b2pqcmt2bHltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1MTY2NTUsImV4cCI6MjA2MjA5MjY1NX0.3p9FSzibsKmXZDz7lnFG4v4AB0m6AApnH0JTlt6tliw";
supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

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
    link: "https://github.com/alifcommunity/TaifEditor/releases/latest/download/TaifInstaller-Linux-X64",
    info: ` تحميل اللغة لنظام تشغيل لينكس معمارية 64x`,
  },
  {
    os: "Windows",
    name: "ويندوز",
    img: "WindowsOS.svg",
    link: "https://github.com/alifcommunity/TaifEditor/releases/latest/download/TaifInstaller-Win-X64.exe",
    info: `تحميل اللغة لنظام تشغيل ويندوز 10-11 معمارية 64x `,
  },
  {
    os: "MacOS",
    name: "ماك",
    img: "MacOS.svg",
    link: "https://github.com/alifcommunity/TaifEditor/releases/latest/download/TaifInstaller-MacOS-X64.app.zip",
    info: `تحميل اللغة لنظام تشغيل ماك معالج انتل معمارية 64x`,
  },
];

const cardsDiv = document.querySelector(".os");
const currentOS = getOS();
let pos = 0;
for (let i = 0; i < osData.length; i++) {
  const isCurrent = osData[i].os === currentOS;
  cardsDiv.innerHTML += `
        <div class="card" style="
            order: ${isCurrent ? 1 : pos};
            ${isCurrent ? "scale: 1.06;" : ""}
        ">
            <img alt="${osData[i].name}" class="logo" src="../source/assets/${
    osData[i].img
  }" height="100px" />
            <h1 class="platform">${osData[i].name}</h1>
            <p class="info" dir="rtl">${osData[i].info}</p>
            <button onclick="newDownload('${osData[i].os}' ,event)" style="width: fit-content;">
            <a href="${osData[i].link}" class="button1">تحميل</a>
            </button>
            <h5 class="vers">لغة ألف | نـ5.1.0</h5>
        </div>
    `;
    if (!isCurrent) { pos += 2};
}


async function newDownload(currentOS, event) {
  event.preventDefault(); // Stop immediate navigation
  const downloadLink = event.target.href; // Get original download URL

  try {
    // Get IP
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    const ip = await data.ip;

    // Get Location (with timeout)
    let country = "Unknown";
    try {
      const locationResponse = await fetch(`https://ipinfo.io/${ip}/json`, {
        signal: AbortSignal.timeout(5000) // Timeout after 5s
      });
      if (locationResponse.ok) {
        const locationData = await locationResponse.json();
        country = `${locationData.country}/${locationData.city}/${locationData.timezone}`;
      }
    } catch {}; // Fail silently if blocked

    // Supabase Insert
    await supabase.from("downloads").insert({
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
    
    await new Promise(resolve => setTimeout(resolve, 50)); // 50ms delay
  } catch (error) {
    console.error(error);
  } finally {
    window.location.href = downloadLink;
  }
}