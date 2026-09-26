export function getCtrlSymbol() {
    const platform = (typeof navigator !== "undefined" && navigator.platform)
      ? navigator.platform.toLowerCase()
      : "";
    return platform.includes("mac") ? "⌘" : "Ctrl";
  }

  export function getPlatform() {
    if (typeof navigator === "undefined") return "unknown";
  
    const ua = navigator.userAgent.toLowerCase();
  
    if (ua.includes("win")) return "windows";
    if (ua.includes("mac")) return "mac";
    if (ua.includes("android")) return "android";
    if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) return "ios";
    if (ua.includes("linux")) return "linux";
  
    return "unknown";
  }