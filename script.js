(() => {
  const languageToggle = document.getElementById("languageToggle");
  const menuToggle = document.getElementById("mobileMenuToggle");
  const mainNav = document.getElementById("mainNav");
  const year = document.getElementById("year");
  let language = "en";
  try { language = localStorage.getItem("durga-language") || "en"; } catch (error) {}
  if (year) year.textContent = new Date().getFullYear();
  function applyLanguage(next) {
    language = next;
    document.documentElement.lang = language;
    document.body.classList.toggle("kn", language === "kn");
    document.querySelectorAll("[data-en][data-kn]").forEach((el) => { el.innerHTML = el.dataset[language]; });
    document.querySelectorAll("[data-price]").forEach((el) => {
      const rawPrice = el.dataset.price.trim();
      const price = Number(rawPrice);
      if (rawPrice && Number.isFinite(price) && price >= 0) {
        el.textContent = `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(price)}`;
      } else {
        el.textContent = language === "kn" ? "ಬೆಲೆ ಅಂಗಡಿಯಲ್ಲಿ ವಿಚಾರಿಸಿ" : "Ask in store";
      }
    });
    if (languageToggle) {
      languageToggle.textContent = language === "en" ? "ಕನ್ನಡ" : "English";
      languageToggle.setAttribute("aria-label", language === "en" ? "ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿ" : "Switch to English");
    }
    try { localStorage.setItem("durga-language", language); } catch (error) {}
  }
  if (languageToggle) languageToggle.addEventListener("click", () => applyLanguage(language === "en" ? "kn" : "en"));
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      mainNav.classList.toggle("is-open", !expanded);
    });
    mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }));
    window.addEventListener("resize", () => {
      if (window.innerWidth > 620) {
        mainNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }
  applyLanguage(language);
})();