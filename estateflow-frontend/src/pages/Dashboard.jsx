import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getDashboardStats } from "../services/dashboardService";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

function StatCard({ label, value, accent }) {
  return (
    <div className="rounded-lg border border-line bg-paper p-5">
      <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">{label}</p>
      <p className={`mt-2 font-display text-3xl ${accent || "text-ink"}`}>{value}</p>
    </div>
  );
}

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getDashboardStats()
      .then((data) => {
        if (active) setStats(data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Couldn't load dashboard stats.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const propertyData = stats
    ? [
        { name: "Available", value: stats.availableProperties },
        { name: "Sold", value: stats.soldProperties },
      ]
    : [];

  const leadData = stats
    ? [
        { name: "New", count: stats.newLeads },
        { name: "Contacted", count: stats.contactedLeads },
        { name: "Booked", count: stats.bookedLeads },
      ]
    : [];

  const PIE_COLORS = ["#3f5e54", "#a13b3b"];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar title="Overview" subtitle="Today's snapshot of leads and listings" />

        <main className="px-8 py-8">
          {loading ? (
            <p className="font-mono text-sm text-ink-soft">Loading dashboard…</p>
          ) : !stats ? (
            <p className="font-mono text-sm text-ink-soft">No data available.</p>
          ) : (
            <div className="animate-fade-up space-y-8">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <StatCard label="Total Leads" value={stats.totalLeads} />
                <StatCard label="New Leads" value={stats.newLeads} accent="text-slate" />
                <StatCard label="Total Properties" value={stats.totalProperties} />
                <StatCard label="Booked Leads" value={stats.bookedLeads} accent="text-clay" />
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-lg border border-line bg-paper p-6">
                  <h2 className="font-display text-lg text-ink">Property status</h2>
                  <p className="mb-4 text-sm text-ink-soft">Available vs. sold listings</p>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={propertyData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={2}
                      >
                        {propertyData.map((entry, index) => (
                          <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-2 flex justify-center gap-6 font-mono text-xs text-ink-soft">
                    <span><span className="inline-block h-2 w-2 rounded-full bg-slate align-middle mr-1.5" />Available — {stats.availableProperties}</span>
                    <span><span className="inline-block h-2 w-2 rounded-full bg-rust align-middle mr-1.5" />Sold — {stats.soldProperties}</span>
                  </div>
                </div>

                <div className="rounded-lg border border-line bg-paper p-6">
                  <h2 className="font-display text-lg text-ink">Lead pipeline</h2>
                  <p className="mb-4 text-sm text-ink-soft">New, contacted, and booked leads</p>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={leadData}>
                      <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#57534e" }} axisLine={{ stroke: "#e3dccd" }} tickLine={false} />
                      <YAxis tick={{ fontSize: 12, fill: "#57534e" }} axisLine={false} tickLine={false} allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#b5481f" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-lg border border-line bg-paper p-6">
                <h2 className="font-display text-lg text-ink">Registry totals</h2>
                <div className="mt-4 grid grid-cols-3 gap-6 font-mono text-sm text-ink-soft">
                  <div>
                    <p className="text-2xl text-ink">{stats.totalUsers}</p>
                    <p className="text-xs uppercase tracking-wide">Team members</p>
                  </div>
                  <div>
                    <p className="text-2xl text-ink">{stats.totalProperties}</p>
                    <p className="text-xs uppercase tracking-wide">Properties</p>
                  </div>
                  <div>
                    <p className="text-2xl text-ink">{stats.totalLeads}</p>
                    <p className="text-xs uppercase tracking-wide">Leads</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
