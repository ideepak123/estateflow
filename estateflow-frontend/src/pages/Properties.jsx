import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PropertyTable from "../components/PropertyTable";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import {
  getProperties,
  createProperty,
  searchPropertiesByLocation,
} from "../services/propertyService";

const STATUS_OPTIONS = ["AVAILABLE", "PENDING", "RESERVED", "SOLD"];

const EMPTY_FORM = {
  title: "",
  description: "",
  price: "",
  location: "",
  status: "AVAILABLE",
};

function Properties() {
  const [pageData, setPageData] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [location, setLocation] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProperties({ page, size: 8, sortBy: "id", direction: "desc" });
      setPageData(data);
    } catch (error) {
      console.error(error);
      toast.error("Couldn't load properties. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- data fetch on mount/page change
    fetchProperties();
  }, [fetchProperties]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!location.trim()) {
      setSearchResults(null);
      return;
    }
    try {
      const results = await searchPropertiesByLocation(location.trim());
      setSearchResults(results);
    } catch (error) {
      console.error(error);
      toast.error("Search failed.");
    }
  };

  const clearSearch = () => {
    setLocation("");
    setSearchResults(null);
  };

  const handleFormChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = { ...form, price: Number(form.price) };

    try {
      await createProperty(payload);
      toast.success("Property added to the registry.");
      setModalOpen(false);
      setForm(EMPTY_FORM);
      fetchProperties();
    } catch (error) {
      console.error(error);
      toast.error("Couldn't save this property. Check the fields and try again.");
    } finally {
      setSaving(false);
    }
  };

  const displayedRows = searchResults !== null ? searchResults : pageData?.content;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar
          title="Properties"
          subtitle="Listings currently in the registry"
          action={
            <button
              onClick={() => setModalOpen(true)}
              className="rounded-md bg-clay px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-clay-dark"
            >
              + New property
            </button>
          }
        />

        <main className="px-8 py-8">
          <form onSubmit={handleSearchSubmit} className="mb-5 flex gap-2">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Search by location…"
              className="w-full max-w-sm rounded-md border border-line bg-paper px-3.5 py-2 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-clay"
            />
            <button
              type="submit"
              className="rounded-md border border-line px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-clay hover:text-clay"
            >
              Search
            </button>
            {searchResults !== null && (
              <button
                type="button"
                onClick={clearSearch}
                className="rounded-md px-3 py-2 text-sm text-ink-soft hover:text-ink"
              >
                Clear
              </button>
            )}
          </form>

          <div className="animate-fade-up rounded-lg border border-line bg-paper">
            {loading ? (
              <p className="px-6 py-16 text-center font-mono text-sm text-ink-soft">Loading properties…</p>
            ) : (
              <>
                <PropertyTable properties={displayedRows} />
                {searchResults === null && (
                  <Pagination pageData={pageData} onPageChange={setPage} />
                )}
              </>
            )}
          </div>
        </main>
      </div>

      <Modal open={modalOpen} title="New property" onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-soft">Title</label>
            <input
              required
              value={form.title}
              onChange={handleFormChange("title")}
              placeholder="e.g. VMRDA Plot"
              className="w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-clay"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-soft">Description</label>
            <textarea
              required
              value={form.description}
              onChange={handleFormChange("description")}
              rows={3}
              className="w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-clay"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-soft">Price (₹)</label>
              <input
                required
                type="number"
                min="0"
                value={form.price}
                onChange={handleFormChange("price")}
                className="w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-clay"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-soft">Status</label>
              <select
                value={form.status}
                onChange={handleFormChange("status")}
                className="w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-clay"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-soft">Location</label>
            <input
              required
              value={form.location}
              onChange={handleFormChange("location")}
              placeholder="e.g. Visakhapatnam"
              className="w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-clay"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="rounded-md px-4 py-2 text-sm font-medium text-ink-soft hover:text-ink"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-clay px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-clay-dark disabled:opacity-60"
            >
              {saving ? "Saving…" : "Add property"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Properties;
