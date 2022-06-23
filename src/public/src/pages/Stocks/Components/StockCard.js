import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';

import stockImg from '../../../assets/stock.jpeg';

import { AdminsRole } from '../../../utils';

export default function StockCard({ item, index, remove, toggleUpdateModal, role, toggleAmountModal }) {
  const [image, setImage] = useState(true);

  return (
    <Col xl="3" sm="4" key={'_col_' + index}>
      <Card>
        <CardBody>
          <div className="product-img position-relative">
            <img
              src={item.image}
              alt="error"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = stockImg;
              }}
              className="img-fluid mx-auto d-block"
            />
          </div>
          <div className="mt-4">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h5 className="mb-3 text-truncate">
                <span className="text-dark">{item.name} </span>
              </h5>
              <h5 className="my-0">
                <b>{item.amount}</b>
              </h5>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>{item.description}</div>
          </div>
          <div>
            {role !== AdminsRole.Admin ? (
              <Button color="primary" size="sm" onClick={() => toggleAmountModal(item)} style={{ width: '100%' }}>
                <i className="mdi mdi-pencil font-size-16  me-1" /> Edit
              </Button>
            ) : null}

            {role == AdminsRole.Admin ? (
              <Button color="primary" size="sm" onClick={() => toggleUpdateModal(item)} style={{ width: '100%', marginBottom: '4px' }}>
                <i className="mdi mdi-pencil font-size-16 me-1" /> Edit
              </Button>
            ) : null}

            {role == AdminsRole.Admin ? (
              <Button color="danger" size="sm" onClick={() => remove(item._id)} style={{ width: '100%' }}>
                <i className="mdi mdi-trash-can font-size-16 me-1" /> Delete
              </Button>
            ) : null}
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}
