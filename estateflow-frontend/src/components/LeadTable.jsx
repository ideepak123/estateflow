import StatusBadge from "./StatusBadge";

function LeadTable({ leads, onEdit, onDelete, onStatusChange }) {
  const statusOptions = ["NEW", "CONTACTED", "SITE_VISIT", "NEGOTIATION", "BOOKED", "LOST"];

  if (!leads || leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <p className="font-display text-lg text-ink">No leads on file</p>
        <p className="mt-1 text-sm text-ink-soft">
          New enquiries you log will be registered here.
        </p>
      </div>
    );
  }

  return (
    <div className="scrollbar-thin overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-paper-raised font-mono text-[11px] uppercase tracking-wide text-ink-soft">
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Contact</th>
            <th className="px-6 py-3">Interested in</th>
            <th className="px-6 py-3">Budget</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b border-line transition-colors hover:bg-paper-raised/60">
              <td className="px-6 py-4 font-medium text-ink">{lead.name}</td>
              <td className="px-6 py-4 text-ink-soft">
                <div>{lead.email}</div>
                <div className="font-mono text-xs">{lead.phone}</div>
              </td>
              <td className="px-6 py-4 text-ink-soft">{lead.interestedProperty}</td>
              <td className="px-6 py-4 font-mono text-ink-soft">
                ₹{Number(lead.budget).toLocaleString("en-IN")}
              </td>
              <td className="px-6 py-4">
                <select
                  value={lead.status}
                  onChange={(e) => onStatusChange(lead.id, e.target.value)}
                  className="cursor-pointer rounded-md border border-line bg-paper px-2 py-1 font-mono text-xs uppercase text-ink-soft outline-none focus:border-clay"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
                <span className="ml-2 inline-block align-middle">
                  <StatusBadge value={lead.status} type="lead" />
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onEdit(lead)}
                  className="mr-2 rounded-md border border-line px-2.5 py-1 text-xs font-medium text-ink-soft transition-colors hover:border-clay hover:text-clay"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(lead)}
                  className="rounded-md border border-line px-2.5 py-1 text-xs font-medium text-ink-soft transition-colors hover:border-rust hover:text-rust"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeadTable;
