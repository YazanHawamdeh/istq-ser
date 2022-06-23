const { Errors } = require('../../constants/Errors');
const { StatusLogs } = require('../../models/status.model');

exports.listStatusLogs = async (req, res) => {
  try {
    let data = await StatusLogs.find({ requestId: req.params.id }).sort({ createdAt: -1 }).populate('requestId createdBy');
    return res.send({ isSuccess: true, status: 200, data });
  } catch (err) {
    return res.send({ isSuccess: false, status: 500, error: Errors.SERVER_ERROR });
  }
};
