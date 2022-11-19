const status = {
  badRequest: 400,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  serverError: 500
}

function fsnErr (error, statusCode) {
  return Promise.resolve({
    success: false,
    status: statusCode || status.serverError,
    error: error || true
  })
}

module.exports = {
  status,
  fsnErr
}