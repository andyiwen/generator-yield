function notFound(req, res) {
  res.status(404).json({
    status: 'DOCUMENT NOT FOUND'
  })
}

function internalServerError(err, req, res, next) {
  res.status(500).json({
    status: 'INTERNAL SERVER ERROR',
    message: err.message,
    data: err.stack
  })
  next();
}

export default {
  notFound,
  internalServerError
}
