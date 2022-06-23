import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Row, Col } from 'reactstrap';

import { deleteRequest, toggleLoader, showSuccessAlert, showErrorAlert } from '../../../store/actions';

export default function Create({ id, show, close }) {
  const dispatch = useDispatch();

  const submit = async () => {
    dispatch(toggleLoader());
    await dispatch(deleteRequest(id));
    dispatch(toggleLoader());
    dispatch(showSuccessAlert('Request deleted successfuly'));
    close();
  };

  return (
    <Modal isOpen={show} toggle={close} size="md">
      <div className="modal-header">
        <h5 className="modal-title mt-0">Delete Request</h5>
        <button type="button" onClick={close} className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <p>Are you sure you want to delete request</p>
      </div>
      <div className="modal-footer">
        <button type="button" onClick={close} className="btn btn-secondary" data-dismiss="modal">
          Close
        </button>
        <button type="button" className="btn btn-danger" onClick={submit}>
          Delete
        </button>
      </div>
    </Modal>
  );
}
