const { Errors } = require('../../constants/Errors');

const { Order } = require('../../models/orders.model');

const { requestsSearch } = require('../../services/RequestsSearch');

const { adminRoles } = require('../../constants/DB-Enums');

const { requestStatus } = require('../../constants/RequestStatus');

exports.list = async (req, res) => {
  try {
    let { limit, skip, query, sort } = requestsSearch(req);

    if (req.identity.role == adminRoles.DCE) query.status = requestStatus.SCHEDULED;

    if (req.identity.role == adminRoles.ACCOUNTANT) query.status = requestStatus.AWAITING_FOR_ACCOUNTING;

    let list = await Order.find(query).populate('rack iloSwitch netWrokSwitch ram').sort(sort).limit(limit).skip(skip);

    let total = await Order.countDocuments(query);

    return res.send({ isSuccess: true, status: 200, data: { list, total } });
  } catch (err) {
    return res.send({ isSuccess: false, status: 500, error: Errors.SERVER_ERROR });
  }
};
