export const MUSIC_KEY = "music";
export const MUSIC_VOLUME = 0.3;
export const MUSIC_MAX_AGE = 60 * 60 * 24 * 365;
export const MUSIC_SOURCES = ["/audios/focus.webm", "/audios/focus.mp3"] as const;

export function getMusicCookie() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|; )music=(on|off)(?:;|$)/);
  return match ? match[1] : null;
}

export function setMusicCookie(on: boolean) {
  const value = on ? "on" : "off";
  document.cookie = `${MUSIC_KEY}=${value}; Path=/; Max-Age=${MUSIC_MAX_AGE}; SameSite=Lax`;
}
