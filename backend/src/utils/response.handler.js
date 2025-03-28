class ResponseHandler {
  constructor(statusCode, message = "", data = null, success = true) {
    this.statusCode = statusCode || 500;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400 && success;
  }

  static success(data, message = "Success") {
    return new ResponseHandler(200, message, data);
  }

  static notFoundError(message) {
    return new ResponseHandler(404, message, null, false);
  }

  static error(
    statusCode,
    message = "oops! something went wrong, please contact us.",
    err,
  ) {
    if (
      err.name == "MongoServerError" &&
      err.message.includes("E11000 duplicate key error")
    ) {
      message = "User with this email already exists";
    }
    return new ResponseHandler(statusCode, message, null, false);
  }
  send(res) {
    return res.status(this.statusCode).json(this);
  }
}
export default ResponseHandler;
