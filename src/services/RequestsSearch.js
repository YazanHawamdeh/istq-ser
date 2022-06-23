const { requestStatus } = require('../constants/RequestStatus');

const handleQuery = (data, done) => {
  let query = { deletedAt: { $eq: null } };

  if (data.type) query.type = { $eq: data.type };
  if (data.serverTag) query.serverTag = { $regex: data.serverTag, $options: 'i' };
  if (data.serverIp) query.serverIp = { $regex: data.serverIp, $options: 'i' };
  if (data.dataCenterName) query.dataCenterName = { $regex: data.dataCenterName, $options: 'i' };
  if (data.status) query.status = { $eq: data.status };
  if (data.required) query.required = { $regex: data.required, $options: 'i' };
  if (data.comment) query.comment = { $regex: data.comment, $options: 'i' };
  if (data.customerName) query.customerName = { $regex: data.customerName, $options: 'i' };

  if (data.orderDateFrom || data.orderDateTo) {
    if (data.orderDateFrom) query._orderDate = { $gte: new Date(data.orderDateFrom).toISOString() };
    if (data.orderDateTo) query._orderDate = { $lte: new Date(data.orderDateTo).toISOString() };
    if (data.orderDateFrom && data.orderDateTo)
      query._orderDate = { $gte: new Date(data.orderDateFrom).toISOString(), $lte: new Date(data.orderDateTo).toISOString() };
  }

  if (data.estimationDateFrom || data.estimationDateTo) {
    if (data.estimationDateFrom) query._estimationDate = { $gte: new Date(data.estimationDateFrom).toISOString() };
    if (data.estimationDateTo) query._estimationDate = { $lte: new Date(data.estimationDateTo).toISOString() };
    if (data.estimationDateFrom && data.estimationDateTo)
      query._estimationDate = { $gte: new Date(data.estimationDateFrom).toISOString(), $lte: new Date(data.estimationDateTo).toISOString() };
  }

  if (data.workDateFrom || data.workDateTo) {
    if (data.workDateFrom) query._workDate = { $gte: new Date(data.workDateFrom).toISOString() };
    if (data.workDateTo) query._workDate = { $lte: new Date(data.workDateTo).toISOString() };
    if (data.workDateFrom && data.workDateTo)
      query._workDate = { $gte: new Date(data.workDateFrom).toISOString(), $lte: new Date(data.workDateTo).toISOString() };
  }

  if (done) {
    query.status = requestStatus.DONE_WITH_COMMENT;
  } else {
    query.status = { $ne: requestStatus.DONE_WITH_COMMENT };
  }
  return query;
};

const handleSort = (data) => {
  let b = {};
  let a = JSON.parse(data);
  if (a['estimationDate']) {
    b._estimationDate = a['estimationDate'];
  } else if (a['orderDate']) {
    b._orderDate = a['orderDate'];
  } else if (a['workDate']) {
    b._workDate = a['workDate'];
  } else {
    b = a;
  }
  return b;
};

exports.requestsSearch = (req, done) => {
  let { docs, page, sort, filters } = req.query;

  let query = handleQuery(filters ? JSON.parse(filters) : {}, done);

  let limit = parseInt(docs) || 10;

  let skip = (parseInt(page) - 1) * docs || 0;

  return { limit, skip, query, sort: handleSort(sort) };
};
