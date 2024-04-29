class ApiResponse {
  constructor(
    status = 200,
    statusCode = "success",
    message = "Request Successfully Processed",
    data = {},
    metadata = {}
  ) {
    this.status = status;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.metadata = metadata;
  }
}
export default ApiResponse;
