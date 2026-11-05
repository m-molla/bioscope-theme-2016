document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const iconEl = toggleBtn
    ? toggleBtn.querySelector(".theme-toggle-icon")
    : null;
  const systemPreference = window.matchMedia("(prefers-color-scheme: dark)");

  const updateUI = (isDark) => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    root.classList.toggle("light", !isDark);

    if (iconEl) {
      iconEl.textContent = isDark ? "☀️" : "🌙";
    }

    if (toggleBtn) {
      toggleBtn.setAttribute("aria-pressed", isDark ? "true" : "false");
    }
  };

  const savedTheme = localStorage.getItem("theme");
  const hasSavedTheme = savedTheme === "dark" || savedTheme === "light";
  let isDarkMode = hasSavedTheme
    ? savedTheme === "dark"
    : systemPreference.matches;

  updateUI(isDarkMode);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      isDarkMode = !document.documentElement.classList.contains("dark");
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
      updateUI(isDarkMode);
    });
  }

  if (!hasSavedTheme) {
    systemPreference.addEventListener("change", (event) => {
      isDarkMode = event.matches;
      updateUI(isDarkMode);
    });
  }
});
