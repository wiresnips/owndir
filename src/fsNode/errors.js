const status = {
  badRequest: 400,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  serverError: 500
}

const FsnErrorProto = {
  respond: function (res) {
    return res.status(this.status).json(this)
  }
}

function fsnErr (error, statusCode) {
  // slide any existing FsnError through
  if (FsnErrorProto.isPrototypeOf(error)) {
    error.status = statusCode || error.status
    return error;
  }

  console.error("FsNode error:" error);

  const errObj = {
    success: false,
    status: statusCode || status.serverError,
    error: error || true
  }
  Object.setPrototypeOf(errObj, FsnErrorProto)

  return errObj;
  // return Promise.reject(errObj)
}

module.exports = {
  status,
  fsnErr
}