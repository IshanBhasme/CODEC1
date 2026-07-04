import { useEffect } from 'react';
import { X } from 'lucide-react';
import '../styles/modal.css';

const Modal = ({ isOpen, onClose, title, children, size }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${size ? `modal-${size}` : ''}`} onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, type = 'danger', loading }) => {
  const iconColors = {
    danger: 'danger',
    warning: 'warning',
    success: 'success'
  };

  const buttonClass = {
    danger: 'btn-danger',
    warning: 'btn-secondary',
    success: 'btn-success'
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="confirm-modal">
        <div className={`confirm-modal-icon ${iconColors[type]}`}>
          {type === 'danger' && <X size={32} />}
        </div>
        <h3 className="confirm-modal-title">{title}</h3>
        <p className="confirm-modal-text">{message}</p>
        <div className="confirm-modal-actions">
          <button className="btn btn-secondary" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button className={`btn ${buttonClass[type]}`} onClick={onConfirm} disabled={loading}>
            {loading ? (
              <>
                <span className="btn-loader"></span>
                Deleting...
              </>
            ) : (
              'Confirm'
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Modal;
