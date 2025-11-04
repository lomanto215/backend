const response = (res, result, status, message, pagination) => {
    const resultPrint = {}
    resultPrint.status = 'success'
    resultPrint.statusCode = status
    resultPrint.message = message || null
    resultPrint.pagination = pagination || {}
    res.status(status).json(resultPrint)
}

module.exports = {response}