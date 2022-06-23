function GeneralResponse() {
  this.isSuccess = false;
  this.status = 500;
  this.error = null;
  this.data = null;

  this.hasError = function () {
    return this.error ? true : false;
  };

  this.addError = function (code) {
    this.error = code;
  };

  this._ = function () {
    return this.hasError()
      ? { isSuccess: this.isSuccess, status: this.status, error: this.error }
      : { isSuccess: this.isSuccess, status: this.status, data: this.data };
  };
}

module.exports = { GeneralResponse };
