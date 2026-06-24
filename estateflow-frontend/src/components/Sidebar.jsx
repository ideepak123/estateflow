import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/dashboard", label: "Overview", glyph: "01" },
  { to: "/leads", label: "Leads", glyph: "02" },
  { to: "/properties", label: "Properties", glyph: "03" },
];

function Sidebar() {
  const { email, logout } = useAuth();

  return (
    <aside className="flex h-screen w-60 flex-col border-r border-line bg-paper-raised">
      <div className="border-b border-line px-6 py-6">
        <p className="font-display text-2xl leading-none text-ink">EstateFlow</p>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink-soft">
          Property &amp; Lead Registry
        </p>
      </div>

      <nav className="flex-1 px-3 py-5">
        <ul className="space-y-1">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-clay text-white"
                      : "text-ink-soft hover:bg-clay-soft hover:text-clay-dark"
                  }`
                }
              >
                <span className="font-mono text-[11px] opacity-60">{link.glyph}</span>
                <span className="font-medium">{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-line px-4 py-4">
        <div className="mb-3 rounded-md bg-paper px-3 py-2.5">
          <p className="truncate text-xs font-medium text-ink" title={email || ""}>
            {email || "Signed in"}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-wide text-ink-soft">
            Active session
          </p>
        </div>
        <button
          onClick={logout}
          className="w-full rounded-md border border-line px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-rust hover:bg-rust-soft hover:text-rust"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
