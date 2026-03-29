(() => {
  const STORAGE_KEY = "theme";
  const root = document.documentElement;

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      if (theme) {
        localStorage.setItem(STORAGE_KEY, theme);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // localStorage unavailable
    }
  }

  // Apply stored preference immediately (before paint)
  applyTheme(getStoredTheme());

  // Wire up the toggle button once the DOM is ready
  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;

    function updateButton() {
      const effective = getStoredTheme() || getSystemTheme();
      btn.setAttribute(
        "aria-label",
        effective === "dark" ? "Switch to light mode" : "Switch to dark mode",
      );
      btn.textContent = effective === "dark" ? "☀" : "☾";
    }

    btn.addEventListener("click", () => {
      const stored = getStoredTheme();
      const system = getSystemTheme();
      const effective = stored || system;

      if (effective === "dark") {
        // Override to light
        storeTheme("light");
        applyTheme("light");
      } else {
        // Override to dark
        storeTheme("dark");
        applyTheme("dark");
      }
      updateButton();
    });

    updateButton();
  });
})();
