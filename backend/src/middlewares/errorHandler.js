import ResponseHandler from "../utils/response.handler.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  return ResponseHandler.error(statusCode, err.message, err).send(res);
};
