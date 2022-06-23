import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';

import { toggleLoader, showSuccessAlert, showErrorAlert, updateStockAmountForDce } from '../../../store/actions';
import TextInupt from '../../../components/Inputs/Text/index';
import TextArea from '../../../components/Inputs/TextArea';

import { validateStockUpdate } from '../../../utils';

export default function DceAmount({ show, close, data }) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [submited, setSubmited] = useState(false);
  const [decrease, setDecrease] = useState(true);
  const [count, setConut] = useState(0);

  useEffect(() => {
    setConut(0);
    setName(data?.name);
    setAmount(data?.amount);
  }, [data]);

  const handleRadio = (e) => setDecrease(e.target.id === 'decrease' ? true : false);
  const handleChange = (e) => setConut(e.target.value);

  const Submit = async () => {
    setSubmited(true);
    await dispatch(toggleLoader());
    let { payload } = await dispatch(updateStockAmountForDce({ id: data._id, amount: count, decrease }));
    payload ? dispatch(showSuccessAlert('Request sent to admin')) : dispatch(showErrorAlert('Something went wrong, please try again'));
    await dispatch(toggleLoader());
    hide();
  };

  const hide = () => (setConut(0), setAmount(0), setDecrease(true), setName(''), close());

  return (
    <Modal isOpen={show} toggle={close} size="md">
      <div className="modal-header">
        <h5 className="modal-title mt-0">Update Stock Amount</h5>
        <button type="button" onClick={hide} className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <p>
          Enter the Value you want to increase or decrease from <strong>{name}</strong>
        </p>
        <div style={{ display: 'flex' }}>
          <div className="form-check" style={{ flexGrow: 1 }}>
            <input className="form-check-input" type="radio" name="srb" id="decrease" value={decrease} onClick={handleRadio} defaultChecked />
            <label className="form-check-label">decrease</label>
          </div>
          <div className="form-check mb-3" style={{ flexGrow: 5 }}>
            <input className="form-check-input" type="radio" name="srb" id="increase" value={!decrease} onClick={handleRadio} />
            <label className="form-check-label">increase</label>
          </div>
        </div>
        {/*  */}
        <div style={{ width: '100%' }}>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <Button color="primary" onClick={() => setConut((prevState) => (prevState === 0 ? prevState : prevState - 1))}>
                -
              </Button>
            </InputGroupAddon>
            <Input type="text" value={count} name="demo_vertical" onChange={handleChange} style={{ textAlign: 'center' }} />
            <InputGroupAddon addonType="append">
              <Button color="primary" onClick={() => setConut((prevState) => (prevState === amount ? prevState : prevState + 1))}>
                +
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" onClick={hide} className="btn btn-secondary" data-dismiss="modal">
          Close
        </button>
        <button type="button" className="btn btn-primary" disabled={count === 0} onClick={() => (count ? Submit() : {})}>
          Save changes
        </button>
      </div>
    </Modal>
  );
}
