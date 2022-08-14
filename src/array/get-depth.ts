import type { Add } from "../math";
import type { IsAny } from "../utils";

type _GetDepth<Arr extends unknown[], Depth extends number = 1> =
  Arr extends (infer V extends unknown[])[]
    ? IsAny<V> extends true
      ? Depth
      : _GetDepth<V, Add<Depth, 1>>
    : Depth;

export type GetDepth<Arr extends unknown[]> = _GetDepth<Arr>;
