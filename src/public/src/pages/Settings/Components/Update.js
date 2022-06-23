import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateLookup, toggleLoader } from '../../../store/actions';

export default function Update({ item, hide }) {
  const [label, setLabel] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    setLabel(item.label);
  }, []);

  const handleChange = (e) => setLabel(e.target.value);

  const submit = async () => {
    let data = { _id: item._id, type: item.type, label };
    dispatch(toggleLoader());
    await dispatch(updateLookup(data));
    dispatch(toggleLoader());
    hide();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <input className="form-control" type="text" placeholder="Enter text" value={label} onChange={handleChange} />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <i className="mdi mdi-check font-size-16 text-success" style={{ cursor: 'pointer' }} onClick={submit} />
        <i className="mdi mdi-close font-size-16 text-danger" style={{ cursor: 'pointer' }} onClick={hide} />
      </div>
    </div>
  );
}
//
//
