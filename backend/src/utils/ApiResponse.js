// utils/ApiResponse.js
export class ApiResponse {
  constructor(success, statusCode, message, data = {}) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
  send(res) {
    return res.status(this.statusCode).json({
      success: this.success,
      message: this.message,
      data: this.data,
    });
  }

  static success(res,message="success", data = {}, statusCode = 200) {
    return new ApiResponse(true, statusCode, message, data).send(res);
  }

  static error(res, message = "Error", statusCode = 500) {
    return new ApiResponse(false, statusCode, message).send(res);
  }
}
