const SkyStore = {
  get(key, fallback = null) {
    try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; }
    catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch { return false; }
  },
  makeReference() {
    return "SJ" + Math.random().toString(36).slice(2, 8).toUpperCase();
  }
};
