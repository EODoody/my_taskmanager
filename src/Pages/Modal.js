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
    borderRadius: '10px',
    boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.1)',
    maxWidth: '90vw',
    width: '500px',
    maxHeight: '90vh',
    overflowY: 'auto',
    padding: '30px',
    border: `1px solid ${theme.palette.grey[300]}`,
    color: theme.palette.primary.main,
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '20px',
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  modalTitle: {
    margin: 0,
    fontSize: '24px',
    fontWeight: 600,
    color: theme.palette.primary.main
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
    paddingTop: '20px',
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
