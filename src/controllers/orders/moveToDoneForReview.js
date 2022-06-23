const { Errors } = require('../../constants/Errors');
const { Order } = require('../../models/orders.model');
const { StatusLogs } = require('../../models/status.model');
const { requestStatus } = require('../../constants');

exports.moveToDoneForReview = async (req, res, next) => {
  try {
    let _order = await Order.findById(req.params.id);

    _order.iloIp = req.body.iloIp;
    _order.iloSwitch = req.body.iloSwitch;
    _order.iloSwitchPort = req.body.iloSwitchPort;
    _order.netWrokSwitch = req.body.netWrokSwitch;
    _order.networkSwitchPort = req.body.networkSwitchPort;
    _order.rack = req.body.rack;
    _order.serverTag = req.body.serverTag;
    _order.units = req.body.units;
    _order.workDate = req.body.workDate;
    _order.status = requestStatus.DONE_FOR_REVIEW;

    await _order.save();

    let sts = new StatusLogs({
      prevStatus: requestStatus.SCHEDULED,
      nextStatus: requestStatus.DONE_FOR_REVIEW,
      requestId: req.params.id,
      comment: req.body.comment,
      createdBy: req.identity._id,
    });

    await sts.save();

    return res.send({ isSuccess: true, status: 200, data: req.params.id });
  } catch (err) {
    return res.send({ isSuccess: false, status: 500, error: Errors.SERVER_ERROR });
  }
};
