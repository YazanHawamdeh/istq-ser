const { Errors } = require('../../constants/Errors');
const { Order } = require('../../models/orders.model');
const { StatusLogs } = require('../../models/status.model');

exports.create = async (req, res, next) => {
  try {
    let _order = new Order({ ...req.body, _orderDate: req.body.orderDate, _estimationDate: req.body.estimationDate, _workDate: req.body.workDate });

    let data = await _order.save();

    let status = new StatusLogs({ prevStatus: null, nextStatus: 1, requestId: _order._id, createdBy: req.identity._id });

    await status.save();

    let result = await Order.findById(data._id).populate('rack iloSwitch netWrokSwitch ram');

    return res.send({ isSuccess: true, status: 200, data: result });
  } catch (err) {
    return res.send({ isSuccess: false, status: 500, error: Errors.SERVER_ERROR });
  }
};
