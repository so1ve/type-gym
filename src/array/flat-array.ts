import type { Equal } from "../utils";
import type { MathAdd, MathMaxOr } from "../math";
import type { ArrayGetDepth } from "./get-depth";

type _ArrayGetSub<Arr> =
  Arr extends (infer V)[]
    ? V
    : Arr;

type _ArrayFlatArray<Arr, N extends number, Count extends number = 0> =
  Equal<N, Count> extends true
    ? Arr
    : _ArrayFlatArray<_ArrayGetSub<Arr>, N, MathAdd<Count, 1>>;

export type ArrayFlatArray<Arr extends unknown[], N extends number> = _ArrayFlatArray<Arr, MathMaxOr<ArrayGetDepth<Arr>, N>>;
