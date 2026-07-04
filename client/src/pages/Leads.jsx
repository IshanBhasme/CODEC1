import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Download } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import LeadTable from '../components/LeadTable';
import LeadForm from '../components/LeadForm';
import { ConfirmModal } from '../components/Modal';
import { leadsService } from '../services/api';
import '../styles/leads.css';
import '../styles/main.css';

const Leads = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await leadsService.getAll();
      setLeads(response.data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleAddLead = () => {
    setSelectedLead(null);
    setShowLeadForm(true);
  };

  const handleEditLead = (lead) => {
    setSelectedLead(lead);
    setShowLeadForm(true);
  };

  const handleDeleteClick = (lead) => {
    setDeleteTarget(lead);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      setFormLoading(true);
      await leadsService.delete(deleteTarget._id || deleteTarget.id);
      setLeads(leads.filter(l => (l._id || l.id) !== (deleteTarget._id || deleteTarget.id)));
      setShowDeleteModal(false);
      setDeleteTarget(null);
    } catch (error) {
      console.error('Error deleting lead:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      setFormLoading(true);

      if (selectedLead) {
        // Update existing lead
        const response = await leadsService.update(
          selectedLead._id || selectedLead.id,
          formData
        );
        setLeads(leads.map(l =>
          (l._id || l.id) === (selectedLead._id || selectedLead.id)
            ? response.data
            : l
        ));
      } else {
        // Create new lead
        const response = await leadsService.create(formData);
        setLeads([...leads, response.data]);
      }

      setShowLeadForm(false);
      setSelectedLead(null);
    } catch (error) {
      console.error('Error saving lead:', error);
    } finally {
      setFormLoading(false);
    }
  };

  // Filter leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="leads-wrapper">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      <Navbar
        title="Lead Management"
        onMenuClick={() => setMobileMenuOpen(true)}
        sidebarCollapsed={sidebarCollapsed}
      />

      <main className={`leads-page ${sidebarCollapsed ? 'expanded' : ''}`}>
        <div className="leads-content">
          {/* Page Header */}
          <div className="page-header">
            <div>
              <h1 className="page-title">Leads</h1>
              <p className="page-subtitle">Manage your sales leads and track progress</p>
            </div>
            <div className="page-actions">
              <button className="btn btn-secondary">
                <Download size={16} />
                Export
              </button>
              <button className="btn btn-primary" onClick={handleAddLead}>
                <Plus size={16} />
                Add Lead
              </button>
            </div>
          </div>

          {/* Toolbar */}
          <div className="toolbar">
            <div className="toolbar-left">
              <div className="search-wrapper">
                <Search className="search-icon" size={18} />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal">Proposal</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
              </select>
            </div>
          </div>

          {/* Leads Table */}
          <LeadTable
            leads={filteredLeads}
            loading={loading}
            onEdit={handleEditLead}
            onDelete={handleDeleteClick}
          />

          {/* Lead Form Modal */}
          <LeadForm
            lead={selectedLead}
            isOpen={showLeadForm}
            onClose={() => {
              setShowLeadForm(false);
              setSelectedLead(null);
            }}
            onSubmit={handleFormSubmit}
            loading={formLoading}
          />

          {/* Delete Confirmation Modal */}
          <ConfirmModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDeleteConfirm}
            title="Delete Lead"
            message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
            type="danger"
            loading={formLoading}
          />
        </div>
      </main>
    </div>
  );
};

export default Leads;
