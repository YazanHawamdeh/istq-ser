const { Errors } = require('../../constants/Errors');
const { Order } = require('../../models/orders.model');
const { StatusLogs } = require('../../models/status.model');
const { requestStatus } = require('../../constants');
const { sendEmailForAccountant } = require('../../services/SendEmail');

exports.updateStatus = async (req, res) => {
  try {
    req.body.workDate
      ? await Order.updateOne(
          { _id: req.body.requestId },
          { status: req.body.nextStatus, statusComment: req.body.comment, _workDate: req.body.workDate, workDate: req.body.workDate, ...req.body }
        )
      : await Order.updateOne({ _id: req.body.requestId }, { status: req.body.nextStatus, statusComment: req.body.comment });

    let status = new StatusLogs({
      prevStatus: req.body.prevStatus,
      nextStatus: req.body.nextStatus,
      requestId: req.body.requestId,
      comment: req.body.comment,
      createdBy: req.identity._id,
    });

    await status.save();

    if (req.body.nextStatus == requestStatus.AWAITING_FOR_ACCOUNTING) await sendEmailForAccountant(req.body.comment);

    let data = await Order.findById(req.body.requestId).populate('rack iloSwitch netWrokSwitch ram');

    return res.send({ isSuccess: true, status: 200, data });
  } catch (err) {
    return res.send({ isSuccess: false, status: 500, error: Errors.SERVER_ERROR });
  }
};
