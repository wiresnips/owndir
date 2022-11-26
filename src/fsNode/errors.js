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

  console.error(error);

  const errObj = Object.create(FsnErrorProto)
  Object.assign(errObj, {
    success: false,
    status: statusCode || status.serverError,
    error: error || true
  })

  return Promise.resolve(errObj)
}

module.exports = {
  status,
  fsnErr
}