import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

function Modal({ open, modalLable, onClose, children }) {
  return (
    <div className={`modal ${open ? 'open' : ''}`}>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{modalLable}</h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  modalLable: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
