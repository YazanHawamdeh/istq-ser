import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { requestTypes, statuses, AdminsRole } from '../../../utils';

// #EFF2F7
export default function List({
  index,
  show,
  item,
  setShowDetails,
  toggleUpdateModal,
  toggleStatusModal,
  toggleDeleteModal,
  toggleAccStatusModal,
  toggleDceStatusModal,
}) {
  const [showLogs, setShowLogs] = useState(true);
  const [role, setRole] = useState(0);

  useEffect(() => {
    let authUser = localStorage.getItem('authUser');
    let role = JSON.parse(authUser).role;
    setRole(role);
    if (role === AdminsRole.DCE || role === AdminsRole.Accountant) setShowLogs(false);
  }, []);

  return (
    <React.Fragment>
      <tr className={`${index % 2 === 0 ? 'table-light' : ''}`}>
        <td>
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFlushOne" style={{ display: 'flex' }}>
                {!show.includes(index) ? (
                  <i className="bx bxs-right-arrow" type="solid" onClick={() => setShowDetails(index)} style={{ cursor: 'pointer' }}></i>
                ) : null}
                {show.includes(index) ? (
                  <i className="bx bxs-up-arrow" onClick={() => setShowDetails(index)} style={{ cursor: 'pointer' }}></i>
                ) : null}
              </h2>
            </div>
          </div>
        </td>
        {/* <td onClick={() => setShowDetails(index)}>{requestTypes[item.type]}</td> */}
        <td onClick={() => setShowDetails(index)}>{item.serverIp || '-'}</td>
        {/* {role == AdminsRole.DCE ? (
          <td onClick={() => setShowDetails(index)}>{moment(item.workDate).format('MM/DD/YYYY')}</td>
        ) : (
          <td onClick={() => setShowDetails(index)}>{moment(item.orderDate).format('MM/DD/YYYY')}</td>
        )} */}

        {/* <td onClick={() => setShowDetails(index)}>{moment(item.estimationDate).format('MM/DD/YYYY h:mm a')}</td> */}
        <td onClick={() => setShowDetails(index)}>{statuses[item.status] || '-'}</td>
        <td onClick={() => setShowDetails(index)}>{item.serverTag || '-'}</td>
        {/* {role !== AdminsRole.DCE ? <td onClick={() => setShowDetails(index)}>{item.customerName || '-'}</td> : null} */}

        <td>
          <UncontrolledDropdown style={{ cursor: 'pointer' }}>
            <DropdownToggle href="#" className="card-drop" tag="i">
              <i className="mdi mdi-dots-horizontal font-size-18" />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              {role === AdminsRole.Admin ? (
                <DropdownItem href="#" onClick={() => toggleUpdateModal(item)}>
                  <i className="mdi mdi-pencil font-size-16 text-success me-1" /> Edit
                </DropdownItem>
              ) : null}

              {role === AdminsRole.Admin ? (
                <DropdownItem href="#" onClick={() => toggleStatusModal(item)}>
                  <i className="mdi mdi-debug-step-over font-size-16 text-success me-1" /> Status
                </DropdownItem>
              ) : null}

              {role === AdminsRole.DCE ? (
                <DropdownItem href="#" onClick={() => toggleDceStatusModal(item)}>
                  <i className="mdi mdi-debug-step-over font-size-16 text-success me-1" /> Status
                </DropdownItem>
              ) : null}

              {role === AdminsRole.Admin ? (
                <DropdownItem href={`requests/status-logs/${item._id}`} target="_blank">
                  <i className="mdi mdi-clipboard-list-outline font-size-16 text-success me-1" /> Logs
                </DropdownItem>
              ) : null}

              {role === AdminsRole.Admin ? (
                <DropdownItem href="#" onClick={() => toggleDeleteModal(item._id)}>
                  <i className="mdi mdi-trash-can font-size-16 text-danger me-1" /> Delete
                </DropdownItem>
              ) : null}

              {role === AdminsRole.Accountant ? (
                <DropdownItem href="#" onClick={() => toggleAccStatusModal(item)}>
                  <i className="mdi mdi-bookmark-check-outline font-size-16 text-success me-1" /> Done
                </DropdownItem>
              ) : null}
            </DropdownMenu>
          </UncontrolledDropdown>
        </td>
      </tr>
      {show.includes(index) ? (
        <tr className={`${index % 2 === 0 ? 'table-light' : ''}`}>
          <td colSpan="9">
            <table className="table mb-0">
              <thead>
                <tr className={`${index % 2 === 0 ? 'table-light' : ''}`}></tr>
              </thead>
              <tbody>
                <tr className={`${index % 2 === 0 ? 'table-light' : ''}`}>
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <div style={{ minWidth: '25%', border: '1px solid', flexGrow: 1, padding: '4px 8px' }}>
                      <strong>Date Center Name:</strong> {item.dataCenterName}
                    </div>
                    {role !== AdminsRole.DCE ? (
                      <div style={{ minWidth: '25%', border: '1px solid', flexGrow: 1, padding: '4px 8px' }}>
                        <strong>Customer Name:</strong> {item.customerName}
                      </div>
                    ) : null}

                    {/* <div style={{ minWidth: '25%', border: '1px solid', flexGrow: 1, padding: '4px 8px' }}>
                      <strong>Required:</strong> {item.required}
                    </div> */}
                    <div style={{ minWidth: '25%', border: '1px solid', flexGrow: 1, padding: '4px 8px' }}>
                      <strong>Comment:</strong> {item.comment}
                    </div>
                    <div style={{ minWidth: '25%', border: '1px solid', flexGrow: 1, padding: '4px 8px' }}>
                      <strong>Ilo Ip:</strong> {item.iloIp}
                    </div>
                    <div style={{ minWidth: '25%', border: '1px solid', flexGrow: 1, padding: '4px 8px' }}>
                      <strong>Ilo Switch Port:</strong>{' '}
                      {item.iloSwitchPort?.map((item) => (
                        <span> {item},</span>
                      ))}
                    </div>
                    <div style={{ minWidth: '25%', border: '1px solid', flexGrow: 1, padding: '4px 8px' }}>
                      <strong>Ilo Switch:</strong> {item.iloSwitch?.label}
                    </div>
                    <div style={{ minWidth: '25%', border: '1px solid', flexGrow: 1, padding: '4px 8px' }}>
                      <strong>NetWrok Switch:</strong>{' '}
                      {item.netWrokSwitch?.map((item) => (
                        <span> {item?.label},</span>
                      ))}
                    </div>
                    <div style={{ minWidth: '25%', border: '1px solid', flexGrow: 1, padding: '4px 8px' }}>
                      <strong>Network Switch Port:</strong>{' '}
                      {item.networkSwitchPort?.map((item) => (
                        <span> {item},</span>
                      ))}
                    </div>
                    <div style={{ minWidth: '25%', border: '1px solid', flexGrow: 1, padding: '4px 8px' }}>
                      <strong> Rack:</strong> {item.rack?.label}
                    </div>
                    <div style={{ minWidth: '25%', border: '1px solid', flexGrow: 1, padding: '4px 8px' }}>
                      <strong> Ram:</strong> {item.ram?.label}
                    </div>
                    <div style={{ minWidth: '25%', border: '1px solid', flexGrow: 1, padding: '4px 8px' }}>
                      <strong>Units:</strong>
                      {item.units?.map((item) => (
                        <span> {item},</span>
                      ))}
                    </div>
                    {/* {role == AdminsRole.DCE ? (
                      <div style={{ minWidth: '25%', border: '1px solid', flexGrow: 1, padding: '4px 8px' }}>
                        <strong>Order Date:</strong> {moment(item.orderDate).format('MM/DD/YYYY')}
                      </div>
                    ) : (
                      <div style={{ minWidth: '25%', border: '1px solid', flexGrow: 1, padding: '4px 8px' }}>
                        <strong>Work Date:</strong> {moment(item.workDate).format('MM/DD/YYYY')}
                      </div>
                    )} */}
                  </div>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      ) : null}
    </React.Fragment>
  );
}
