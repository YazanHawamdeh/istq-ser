import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Card, CardBody, Row, Col, Button, Table, Collapse } from 'reactstrap';

import { listDoneRequests } from '../../store/actions';
import { AdminsRole } from '../../utils';

import Filters from './Components/Filters';
import CreateModal from './Components/Create';
import DeleteModal from './Components/Delete';
import UpdateModal from './Components/Update';
import StatusModal from './Components/Status';
import StatusAccountantModal from './Components/StatusAccountant';
import DceStatusModal from './Components/DceStatus';
import List from './Components/List';
import Pagination from '../../components/Pagination/index';

export default function index() {
  const dispatch = useDispatch();
  const [state, setState] = useState({});
  const [page, setPage] = useState(1);
  const [docs, setDocs] = useState(10);
  const [showDetails, setShowDetails] = useState([]);
  const [sort, setSort] = useState({ createdAt: -1 });
  const [myFilters, setMyFilters] = useState({});
  const [role, setRole] = useState(0);

  const { doneList, doneTotal } = useSelector((state) => state.ORDERS_STORE);

  useEffect(() => {
    dispatch(listDoneRequests());

    let authUser = localStorage.getItem('authUser');
    let role = JSON.parse(authUser).role;
    setRole(role);
  }, []);

  useEffect(() => {
    dispatch(listDoneRequests({ sort, page: 1, docs }));
  }, [sort]);

  const handlePages = (e) => {
    setPage(e);
    dispatch(listDoneRequests({ sort, page: e, docs, filters: myFilters }));
  };

  const toggleCreateModal = () => setState({ ...state, showCreateModal: !state.showCreateModal });

  const toggleDeleteModal = (e) => setState({ ...state, showDeleteModal: e ? e : null });

  const toggleUpdateModal = (e) => setState({ ...state, showUpdateModal: e?._id ? e : null });

  const toggleStatusModal = (e) => setState({ ...state, showStatusModal: e?._id ? e : null });

  const toggleAccStatusModal = (e) => setState({ ...state, showAccStatusModal: e?._id ? e : null });

  const toggleDceStatusModal = (e) => setState({ ...state, showDceStatusModal: e?._id ? e : null });

  const handleSort = (e) => (sort[e] ? (sort[e] === 1 ? setSort({ [e]: -1 }) : setSort({ [e]: 1 })) : setSort({ [e]: -1 }));

  const handleFilters = (e) => {
    setMyFilters(e);
    dispatch(listDoneRequests({ sort, page: 1, docs, filters: e }));
  };

  const handleShow = (e) =>
    showDetails.includes(e) ? setShowDetails((prev) => prev.filter((i) => i !== e)) : setShowDetails((prev) => [...prev, e]);

  return (
    <React.Fragment>
      <div className="page-content" style={{ overflowY: 'auto' }}>
        <Container fluid style={{ height: '100%' }}>
          <Row className="mb-2">
            <Col sm="4"></Col>
            <Col sm="8">
              <div className="text-sm-end">
                {role === AdminsRole.Admin ? (
                  <Button type="button" color="primary" className="font-16 btn-block btn btn-primary" onClick={toggleCreateModal}>
                    <i className="mdi mdi-plus me-1" />
                    Add Order
                  </Button>
                ) : null}
              </div>
            </Col>
          </Row>
          <Filters submit={handleFilters} />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <div className="table-responsive" style={{ height: '500px' }}>
                    <Table className="table table-bordered mb-0">
                      <thead>
                        <tr>
                          <th></th>
                        
                          <th style={{ cursor: 'pointer' }} onClick={() => handleSort('ip')}>
                            <i className="bx bx-sort"> </i> Server IP
                          </th>
                          {/* {role == AdminsRole.DCE ? (
                            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('workDate')}>
                              <i className="bx bx-sort"> </i> Work Date
                            </th>
                          ) : (
                            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('orderDate')}>
                              <i className="bx bx-sort"> </i> Order Date
                            </th>
                          )} */}

                          {/* <th style={{ cursor: 'pointer' }} onClick={() => handleSort('estimationDate')}>
                            <i className="bx bx-sort"> </i>Estimation Date
                          </th> */}
                          <th style={{ cursor: 'pointer' }} onClick={() => handleSort('rackAndUnit')}>
                            <i className="bx bx-sort"> </i> Status
                          </th>
                          <th style={{ cursor: 'pointer' }} onClick={() => handleSort('tags')}>
                            <i className="bx bx-sort"> </i> Server Tag
                          </th>
                          {/* {role !== AdminsRole.DCE ? (
                            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('customerName')}>
                              <i className="bx bx-sort"> </i> Customer Name
                            </th>
                          ) : null} */}
                          <th>Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {doneList &&
                          doneList.map((item, i) => (
                            <List
                              item={item}
                              key={i}
                              show={showDetails}
                              setShowDetails={handleShow}
                              index={i}
                              toggleUpdateModal={toggleUpdateModal}
                              toggleStatusModal={toggleStatusModal}
                              toggleDeleteModal={toggleDeleteModal}
                              toggleDceStatusModal={toggleDceStatusModal}
                              toggleAccStatusModal={toggleAccStatusModal}
                            />
                          ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Pagination total={doneTotal} page={page} perPage={docs} onChange={handlePages} />
        </Container>
        <CreateModal show={state.showCreateModal} close={toggleCreateModal} />
        <DeleteModal show={state.showDeleteModal ? true : false} close={toggleDeleteModal} id={state.showDeleteModal} />
        <UpdateModal show={state.showUpdateModal ? true : false} close={toggleUpdateModal} data={state.showUpdateModal} />
        <StatusModal show={state.showStatusModal ? true : false} close={toggleStatusModal} data={state.showStatusModal} />
        <StatusAccountantModal show={state.showAccStatusModal ? true : false} close={toggleAccStatusModal} data={state.showAccStatusModal} />
        <DceStatusModal show={state.showDceStatusModal ? true : false} close={toggleDceStatusModal} data={state.showDceStatusModal} />
      </div>
    </React.Fragment>
  );
}
