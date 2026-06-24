function Navbar({ title, subtitle, action }) {
  return (
    <header className="flex items-center justify-between border-b border-line bg-paper px-8 py-5">
      <div>
        <h1 className="font-display text-2xl text-ink">{title}</h1>
        {subtitle && <p className="mt-0.5 text-sm text-ink-soft">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </header>
  );
}

export default Navbar;
