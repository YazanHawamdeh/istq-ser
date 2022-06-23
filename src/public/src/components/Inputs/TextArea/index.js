import React from 'react';
import { Row } from 'reactstrap';

export default function index({ label, name, value, onChange, error, disabled, noLabel }) {
  return (
    <Row>
      <label className="col-md-12 col-form-label" style={{ marginBottom: '-7px' }}>
        {noLabel ? null : label}
      </label>
      <div className="col-md-12">
        <textarea
          className={`form-control ${error ? 'error-input' : ''}`}
          type="textarea"
          name={name}
          placeholder={label}
          onChange={onChange}
          value={value || ''}
          rows="4"
          disabled={disabled}
        />
      </div>
      <small style={{ color: '#f57878' }}> {error} </small>
    </Row>
  );
}
