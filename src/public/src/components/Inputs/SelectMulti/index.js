import React from 'react';

import Select from 'react-select';

export default function index({ label, options, onChange, selected, noLabel, error }) {
  return (
    <div className="mb-3">
      <label className="col-md-12 col-form-label">{noLabel ? null : label}</label>
      <Select className="react-select-container" value={selected} isMulti={true} onChange={onChange} options={options} />
    </div>
  );
}
