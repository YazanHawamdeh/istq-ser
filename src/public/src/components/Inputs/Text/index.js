import React from 'react';
import { Row } from 'reactstrap';

export default function index({ label, name, value, onChange, error, disabled, type, noLabel }) {
  return (
    <Row>
      <label className="col-md-12 col-form-label" style={{ marginBottom: '-7px' }}>
        {noLabel ? null : label}
      </label>
      <div className="col-md-12">
        <input
          className={`form-control ${error ? 'error-input' : ''}`}
          type={`${type ? type : 'text'}`}
          name={name}
          placeholder={label}
          value={value || ''}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      <small style={{ color: '#f57878' }}> {error} </small>
    </Row>
  );
}
