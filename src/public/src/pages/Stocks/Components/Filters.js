import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, Button } from 'reactstrap';

import Nouislider from 'nouislider-react';
import 'nouislider/distribute/nouislider.css';

export default function Filters({ handleFilters, clearFilters, onChange, value }) {
  const [filters, setFilters] = useState({});

  useEffect(() => {
    onChange(filters);
  }, [filters]);

  const { max } = useSelector((state) => state.STOCK_STORE);
  return (
    <Card>
      <CardBody>
        <div className="mt-4 pt-3">
          <h5 className="font-size-14 mb-4">
            Amount: {value[0]} to {value[1]}
          </h5>
          {/* <br /> */}
          <Nouislider
            range={{ min: 0, max: max }}
            // tooltips={true}
            start={[0, max]}
            connect
            onSlide={(e) => setFilters({ ...filters, amuont: e })}
            step={1}
          />
        </div>
        <div className="mt-4 pt-3">
          <h5 className="font-size-14 mb-4">Text:</h5>
          <input
            className="form-control"
            type="text"
            placeholder="Enter text"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          />
        </div>
        <div className="mt-4 pt-3">
          <Button type="button" color="primary" className="font-16 btn-block btn btn-primary" onClick={handleFilters} style={{ width: '100%' }}>
            <i className="bx bx-search-alt me-1" />
            Search...
          </Button>
        </div>
        <div className="pt-3">
          <Button type="button" color="danger" className="font-16 btn-block btn btn-danger" onClick={clearFilters} style={{ width: '100%' }}>
            <i className="mdi-cancel me-1" />
            Clear{' '}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
