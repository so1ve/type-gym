import type { MathAdd } from "../math";
import type { IsAny } from "../utils";

type _ArrayGetDepth<Arr extends unknown[], Depth extends number = 1> =
  Arr extends (infer V extends unknown[])[]
    ? IsAny<V> extends true
      ? Depth
      : _ArrayGetDepth<V, MathAdd<Depth, 1>>
    : Depth;

export type ArrayGetDepth<Arr extends unknown[]> = _ArrayGetDepth<Arr>;
