import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Row, Col } from 'reactstrap';

import { approveStockAmount, toggleLoader, showSuccessAlert } from '../../store/actions';

export default function ApproveModal({ id, accept, show, close }) {
  const dispatch = useDispatch();

  const submit = async () => {
    dispatch(toggleLoader());
    await dispatch(approveStockAmount({ id, accept }));
    dispatch(toggleLoader());
    dispatch(showSuccessAlert('Amount updated'));
    close();
  };

  return (
    <Modal isOpen={show} toggle={close} size="md">
      <div className="modal-header">
        <h5 className="modal-title mt-0">{accept ? <strong>Approve</strong> : <strong>Reject</strong>}</h5>
        <button type="button" onClick={close} className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <p>Are you sure you want to {accept ? <strong>Approve</strong> : <strong>Reject</strong>}</p>
      </div>
      <div className="modal-footer">
        <button type="button" onClick={close} className="btn btn-secondary" data-dismiss="modal">
          Close
        </button>
        <button type="button" className="btn btn-danger" onClick={submit}>
          {accept ? <strong>Approve</strong> : <strong>Reject</strong>}
        </button>
      </div>
    </Modal>
  );
}
