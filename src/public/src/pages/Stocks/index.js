import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Row, Col, Button } from 'reactstrap';

import { getListOfStock } from '../../store/actions';
import { AdminsRole } from '../../utils';

import CreateModal from './Components/Create';
import StockCard from './Components/StockCard';
import DeleteModal from './Components/Delete';
import Filters from './Components/Filters';
import UpdateModal from './Components/Update';
import DceAmount from './Components/DceAmount';
import Pagination from '../../components/Pagination/index';

export default function index() {
  const dispatch = useDispatch();
  const [state, setState] = useState({});
  const [filters, setFilters] = useState({ amuont: [] });
  const [page, setPage] = useState(1);
  const [docs, setDocs] = useState(12);
  const [role, setRole] = useState(0);

  const { list, total, max } = useSelector((state) => state.STOCK_STORE);

  useEffect(() => {
    dispatch(getListOfStock());
    let authUser = localStorage.getItem('authUser');
    let role = JSON.parse(authUser).role;
    setRole(role);
  }, []);

  const handlePages = (e) => {
    setPage(e);
    // dispatch(listRequests({ sort, page: e, docs, filters: myFilters }));
  };

  const toggleCreateModal = () => setState({ ...state, showCreateModal: !state.showCreateModal });

  const toggleDeleteModal = (e) => setState({ ...state, showDeleteModal: typeof e === 'string' ? e : null });

  const toggleUpdateModal = (e) => setState({ ...state, showUpdateModal: e?._id ? e : null });

  const toggleAmountModal = (e) => setState({ ...state, showAmountModal: e?._id ? e : null });

  const handleFilters = () => {
    dispatch(getListOfStock({ page: 1, docs, ...filters }));
  };
  const clearFilters = () => {
    window.location.reload(false);
  };

  const filtersChanged = (e) => setFilters({ ...filters, ...e });

  return (
    <React.Fragment>
      <div className="page-content" style={{ overflowY: 'auto' }}>
        <Container fluid>
          <Row className="mb-2">
            <Col sm="4"></Col>
            <Col sm="8">
              <div className="text-sm-end">
                {role === AdminsRole.Admin ? (
                  <Button type="button" color="primary" className="font-16 btn-block btn btn-primary" onClick={toggleCreateModal}>
                    <i className="mdi mdi-plus me-1" />
                    Add Stock
                  </Button>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xl={3}>
              <Filters
                handleFilters={handleFilters}
                clearFilters={clearFilters}
                onChange={filtersChanged}
                value={[Number(filters.amuont[0] || 0), Number(filters.amuont[1] || max)]}
              />
            </Col>
            <Col xl={9}>
              <Row>
                {list.map((item, i) => (
                  <StockCard
                    key={i}
                    item={item}
                    indes={i}
                    remove={toggleDeleteModal}
                    toggleUpdateModal={toggleUpdateModal}
                    role={role}
                    toggleAmountModal={toggleAmountModal}
                  />
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
        <CreateModal show={state.showCreateModal} close={toggleCreateModal} />
        <DeleteModal show={state.showDeleteModal ? true : false} close={toggleDeleteModal} id={state.showDeleteModal} />
        <UpdateModal show={state.showUpdateModal ? true : false} close={toggleUpdateModal} data={state.showUpdateModal} />
        <DceAmount show={state.showAmountModal ? true : false} close={toggleAmountModal} data={state.showAmountModal} />

        <Pagination total={total} page={page} perPage={docs} onChange={handlePages} />
      </div>
    </React.Fragment>
  );
}
