export default class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;

    switch (statusCode) {
      case 400:
        this.status = 'Bad Request, missing information.';
        break;
      case 401:
        this.status = 'Unauthorized, you must be logged in.';
        break;
      case 403:
        this.status = 'Unauthorized, you lack the required authorization.';
        break;
      case 404:
        this.status = 'Not Found, we could not locate the resource.';
        break;
      case statusCode.toString().startsWith('5'):
        this.status = 'Internal Server Error';
        break;
      default:
        this.status = 'Unexpected error.';
    }

    Error.captureStackTrace(this, this.constructor);
  }
}
