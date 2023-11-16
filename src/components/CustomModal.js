import React from 'react';
import Modal from 'react-modal';
import './style.css'
const CustomModal = ({ isOpen, onRequestClose, contentLabel, message }) => {
    return (
        <div className='dialog-notify'>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                contentLabel={contentLabel}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    content: {
                        width: '30%',
                        height: '200px',
                        margin: 'auto',
                        top: '30%',
                        transform: 'translateY(-50%)',
                    },
                }}
            >
                <center>
                    <h2>{contentLabel}</h2>
                    <p>{message}</p>
                    <button onClick={onRequestClose}>Close</button>
                </center>
            </Modal>
        </div>
    );
};

export default CustomModal;
