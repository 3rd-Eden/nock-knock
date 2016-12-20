import Route from 'routable';

/**
 * Parameter based route validation for Nock.
 *
 * @param {String} path The path of the URL we need to validate.
 * @param {Object} validators Validators for each param of the path.
 * @returns {Function} Nock path validator.
 * @public
 */
export default function knock(path, validators = {}) {
  const route = new Route(path);

  /**
   * The actual path validation function.
   *
   * @returns {Boolean} Indication if we past the test.
   * @private
   */
  return function parser(url) {
    const params = route.exec(url);

    return Object.keys(params).every(function every(key) {
      if (!(key in validators)) return true;

      return validators[key](params[key]);
    });
  }
}
