import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    zIndex: 2000, // Set a higher zIndex for the modal overlay
  },
  content: {
    position: 'absolute',
    // top: "15%",
    // left: '40px',
    // right: '40px',
    // bottom: '40px',
    border: 'none',
    background: '#fff',
    WebkitOverflowScrolling: 'touch',
    // borderRadius: "4px",
    outline: 'none',
    padding: '0px',
    zIndex: 2001, // Set a higher zIndex for the modal content
  },
};

Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.75)';

export const ModalComponent = ({ content, modal, onModalStatus, style }) => {
  return (
    <Modal
      className={style}
      isOpen={modal}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={onModalStatus}
      style={customStyles}
      //   contentLabel="Example Modal"
    >
      {content}
    </Modal>
  );
};

Modal.setAppElement('#root');
