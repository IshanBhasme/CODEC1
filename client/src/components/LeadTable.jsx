import { Mail, Phone, Edit, Trash2, User } from 'lucide-react';
import Loader from './Loader';

const LeadTable = ({ leads, loading, onEdit, onDelete }) => {
  const getStatusClass = (status) => {
    const statusMap = {
      'New': 'new',
      'Contacted': 'contacted',
      'Qualified': 'qualified',
      'Proposal': 'proposal',
      'Won': 'won',
      'Lost': 'lost'
    };
    return statusMap[status] || 'new';
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatValue = (value) => {
    if (!value) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  if (loading) {
    return (
      <div className="table-container">
        <Loader text="Loading leads..." />
      </div>
    );
  }

  if (!leads || leads.length === 0) {
    return (
      <div className="table-container">
        <div className="empty-state">
          <div className="empty-state-icon">
            <User />
          </div>
          <h3 className="empty-state-title">No leads found</h3>
          <p className="empty-state-text">
            Get started by adding your first lead to track potential customers.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="leads-table">
          <thead>
            <tr>
              <th className="sortable">Lead</th>
              <th className="sortable">Company</th>
              <th>Status</th>
              <th>Value</th>
              <th>Source</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id || lead.id}>
                <td>
                  <div className="lead-cell">
                    <div className="lead-avatar">{getInitials(lead.name)}</div>
                    <div className="lead-info">
                      <span className="lead-name">{lead.name}</span>
                      <span className="lead-email">{lead.email}</span>
                    </div>
                  </div>
                </td>
                <td>{lead.company || '-'}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(lead.status)}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="value-cell">{formatValue(lead.value)}</td>
                <td>{lead.source || '-'}</td>
                <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="actions-cell">
                    <button
                      className="action-btn edit"
                      onClick={() => onEdit(lead)}
                      title="Edit lead"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => onDelete(lead)}
                      title="Delete lead"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadTable;
