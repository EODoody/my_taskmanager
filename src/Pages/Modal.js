import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({

  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
    opacity: 0,
    pointerEvents: 'none',
    transition: 'opacity 0.3s',
  },
  modalOpen: {
    opacity: 1,
    pointerEvents: 'auto',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: -1, 
  },
  modalContent: {
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    borderRadius: '4px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    border: '1px solid #ccc',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    borderBottom: '1px solid #ccc',
    
  },
  modalTitle: {
    margin: 0,
    fontSize: '24px',
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  modalClose: {
    border: 'none',
    background: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#aaa',
    transition: 'color 0.3s',
    paddingBottom: 0,
    paddingTop: 0,
    margin: 0,
  },
  modalCloseHover: {
    color: '#333',
  },
  modalBody: {
    padding: '16px',
  },
}));

function Modal({ open, modalLable, onClose, children }) {
  const classes = useStyles();

  return (
    <div className={`${classes.modal} ${open ? classes.modalOpen : ''}`}>
      <div className={classes.modalContent}>
        <div className={classes.modalHeader}>
          <h2 className={classes.modalTitle}>{modalLable}</h2>
          <button className={classes.modalClose} onClick={onClose}>
            X
          </button>
        </div>
        <div className={classes.modalBody}>{children}</div>
      </div>
      <div className={classes.modalOverlay} onClick={onClose} />
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
