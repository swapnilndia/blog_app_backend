class ApiError{
  constructor(
    status = 500,
    statusCode = "Internal server Error",
    message = "Something went wrong",
    error = {}
  ) {

    this.status = status;
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
  }
}


export default ApiError;
