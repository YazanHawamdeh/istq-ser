import React from 'react';
import { Row } from 'reactstrap';

export default function index({ label, name, value, onChange, error, disabled, noLabel }) {
  return (
    <Row>
      <label htmlFor="example-date-input" className="col-md-12 col-form-label" style={{ marginBottom: '-7px' }}>
        {noLabel ? null : label}
      </label>
      <div className="col-md-12">
        <input
          placeholder={label}
          className={`form-control ${error ? 'error-input' : ''}`}
          type="datetime-local"
          name={name}
          value={value || ''}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      <small style={{ color: '#f57878' }}> {error} </small>
    </Row>
  );
}
