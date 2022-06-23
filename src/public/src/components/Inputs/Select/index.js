import React from 'react';
import { Row } from 'reactstrap';

export default function index({ label, name, value, onChange, options, error, hideDefault, disabled, noLabel }) {
  return (
    <Row>
      <label className="col-md-12 col-form-label" style={{ marginBottom: '-7px' }}>
        {noLabel ? null : label}
      </label>
      <div className="col-md-12">
        <select className={`form-control ${error ? 'error-input' : ''}`} name={name} onChange={onChange} defaultValue={value} disabled={disabled}>
          {hideDefault ? null : <option value=""> Select... </option>}
          {options?.map((item, i) => (
            <option value={item.value} key={i}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <small style={{ color: '#f57878' }}> {error} </small>
    </Row>
  );
}
