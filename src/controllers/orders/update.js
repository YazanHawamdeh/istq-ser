const { Errors } = require('../../constants/Errors');
const { Order } = require('../../models/orders.model');

exports.update = async (req, res) => {
  try {
    await Order.updateOne(
      { _id: req.params.id },
      { ...req.body, _orderDate: req.body.orderDate, _estimationDate: req.body.estimationDate, _workDate: req.body.workDate }
    );

    let data = await Order.findById(req.params.id).populate('rack iloSwitch netWrokSwitch ram');

    return res.send({ isSuccess: true, status: 200, data });
  } catch (err) {
    return res.send({ isSuccess: false, status: 500, error: Errors.SERVER_ERROR });
  }
};
