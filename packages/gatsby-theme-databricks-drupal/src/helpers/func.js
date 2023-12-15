/**
 * Compose
 *
 * Performs right-to-left function composition. The last argument may have any
 *   arity; the remaining arguments must be unary.
 *
 * Example:
 *   compose(sum, plus)(args) == sum(plus(args))
 *
 * Reference: https://ramdajs.com/docs/#compose
 */
export const compose = (...fns) =>
  fns.reduce(
    (f, g) =>
      (...args) =>
        f(g(...args))
  )

export default {}
