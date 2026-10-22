(() => {
  const languageToggle = document.getElementById("languageToggle");
  const menuToggle = document.getElementById("mobileMenuToggle");
  const mainNav = document.getElementById("mainNav");
  const year = document.getElementById("year");
  const cartDialog = document.getElementById("cartDialog");
  const cartItems = document.getElementById("cartItems");
  const cartEmpty = document.getElementById("cartEmpty");
  const cartTotal = document.getElementById("cartTotal");
  const cartStatus = document.getElementById("cartStatus");
  const cartCount = document.getElementById("cartCount");
  const cartFloatCount = document.getElementById("cartFloatCount");
  let language = "en";
  let cart = [];
  try {
    language = localStorage.getItem("durga-language") || "en";
    const savedCart = JSON.parse(localStorage.getItem("durga-cart") || "[]");
    if (Array.isArray(savedCart)) {
      cart = savedCart.filter((item) => item && typeof item.id === "string" && Number.isInteger(item.qty) && item.qty > 0 && item.qty <= 99)
        .map((item) => ({ id: item.id, qty: item.qty, name: typeof item.name === "string" ? item.name.slice(0, 70) : "" }));
    }
  } catch (error) {}
  if (year) year.textContent = new Date().getFullYear();

  function productCard(id) {
    return document.querySelector('[data-product-id="' + id.replace(/"/g, "") + '"]');
  }

  function productName(id) {
    const card = productCard(id);
    const heading = card && card.querySelector("h3");
    if (!heading) return id;
    const localized = heading.dataset[language] || heading.textContent;
    const temp = document.createElement("div");
    temp.innerHTML = localized;
    return temp.textContent.trim();
  }

  function productPrice(id) {
    const card = productCard(id);
    const priceElement = card && card.querySelector("[data-price]");
    const value = priceElement ? Number(priceElement.dataset.price.trim()) : NaN;
    return Number.isFinite(value) && value >= 0 && priceElement.dataset.price.trim() !== "" ? value : null;
  }

  function saveCart() {
    try { localStorage.setItem("durga-cart", JSON.stringify(cart)); } catch (error) {}
  }

  function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    [cartCount, cartFloatCount].forEach((node) => {
      if (node) {
        node.textContent = String(count);
        node.setAttribute("aria-label", language === "kn" ? count + " ವಸ್ತುಗಳು ಕಾರ್ಟ್‌ನಲ್ಲಿ" : count + " items in cart");
      }
    });
    document.querySelectorAll(".cart-trigger").forEach((button) => {
      button.setAttribute("aria-label", language === "kn" ? "ಕಾರ್ಟ್ ತೆರೆಯಿರಿ, " + count + " ವಸ್ತುಗಳು" : "Open cart, " + count + " items");
    });
  }

  function renderCart() {
    if (!cartItems) return;
    cartItems.replaceChildren();
    if (cartEmpty) cartEmpty.hidden = cart.length > 0;
    let allPricesKnown = cart.length > 0;
    let total = 0;

    cart.forEach((item) => {
      const row = document.createElement("div");
      row.className = "cart-row";
      const details = document.createElement("div");
      const name = document.createElement("div");
      name.className = "cart-row-name";
      name.textContent = item.id.startsWith("custom-") ? item.name : productName(item.id);
      details.appendChild(name);

      const price = document.createElement("div");
      price.className = "cart-row-price";
      if (item.id.startsWith("custom-")) {
        price.textContent = language === "kn" ? "ಬೆಲೆ ಅಂಗಡಿಯಲ್ಲಿ ವಿಚಾರಿಸಿ" : "Price: ask in store";
        allPricesKnown = false;
      } else {
        const unitPrice = productPrice(item.id);
        if (unitPrice === null) {
          price.textContent = language === "kn" ? "ಬೆಲೆ ಅಂಗಡಿಯಲ್ಲಿ ವಿಚಾರಿಸಿ" : "Price: ask in store";
          allPricesKnown = false;
        } else {
          total += unitPrice * item.qty;
          price.textContent = "₹" + new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(unitPrice);
        }
      }
      details.appendChild(price);
      row.appendChild(details);

      const quantity = document.createElement("div");
      quantity.className = "cart-qty";
      const minus = document.createElement("button");
      minus.type = "button";
      minus.textContent = "−";
      minus.setAttribute("aria-label", language === "kn" ? "ಒಂದು ಕಡಿಮೆ ಮಾಡಿ" : "Decrease quantity");
      minus.dataset.cartAction = "decrease";
      minus.dataset.cartId = item.id;
      const amount = document.createElement("output");
      amount.textContent = String(item.qty);
      const plus = document.createElement("button");
      plus.type = "button";
      plus.textContent = "+";
      plus.setAttribute("aria-label", language === "kn" ? "ಒಂದು ಹೆಚ್ಚಿಸಿ" : "Increase quantity");
      plus.dataset.cartAction = "increase";
      plus.dataset.cartId = item.id;
      quantity.append(minus, amount, plus);
      row.appendChild(quantity);

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "cart-remove";
      remove.textContent = language === "kn" ? "ತೆಗೆದುಹಾಕಿ" : "Remove";
      remove.dataset.cartAction = "remove";
      remove.dataset.cartId = item.id;
      row.appendChild(remove);
      cartItems.appendChild(row);
    });

    if (cartTotal) {
      if (!cart.length) {
        cartTotal.textContent = "";
      } else if (allPricesKnown) {
        cartTotal.textContent = (language === "kn" ? "ಅಂದಾಜು ಒಟ್ಟು: " : "Estimated total: ") + "₹" + new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(total);
      } else {
        cartTotal.textContent = language === "kn" ? "ಅಂತಿಮ ಬೆಲೆ ಅಂಗಡಿಯಲ್ಲಿ ಖಚಿತವಾಗುತ್ತದೆ" : "Final price confirmed at the shop";
      }
    }
    updateCartCount();
  }

  function applyLanguage(next) {
    language = next;
    document.documentElement.lang = language;
    document.body.classList.toggle("kn", language === "kn");
    document.querySelectorAll("[data-en][data-kn]").forEach((el) => { el.innerHTML = el.dataset[language]; });
    const customNameInput = document.getElementById("customItemName");
    if (customNameInput) {
      customNameInput.placeholder = customNameInput.dataset["placeholder" + (language === "kn" ? "Kn" : "En")];
      customNameInput.setAttribute("aria-label", language === "kn" ? "ವಸ್ತುವಿನ ಹೆಸರು" : "Item name");
    }
    document.querySelectorAll("[data-price]").forEach((el) => {
      const rawPrice = el.dataset.price.trim();
      const price = Number(rawPrice);
      if (rawPrice && Number.isFinite(price) && price >= 0) {
        el.textContent = "₹" + new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(price);
      } else {
        el.textContent = language === "kn" ? "ಬೆಲೆ ಅಂಗಡಿಯಲ್ಲಿ ವಿಚಾರಿಸಿ" : "Ask in store";
      }
    });
    if (languageToggle) {
      languageToggle.textContent = language === "en" ? "ಕನ್ನಡ" : "English";
      languageToggle.setAttribute("aria-label", language === "en" ? "ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿ" : "Switch to English");
    }
    try { localStorage.setItem("durga-language", language); } catch (error) {}
    renderCart();
  }

  function addItem(id, name) {
    const existing = cart.find((item) => item.id === id);
    if (existing) existing.qty = Math.min(99, existing.qty + 1);
    else cart.push({ id: id, qty: 1, name: name || "" });
    saveCart();
    renderCart();
    if (cartStatus) cartStatus.textContent = language === "kn" ? "ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಲಾಗಿದೆ." : "Added to your cart.";
  }

  document.querySelectorAll("[data-cart-add]").forEach((button) => {
    button.addEventListener("click", () => addItem(button.dataset.cartAdd, ""));
  });

  document.querySelectorAll(".cart-trigger").forEach((button) => {
    button.addEventListener("click", () => {
      if (cartDialog && typeof cartDialog.showModal === "function") cartDialog.showModal();
      renderCart();
    });
  });

  const closeCart = document.getElementById("cartClose");
  if (closeCart) closeCart.addEventListener("click", () => cartDialog.close());
  const continueShopping = document.getElementById("cartContinue");
  if (continueShopping) continueShopping.addEventListener("click", () => cartDialog.close());
  if (cartDialog) cartDialog.addEventListener("click", (event) => {
    if (event.target === cartDialog) cartDialog.close();
  });

  if (cartItems) cartItems.addEventListener("click", (event) => {
    const button = event.target.closest("[data-cart-action]");
    if (!button) return;
    const item = cart.find((entry) => entry.id === button.dataset.cartId);
    if (!item) return;
    if (button.dataset.cartAction === "remove" || (button.dataset.cartAction === "decrease" && item.qty <= 1)) {
      cart = cart.filter((entry) => entry.id !== item.id);
    } else if (button.dataset.cartAction === "decrease") {
      item.qty -= 1;
    } else if (button.dataset.cartAction === "increase") {
      item.qty = Math.min(99, item.qty + 1);
    }
    saveCart();
    renderCart();
  });

  const customItemForm = document.getElementById("customItemForm");
  if (customItemForm) customItemForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("customItemName");
    const name = input ? input.value.trim().slice(0, 70) : "";
    if (!name) {
      if (cartStatus) cartStatus.textContent = language === "kn" ? "ವಸ್ತುವಿನ ಹೆಸರನ್ನು ನಮೂದಿಸಿ." : "Enter an item name first.";
      if (input) input.focus();
      return;
    }
    const id = "custom-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    addItem(id, name);
    input.value = "";
    input.focus();
  });

  const clearCart = document.getElementById("clearCart");
  if (clearCart) clearCart.addEventListener("click", () => {
    cart = [];
    saveCart();
    renderCart();
    if (cartStatus) cartStatus.textContent = language === "kn" ? "ಕಾರ್ಟ್ ಖಾಲಿ ಮಾಡಲಾಗಿದೆ." : "Cart cleared.";
  });

  const copyCart = document.getElementById("copyCart");
  if (copyCart) copyCart.addEventListener("click", async () => {
    if (!cart.length) {
      if (cartStatus) cartStatus.textContent = language === "kn" ? "ಮೊದಲು ಕಾರ್ಟ್‌ಗೆ ವಸ್ತುಗಳನ್ನು ಸೇರಿಸಿ." : "Add items to the cart first.";
      return;
    }
    const lines = cart.map((item) => {
      const name = item.id.startsWith("custom-") ? item.name : productName(item.id);
      return name + " × " + item.qty;
    });
    const message = (language === "kn" ? "ಖರೀದಿ ಪಟ್ಟಿ" : "Shopping list") + "\n" + lines.join("\n") + "\n" + (language === "kn" ? "ಬೆಲೆ/ಲಭ್ಯತೆ ಅಂಗಡಿಯಲ್ಲಿ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ." : "Please confirm price and availability at the shop.");
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(message);
      } else {
        const temporary = document.createElement("textarea");
        temporary.value = message;
        temporary.style.position = "fixed";
        temporary.style.opacity = "0";
        document.body.appendChild(temporary);
        temporary.select();
        document.execCommand("copy");
        temporary.remove();
      }
      if (cartStatus) cartStatus.textContent = language === "kn" ? "ಪಟ್ಟಿ ನಕಲಾಗಿದೆ. ಅಂಗಡಿಗೆ ಬಂದು ತೋರಿಸಿ." : "List copied. Bring it to the shop.";
    } catch (error) {
      if (cartStatus) cartStatus.textContent = language === "kn" ? "ಪಟ್ಟಿಯನ್ನು ನಕಲಿಸಲಾಗಲಿಲ್ಲ." : "Could not copy the list.";
    }
  });

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


