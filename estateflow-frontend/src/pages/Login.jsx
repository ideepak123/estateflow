import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await login(email, password);
      toast.success("Welcome back.");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Those credentials don't match our records.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left: brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-ink p-12 text-paper lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 39px, currentColor 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, currentColor 40px)",
          }}
        />
        <div className="relative">
          <p className="font-display text-3xl">EstateFlow</p>
          <p className="mt-1 font-mono text-xs uppercase tracking-wider text-paper/60">
            Property &amp; Lead Registry
          </p>
        </div>

        <div className="relative max-w-sm">
          <p className="font-display text-4xl leading-[1.15] text-paper">
            Every enquiry, every listing — entered once, found in seconds.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <span className="stamp text-clay">BOOKED</span>
            <span className="stamp text-gold">SITE VISIT</span>
            <span className="stamp text-slate">AVAILABLE</span>
          </div>
        </div>

        <p className="relative font-mono text-[11px] text-paper/50">
          Built for sales agents working leads and listings across Visakhapatnam.
        </p>
      </div>

      {/* Right: login form */}
      <div className="flex items-center justify-center bg-paper px-6 py-12">
        <div className="animate-fade-up w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <p className="font-display text-2xl text-ink">EstateFlow</p>
          </div>

          <h1 className="font-display text-3xl text-ink">Sign in</h1>
          <p className="mt-1.5 text-sm text-ink-soft">
            Enter your registered credentials to access the registry.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@estateflow.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-clay"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-clay"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-md bg-clay py-2.5 text-sm font-semibold text-white transition-colors hover:bg-clay-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-6 font-mono text-[11px] text-ink-soft">
            Access is provisioned by your administrator.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
