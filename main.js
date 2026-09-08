(() => {
  const root = document.documentElement;
  const toggle = document.querySelector("[data-theme-toggle]");
  const yearEl = document.querySelector("[data-year]");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const stored = localStorage.getItem("theme");

  if (yearEl) {
    const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(new Date());
    yearEl.textContent = year;
    yearEl.setAttribute("datetime", year);
  }

  const apply = (theme) => {
    if (!theme) {
      root.removeAttribute("data-theme");
      return;
    }
    root.setAttribute("data-theme", theme);
  };

  apply(stored === "dark" || stored === "light" ? stored : null);

  const isDark = () => {
    if (root.getAttribute("data-theme") === "dark") return true;
    if (root.getAttribute("data-theme") === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const syncToggle = () => {
    if (!toggle) return;
    const dark = isDark();
    toggle.setAttribute("aria-pressed", String(dark));
    toggle.textContent = dark ? "Use light theme" : "Use dark theme";
  };

  syncToggle();

  toggle?.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    apply(next);
    localStorage.setItem("theme", next);
    syncToggle();
  });

  if (!reduce) {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const id = link.getAttribute("href")?.slice(1);
        const target = id ? document.getElementById(id) : null;
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      });
    });
  }
})();
