import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const DarkToggle = () => {
  const [isDark, setIsDark] = useState(false);

  // Mount-once theme load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isDarkMode = savedTheme === "dark" || (!savedTheme && prefersDark);

    setIsDark(isDarkMode);
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newDark);
  };

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle Dark Mode"
      className="fixed top-4 right-4 z-50 bg-white/70 dark:bg-black/70 border border-gray-300 dark:border-gray-700 p-2 rounded-full shadow-md backdrop-blur-sm hover:scale-105 transition duration-300"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-blue-400" />
      )}
    </button>
  );
};

export default DarkToggle;
