(() => {
  let theme = "light";
  try {
    const saved = localStorage.getItem("kabita-theme");
    theme = saved === "dark" || saved === "light"
      ? saved
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  } catch {}
  document.documentElement.dataset.theme = theme;
  const colorMeta = document.querySelector('meta[name="theme-color"]');
  if (colorMeta) colorMeta.content = theme === "dark" ? "#141a1f" : "#f5f2ea";
})();
