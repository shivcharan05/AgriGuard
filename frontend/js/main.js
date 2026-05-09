async function loadComponent(id, file){

const response = await fetch(file);

const html = await response.text();

document.getElementById(id).innerHTML = html;

}

loadComponent("navbar","components/navbar.html");
loadComponent("sidebar","components/sidebar.html");
loadComponent("footer","components/footer.html");

// ===== ADD THESE 2 LINES AT THE BOTTOM =====
// Re-apply translations after components finish loading
setTimeout(() => {
  if (typeof i18nApplyTranslations === "function") {
    i18nApplyTranslations();
    i18nUpdateLanguageButtons(i18nGetLanguage());
  }
}, 300);
// ===========================================
