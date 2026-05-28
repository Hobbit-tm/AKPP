import { useState } from "react";

const navItems = [
  { label: "Услуги", id: "services" },
  { label: "Преимущества", id: "advantages" },
  { label: "Этапы", id: "steps" },
  { label: "Цены", id: "prices" },
  { label: "Отзывы", id: "reviews" },
  { label: "Контакты", id: "contacts" },
  // { label: "Карта", id: "map" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <button
          type="button"
          onClick={() => scrollToSection("top")}
          className="text-xl font-bold text-slate-900"
        >
          АКПП
        </button>

        <nav className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className="text-sm font-medium text-slate-700 transition hover:text-slate-900"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Открыть меню"
        >
          <span className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-5 bg-slate-900 transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-slate-900 transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-slate-900 transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden border-t border-slate-200 bg-white transition-all duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-4 py-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className="rounded-lg px-3 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
