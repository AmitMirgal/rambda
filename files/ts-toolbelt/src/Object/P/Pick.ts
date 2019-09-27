import {IterationOf} from '../../Iteration/IterationOf'
import {Iteration} from '../../Iteration/Iteration'
import {Pos} from '../../Iteration/Pos'
import {Next} from '../../Iteration/Next'
import {NonNullable} from '../../Union/NonNullable'
import {Path as PPath} from './_Internal'
import {Index} from '../../Any/Index'
import {Pick as OPick} from '../Pick'
import {EndOf} from '../../Tuple/EndOf'
import {Tuple} from '../../Tuple/Tuple'

type _Pick<O extends object, Path extends Tuple<Index>, I extends Iteration = IterationOf<'0'>> =
  OPick<O, Path[Pos<I>]> extends infer Picked                      // Pick the first Path
  ? {
      [K in keyof Picked]: NonNullable<Picked[K]> extends object   // > If it's an object
                          ? Pos<I> extends EndOf<Path>             // & If it's the target
                            ? Picked[K]                            // 1-1: Pick it
                            : _Pick<Picked[K] & {}, Path, Next<I>> // 1-0: Continue diving
                          : Picked[K]                              // 0: Pick property
    }
  : never

/** Extract out of **`O`** the fields at **`Path`**
 * (⚠️ this type is expensive)
 * @param O to extract from
 * @param Path to be followed
 * @returns **`object`**
 * @example
 * ```ts
 * ```
 */
export type Pick<O extends object, Path extends PPath> =
    _Pick<O, Path>
