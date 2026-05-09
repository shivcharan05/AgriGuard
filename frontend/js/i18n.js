// ============================================
//  AgriGuard — i18n Translation Engine
//  Supports: English (en), Hindi (hi), Marathi (mr)
// ============================================

const I18N_DEFAULT_LANGUAGE = "en";
const I18N_STORAGE_KEY = "agriguard_language";

// Holds all loaded translation keys
let i18nTranslations = {};

// -------------------------------------------
// 1. GET CURRENT LANGUAGE
// -------------------------------------------
function i18nGetLanguage() {
  return localStorage.getItem(I18N_STORAGE_KEY) || I18N_DEFAULT_LANGUAGE;
}

// -------------------------------------------
// 2. SET LANGUAGE & RELOAD TRANSLATIONS
// -------------------------------------------
async function i18nSetLanguage(lang) {
  localStorage.setItem(I18N_STORAGE_KEY, lang);
  await i18nLoadTranslations(lang);
  i18nApplyTranslations();
  i18nUpdateLanguageButtons(lang);
}

// -------------------------------------------
// 3. LOAD TRANSLATION JSON FILE
// -------------------------------------------
async function i18nLoadTranslations(lang) {
  try {

    // Build correct path depending on page depth
    const depth = window.location.pathname.includes("/pages/") ? "../" : "";
    const path = `${depth}locales/${lang}/translation.json`;

    const response = await fetch(path);

    if (!response.ok) {
      console.warn(`AgriGuard i18n: Could not load language "${lang}". Falling back to English.`);
      const fallback = await fetch(`${depth}locales/en/translation.json`);
      i18nTranslations = await fallback.json();
      return;
    }

    i18nTranslations = await response.json();

  } catch (error) {
    console.error("AgriGuard i18n: Translation load failed.", error);
    i18nTranslations = {};
  }
}

// -------------------------------------------
// 4. GET NESTED KEY VALUE  e.g. "dashboard.title"
// -------------------------------------------
function i18nGet(key) {
  const keys = key.split(".");
  let value = i18nTranslations;

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      // Key not found — return the key itself so nothing breaks
      return key;
    }
  }

  return typeof value === "string" ? value : key;
}

// -------------------------------------------
// 5. APPLY TRANSLATIONS TO PAGE
// -------------------------------------------
function i18nApplyTranslations() {
  // Handle regular text elements
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const translated = i18nGet(key);
    el.textContent = translated;
  });

  // Handle placeholder attributes separately
  const placeholders = document.querySelectorAll("[data-i18n-placeholder]");
  placeholders.forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.setAttribute("placeholder", i18nGet(key));
  });
}

// -------------------------------------------
// 6. HIGHLIGHT ACTIVE LANGUAGE BUTTON
// -------------------------------------------
function i18nUpdateLanguageButtons(lang) {
  const buttons = document.querySelectorAll("[data-lang-btn]");

  buttons.forEach((btn) => {
    if (btn.getAttribute("data-lang-btn") === lang) {
      btn.classList.add("lang-active");
    } else {
      btn.classList.remove("lang-active");
    }
  });
}

// -------------------------------------------
// 7. INITIALIZE — runs automatically on page load
// -------------------------------------------
async function i18nInit() {
  const lang = i18nGetLanguage();
  await i18nLoadTranslations(lang);
  i18nApplyTranslations();
  i18nUpdateLanguageButtons(lang);
}

// Auto-start when DOM is ready
document.addEventListener("DOMContentLoaded", i18nInit);