import {validationResult} from 'express-validator/check';

export class Util {

  /**
   * Handle successful data send to client if it is present or send 404
   * @param res
   * @returns {(data) => any}
   */
  public static handleData =
    res =>
      data =>
        data ? res.status(200).send(data) : res.status(404).send('Not found')

  /**
   * Handle validation and execute provided callback afterwards
   * @param req
   * @param res
   * @param callback
   * @returns {any}
   */
  public static handleValidation =
    (req, res, callback) => {
      Util.validateRequest(req, res);
      return callback();
    }

  /**
   * Handle update conflict and send error message
   * @param res
   * @param message
   */
  public static handleConflict(res, message) {
    res.status(409).json({errors: {latest: {msg: message}}});
  }

  /**
   * Validate request for errors and send client error if there are any
   * @param req
   * @param res
   */
  private static validateRequest(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({errors: errors.mapped()});
    }
  }
}
