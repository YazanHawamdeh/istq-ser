const { Errors } = require('../../constants/Errors');

const { Order } = require('../../models/orders.model');

const { requestsSearch } = require('../../services/RequestsSearch');

exports.listDoneOrders = async (req, res) => {
  try {
    let { limit, skip, query, sort } = requestsSearch(req, true);

    let list = await Order.find(query).populate('rack iloSwitch netWrokSwitch ram').sort(sort).limit(limit).skip(skip);

    let total = await Order.countDocuments(query);

    return res.send({ isSuccess: true, status: 200, data: { list, total } });
  } catch (err) {
    return res.send({ isSuccess: false, status: 500, error: Errors.SERVER_ERROR });
  }
};
