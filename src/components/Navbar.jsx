import { Heart, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { useFavoritos } from "../contexts/FavoritosContext";
import { cx } from "../lib/cx";

const LINKS = [
  { to: "/", label: "Buscar versículos", icon: Search },
  { to: "/favoritos", label: "Favoritos", icon: Heart },
];

export default function NavBar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const { favoritos } = useFavoritos();

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        rolou
          ? "border-b border-white/10 bg-ink-900/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:h-20 lg:px-10">
        <button
          type="button"
          onClick={() => setMenuAberto((prev) => !prev)}
          className="-ml-2 rounded-full p-2 text-ash-50 transition-colors hover:bg-white/10 md:hidden"
          aria-expanded={menuAberto}
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
        >
          {menuAberto ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>

        <NavLink
          to="/"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <img
            src={logo}
            alt=""
            className="size-7 transition-transform duration-500 group-hover:rotate-6 lg:size-8"
          />
          <span className="text-lg font-semibold tracking-tight lg:text-xl">
            <span className="text-gold-500">Verse</span>
            <span className="text-ash-50">App</span>
          </span>
        </NavLink>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => {
            const Icon = link.icon;
            const { to, label } = link;
            return (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cx(
                  "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                  isActive
                    ? "bg-white/[0.06] text-gold-500"
                    : "text-ash-300 hover:bg-white/[0.04] hover:text-ash-50",
                )
              }
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
              {to === "/favoritos" && favoritos.length > 0 && (
                <span className="ml-0.5 grid min-w-5 place-items-center rounded-full bg-gold-500 px-1.5 text-[11px] font-bold text-ink-950">
                  {favoritos.length}
                </span>
              )}
            </NavLink>
            );
          })}
        </div>

        {/* Mantém o logo centralizado no mobile */}
        <span className="size-9 md:hidden" aria-hidden="true" />
      </div>

      {menuAberto && (
        <div className="border-t border-white/10 bg-ink-900 md:hidden">
          <div className="space-y-1 px-4 py-4">
            {LINKS.map((link, index) => {
              const Icon = link.icon;
              const { to, label } = link;
              return (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMenuAberto(false)}
                style={{ animationDelay: `${index * 70}ms` }}
                className={({ isActive }) =>
                  cx(
                    "enter enter-down flex items-center gap-3 rounded-field px-4 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-gold-500/10 text-gold-500"
                      : "text-ash-300 hover:bg-white/5 hover:text-ash-50",
                  )
                }
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
                {to === "/favoritos" && favoritos.length > 0 && (
                  <span className="ml-auto grid min-w-5 place-items-center rounded-full bg-gold-500 px-1.5 text-[11px] font-bold text-ink-950">
                    {favoritos.length}
                  </span>
                )}
              </NavLink>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
