import { useState, useEffect } from 'react';
import { User, Mail, Building, DollarSign, Tag, Briefcase } from 'lucide-react';
import Modal from './Modal';
import '../styles/components.css';

const LeadForm = ({ lead, isOpen, onClose, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'New',
    value: '',
    source: 'Website',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (lead) {
      setFormData({
        name: lead.name || '',
        email: lead.email || '',
        phone: lead.phone || '',
        company: lead.company || '',
        status: lead.status || 'New',
        value: lead.value || '',
        source: lead.source || 'Website',
        notes: lead.notes || ''
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        status: 'New',
        value: '',
        source: 'Website',
        notes: ''
      });
    }
    setErrors({});
  }, [lead, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const submitData = {
      ...formData,
      value: parseFloat(formData.value) || 0
    };

    onSubmit(submitData);
  };

  const inputFields = [
    { name: 'name', label: 'Full Name', type: 'text', icon: User, placeholder: 'John Doe' },
    { name: 'email', label: 'Email Address', type: 'email', icon: Mail, placeholder: 'john@example.com' },
    { name: 'phone', label: 'Phone Number', type: 'tel', icon: null, placeholder: '+1 234 567 890' },
    { name: 'company', label: 'Company', type: 'text', icon: Building, placeholder: 'Acme Inc.' },
    { name: 'value', label: 'Deal Value', type: 'number', icon: DollarSign, placeholder: '10000' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={lead ? 'Edit Lead' : 'Add New Lead'}>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {inputFields.map((field) => (
            <div key={field.name} className="form-group">
              <label className="form-label" htmlFor={field.name}>
                {field.label}
              </label>
              <div className="form-input-wrapper">
                {field.icon && (
                  <field.icon className="form-input-icon" size={18} />
                )}
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className={`form-input ${field.icon ? 'has-icon' : ''} ${errors[field.name] ? 'error' : ''}`}
                />
              </div>
              {errors[field.name] && (
                <span className="form-error">{errors[field.name]}</span>
              )}
            </div>
          ))}

          <div className="form-group">
            <label className="form-label" htmlFor="status">Status</label>
            <div className="form-input-wrapper">
              <Tag className="form-input-icon" size={18} />
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-input has-icon"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal">Proposal</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="source">Lead Source</label>
            <div className="form-input-wrapper">
              <Briefcase className="form-input-icon" size={18} />
              <select
                id="source"
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="form-input has-icon"
              >
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Cold Call">Cold Call</option>
                <option value="Trade Show">Trade Show</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label className="form-label" htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Additional notes about this lead..."
              className="form-textarea"
              rows={3}
            />
          </div>
        </div>

        <div className="modal-footer" style={{ marginTop: '1.5rem' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <>
                <span className="btn-loader"></span>
                {lead ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              lead ? 'Update Lead' : 'Create Lead'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default LeadForm;
