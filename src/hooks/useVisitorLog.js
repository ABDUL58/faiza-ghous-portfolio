import { useEffect } from "react";

const SHEETS_URL = "https://script.google.com/macros/s/AKfycbzhrBlp3vxj4el_WmaueB0eE9qPwwf0ztVIyBR9hzDm04N38CLF5N6rLZX5GSXVVcgs/exec";

function parseBrowser(ua) {
  if (/OPR\/(\d+)/.test(ua))                          return `Opera ${RegExp.$1}`;
  if (/Edg\/(\d+)/.test(ua))                          return `Edge ${RegExp.$1}`;
  if (/Chrome\/(\d+)/.test(ua))                       return `Chrome ${RegExp.$1}`;
  if (/Firefox\/(\d+)/.test(ua))                      return `Firefox ${RegExp.$1}`;
  if (/Version\/[\d.]+ Safari/.test(ua))              return "Safari";
  return "Unknown";
}

function parseOS(ua) {
  if (/Windows NT 10/.test(ua))                       return "Windows 10/11";
  if (/Windows NT 6\.3/.test(ua))                     return "Windows 8.1";
  if (/Windows NT 6\.1/.test(ua))                     return "Windows 7";
  if (/Mac OS X ([\d_]+)/.test(ua))                   return `macOS ${RegExp.$1.replace(/_/g, ".")}`;
  if (/Android ([\d.]+)/.test(ua))                    return `Android ${RegExp.$1}`;
  if (/iPhone OS ([\d_]+)/.test(ua))                  return `iOS ${RegExp.$1.replace(/_/g, ".")}`;
  if (/Linux/.test(ua))                               return "Linux";
  return "Unknown";
}

function pktTimestamp() {
  return new Date().toLocaleString("en-PK", {
    timeZone: "Asia/Karachi",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false,
  }) + " (PKT)";
}

export function useVisitorLog() {
  useEffect(() => {
    if (sessionStorage.getItem("_visited")) return;
    sessionStorage.setItem("_visited", "1");

    const ua = navigator.userAgent;

    const baseInfo = {
      timestamp:  pktTimestamp(),
      browser:    parseBrowser(ua),
      os:         parseOS(ua),
      language:   navigator.language,
      timezone:   Intl.DateTimeFormat().resolvedOptions().timeZone,
      screen:     `${window.screen.width}x${window.screen.height}`,
      referrer:   document.referrer || "direct",
      userAgent:  ua,
      city: "", region: "", country: "", isp: "",
    };

    fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(4000) })
      .then((r) => r.json())
      .then((geo) => ({
        ...baseInfo,
        city:    geo.city         || "",
        region:  geo.region       || "",
        country: geo.country_name || "",
        isp:     geo.org          || "",
      }))
      .catch(() => baseInfo)
      .then((payload) =>
        fetch(SHEETS_URL, {
          method: "POST",
          body:   JSON.stringify(payload),
        })
      )
      .catch(() => {});
  }, []);
}
