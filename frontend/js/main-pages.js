// Component loader for pages inside /pages/ folder
// Uses ../ prefix to go up one level to frontend/

async function loadComponent(id, file) {
  const response = await fetch(file);
  const html = await response.text();
  document.getElementById(id).innerHTML = html;
}

loadComponent("navbar", "../components/navbar.html");
loadComponent("sidebar", "../components/sidebar.html");
loadComponent("footer", "../components/footer.html");

// Re-apply translations after components load
setTimeout(() => {
  if (typeof i18nApplyTranslations === "function") {
    i18nApplyTranslations();
    i18nUpdateLanguageButtons(i18nGetLanguage());
  }
}, 300);