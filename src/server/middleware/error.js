import errorHandler from 'errorhandler'
import app from '../server'

export default function () {
  var logger = app.get('logger') || console

  return app.get('env') === 'production' ?
    function (err, req, res, next) {
      var msg = err.stack
      if (err.mod) msg = '[' + err.mod + '] ' + msg
      logger.error(msg)

      if (err.status) res.statusCode = err.status
      if (res.statusCode < 400) res.statusCode = 500

      res.end()
    } : errorHandler()
}
