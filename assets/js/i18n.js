/**
 * Language + JSON loading (same idea as images: relative paths on the site URL).
 */
const I18n = {
  STORAGE_KEY: 'portfolio_lang',
  DEFAULT_LANG: 'en',
  SUPPORTED: ['en', 'ar'],

  getLang() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored && this.SUPPORTED.includes(stored)) return stored;
    const browser = (navigator.language || 'en').slice(0, 2);
    return this.SUPPORTED.includes(browser) ? browser : this.DEFAULT_LANG;
  },

  setLang(lang) {
    if (!this.SUPPORTED.includes(lang)) return;
    localStorage.setItem(this.STORAGE_KEY, lang);
  },

  toggleLang(current) {
    return current === 'ar' ? 'en' : 'ar';
  },

  /** Relative path — works on GitHub Pages like assets/images/... */
  async loadData(lang) {
    const res = await fetch(`data/${lang}.json`);
    if (!res.ok) throw new Error(`data/${lang}.json → ${res.status}`);
    return res.json();
  },

  applyDocumentLang(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  },

  isFileProtocol() {
    return window.location.protocol === 'file:';
  },
};
