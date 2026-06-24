import StatusBadge from "./StatusBadge";

function PropertyTable({ properties }) {
  if (!properties || properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <p className="font-display text-lg text-ink">No properties listed</p>
        <p className="mt-1 text-sm text-ink-soft">
          Properties you add to the registry will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="scrollbar-thin overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-paper-raised font-mono text-[11px] uppercase tracking-wide text-ink-soft">
            <th className="px-6 py-3">Title</th>
            <th className="px-6 py-3">Location</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Description</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id} className="border-b border-line transition-colors hover:bg-paper-raised/60">
              <td className="px-6 py-4 font-medium text-ink">{property.title}</td>
              <td className="px-6 py-4 text-ink-soft">{property.location}</td>
              <td className="px-6 py-4 font-mono text-ink-soft">
                ₹{Number(property.price).toLocaleString("en-IN")}
              </td>
              <td className="px-6 py-4">
                <StatusBadge value={property.status} type="property" />
              </td>
              <td className="max-w-xs truncate px-6 py-4 text-ink-soft" title={property.description}>
                {property.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PropertyTable;
