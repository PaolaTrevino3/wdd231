const themes = {

  base: {
    bg: "#fff8f4",
    surface: "#ffffff",
    accent: "#f4d7df",
    ink: "#6d3f4b"
  },

  hydration: {
    bg: "#eef8f7",
    surface: "#ffffff",
    accent: "#cfe9e7",
    ink: "#315f5b"
  },

  barrier: {
    bg: "#fff6f1",
    surface: "#ffffff",
    accent: "#f4ddd3",
    ink: "#755044"
  },

  calming: {
    bg: "#f3f7ee",
    surface: "#ffffff",
    accent: "#dce8ce",
    ink: "#496144"
  },

  brightening: {
    bg: "#fff6e8",
    surface: "#ffffff",
    accent: "#f5d7af",
    ink: "#81522f"
  },

  breakouts: {
    bg: "#edf7f4",
    surface: "#ffffff",
    accent: "#cfe7df",
    ink: "#315f55"
  },

  renewal: {
    bg: "#f7f0f6",
    surface: "#ffffff",
    accent: "#e5d4e4",
    ink: "#6b4568"
  },

  "sun-care": {
    bg: "#fff8dd",
    surface: "#fffdf5",
    accent: "#f5df90",
    ink: "#765522"
  },

  cleansing: {
    bg: "#eef8f5",
    surface: "#ffffff",
    accent: "#d9eeea",
    ink: "#356057"
  }

};

export function applyTheme(themeName = "base") {
  const theme = themes[themeName] || themes.base;

  const root = document.documentElement;

  root.style.setProperty(
    "--theme-bg",
    theme.bg
  );

  root.style.setProperty(
    "--theme-surface",
    theme.surface
  );

  root.style.setProperty(
    "--theme-accent",
    theme.accent
  );

  root.style.setProperty(
    "--theme-ink",
    theme.ink
  );
}

export function resetTheme() {
  applyTheme("base");
}
