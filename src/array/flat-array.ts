import type { Equal } from "../utils";
import type { Add, MaxOr } from "../math";
import type { GetDepth } from "./get-depth";

type _GetSub<Arr> =
  Arr extends (infer V)[]
    ? V
    : Arr;

type _FlatArray<Arr, N extends number, Count extends number = 0> =
  Equal<N, Count> extends true
    ? Arr
    : _FlatArray<_GetSub<Arr>, N, Add<Count, 1>>;

export type FlatArray<Arr extends unknown[], N extends number> = _FlatArray<Arr, MaxOr<GetDepth<Arr>, N>>;
