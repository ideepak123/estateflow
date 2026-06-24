import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import LeadTable from "../components/LeadTable";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import {
  getLeads,
  searchLeads,
  createLead,
  updateLead,
  updateLeadStatus,
  deleteLead,
} from "../services/leadService";

const STATUS_OPTIONS = ["NEW", "CONTACTED", "SITE_VISIT", "NEGOTIATION", "BOOKED", "LOST"];

const EMPTY_FORM = {
  name: "",
  phone: "",
  email: "",
  budget: "",
  interestedProperty: "",
  status: "NEW",
};

function Leads() {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const data = keyword.trim()
        ? await searchLeads(keyword.trim(), { page, size: 8 })
        : await getLeads({ page, size: 8, sortBy: "id", direction: "desc" });
      setPageData(data);
    } catch (error) {
      console.error(error);
      toast.error("Couldn't load leads. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, [page, keyword]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- data fetch on mount/page change
    fetchLeads();
  }, [fetchLeads]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(0);
    fetchLeads();
  };

  const openCreateModal = () => {
    setEditingLead(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEditModal = (lead) => {
    setEditingLead(lead);
    setForm({
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      budget: lead.budget,
      interestedProperty: lead.interestedProperty,
      status: lead.status,
    });
    setModalOpen(true);
  };

  const handleFormChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = { ...form, budget: Number(form.budget) };

    try {
      if (editingLead) {
        await updateLead(editingLead.id, payload);
        toast.success("Lead updated.");
      } else {
        await createLead(payload);
        toast.success("Lead added to the registry.");
      }
      setModalOpen(false);
      fetchLeads();
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || "Couldn't save this lead. Check the fields and try again.";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateLeadStatus(id, status);
      toast.success("Status updated.");
      fetchLeads();
    } catch (error) {
      console.error(error);
      toast.error("Couldn't update status.");
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteLead(deleteTarget.id);
      toast.success("Lead removed.");
      setDeleteTarget(null);
      fetchLeads();
    } catch (error) {
      console.error(error);
      toast.error("Couldn't delete this lead.");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar
          title="Leads"
          subtitle="Enquiries and prospects in the pipeline"
          action={
            <button
              onClick={openCreateModal}
              className="rounded-md bg-clay px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-clay-dark"
            >
              + New lead
            </button>
          }
        />

        <main className="px-8 py-8">
          <form onSubmit={handleSearchSubmit} className="mb-5 flex gap-2">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search by name, email, or phone…"
              className="w-full max-w-sm rounded-md border border-line bg-paper px-3.5 py-2 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-clay"
            />
            <button
              type="submit"
              className="rounded-md border border-line px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-clay hover:text-clay"
            >
              Search
            </button>
            {keyword && (
              <button
                type="button"
                onClick={() => {
                  setKeyword("");
                  setPage(0);
                }}
                className="rounded-md px-3 py-2 text-sm text-ink-soft hover:text-ink"
              >
                Clear
              </button>
            )}
          </form>

          <div className="animate-fade-up rounded-lg border border-line bg-paper">
            {loading ? (
              <p className="px-6 py-16 text-center font-mono text-sm text-ink-soft">Loading leads…</p>
            ) : (
              <>
                <LeadTable
                  leads={pageData?.content}
                  onEdit={openEditModal}
                  onDelete={setDeleteTarget}
                  onStatusChange={handleStatusChange}
                />
                <Pagination pageData={pageData} onPageChange={setPage} />
              </>
            )}
          </div>
        </main>
      </div>

      {/* Create / Edit modal */}
      <Modal
        open={modalOpen}
        title={editingLead ? "Edit lead" : "New lead"}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-soft">Name</label>
            <input
              required
              value={form.name}
              onChange={handleFormChange("name")}
              className="w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-clay"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-soft">Phone</label>
              <input
                required
                value={form.phone}
                onChange={handleFormChange("phone")}
                className="w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-clay"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-soft">Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={handleFormChange("email")}
                className="w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-clay"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-soft">Budget (₹)</label>
              <input
                required
                type="number"
                min="0"
                value={form.budget}
                onChange={handleFormChange("budget")}
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
                    {s.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-soft">Interested property</label>
            <input
              required
              value={form.interestedProperty}
              onChange={handleFormChange("interestedProperty")}
              placeholder="e.g. VMRDA Plot, Visakhapatnam"
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
              {saving ? "Saving…" : editingLead ? "Save changes" : "Add lead"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete confirmation */}
      <Modal
        open={Boolean(deleteTarget)}
        title="Remove this lead?"
        onClose={() => setDeleteTarget(null)}
      >
        <p className="text-sm text-ink-soft">
          This will permanently remove <span className="font-medium text-ink">{deleteTarget?.name}</span> from
          the registry. This can't be undone.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={() => setDeleteTarget(null)}
            className="rounded-md px-4 py-2 text-sm font-medium text-ink-soft hover:text-ink"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="rounded-md bg-rust px-4 py-2 text-sm font-semibold text-white transition-colors hover:opacity-90"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Leads;
