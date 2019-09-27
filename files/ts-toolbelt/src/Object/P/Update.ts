import {Compute} from '../../Any/Compute'
import {IterationOf} from '../../Iteration/IterationOf'
import {Iteration} from '../../Iteration/Iteration'
import {Pos} from '../../Iteration/Pos'
import {Next} from '../../Iteration/Next'
import {Path as PPath} from './_Internal'
import {Index} from '../../Any/Index'
import {EndOf} from '../../Tuple/EndOf'
import {Tuple} from '../../Tuple/Tuple'

type _Update<O extends object, Path extends Tuple<Index>, A, I extends Iteration = IterationOf<'0'>> = {
  [K in keyof O]: Compute<
                  K extends Path[Pos<I>]                   // If K is part of Path
                  ? Pos<I> extends EndOf<Path>             // & if it's the target
                    ? A // update it                       // Update - target
                    : _Update<O[K] & {}, Path, A, Next<I>> // Or continue diving
                  : O[K]> // don't update                  // Not part of path - x
}

/** Update in **`O`** the fields at **`Path`** with **`A`**
 * (⚠️ this type is expensive)
 * @param O to update
 * @param Path to be followed
 * @param A to update with
 * @returns **`object`**
 * @example
 * ```ts
 * ```
 */
export type Update<O extends object, Path extends PPath, A extends any> =
    _Update<O, Path, A>
