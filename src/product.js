import { multiply } from './multiply'
import { reduce } from './reduce'

/**
 * Multiplies together all the elements of a list.
 *
 * @func
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The product of all the numbers in the list.
 * @see R.reduce
 * @example
 *
 *      R.product([2,4,6,8,100,1]); //=> 38400
 */
export const product = reduce(multiply, 1)