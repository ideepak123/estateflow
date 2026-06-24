// The "registry stamp" signature element — small rotated outline badges
// that read like a stamp on a property deed or lead card.

const LEAD_STYLES = {
  NEW: "text-slate",
  CONTACTED: "text-gold",
  SITE_VISIT: "text-gold",
  NEGOTIATION: "text-clay",
  BOOKED: "text-slate",
  LOST: "text-rust",
};

const PROPERTY_STYLES = {
  AVAILABLE: "text-slate",
  SOLD: "text-rust",
  PENDING: "text-gold",
  RESERVED: "text-clay",
};

function StatusBadge({ value, type = "lead" }) {
  if (!value) return <span className="stamp text-ink-soft">—</span>;

  const styles = type === "property" ? PROPERTY_STYLES : LEAD_STYLES;
  const colorClass = styles[value] || "text-ink-soft";

  return (
    <span className={`stamp ${colorClass}`}>
      {value.replace(/_/g, " ")}
    </span>
  );
}

export default StatusBadge;
