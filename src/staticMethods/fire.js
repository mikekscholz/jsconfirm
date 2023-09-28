/**
 * Main method to create a new JsConfirm popup
 *
 * @param  {...JsConfirmOptions} args
 * @returns {Promise<JsConfirmResult>}
 */
export function fire(...args) {
  const Jsc = this // eslint-disable-line @typescript-eslint/no-this-alias
  return new Jsc(...args)
}
