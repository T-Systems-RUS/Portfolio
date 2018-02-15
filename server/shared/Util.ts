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
}
