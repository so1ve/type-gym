import type { ArrayGetLength } from "../array";
import type { ConvertStringToNumber } from "../convert";
import type { ToTuple } from "../utils/to-tuple";
import type { CastLimit } from "../_cast";
import type { MathIsEqual, MathIsGreaterThanOrEqual, MathIsPositive } from "./comparations";
import type { MathStringNumber } from "./definitions";

type _MathStringAbsolute<T> = T extends MathStringNumber ? T extends `-${infer V extends number}` ? V : ConvertStringToNumber<T> : never;
export type MathAbsolute<T extends CastLimit> = _MathStringAbsolute<`${T}`>;

type _MathStringToOpposite<T> = T extends MathStringNumber ? T extends `-${infer V extends number}` ? V : ConvertStringToNumber<`-${T}`> : never;
export type MathToOpposite<T extends CastLimit> = T extends 0 ? 0 : _MathStringToOpposite<`${T}`>;

/**
 * P - Positive
 * N - Negative
 */
type _MathAddPP<N1 extends number, N2 extends number> = ArrayGetLength<[...ToTuple<N1>, ...ToTuple<N2>]>;
type _MathAddNN<N1 extends number, N2 extends number> = ConvertStringToNumber<`-${_MathAddPP<MathAbsolute<N1>, MathAbsolute<N2>>}`>;
type _MathAddNP<N1 extends number, N2 extends number> =
  MathIsEqual<MathAbsolute<N1>, N2> extends true
    ? 0
    : ToTuple<MathAbsolute<N1>> extends [...ToTuple<N2>, ...infer Rest]
      ? ConvertStringToNumber<`-${Rest["length"]}`>
      : ToTuple<N2> extends [...ToTuple<MathAbsolute<N1>>, ...infer Rest]
        ? Rest["length"]
        : never;
type _MathAddPN<N1 extends number, N2 extends number> = _MathAddNP<N2, N1>;
export type MathAdd<N1 extends number, N2 extends number> =
  MathIsPositive<N1> extends true
    ? MathIsPositive<N2> extends true
      ? _MathAddPP<N1, N2>
      : _MathAddPN<N1, N2>
    : MathIsPositive<N2> extends true
      ? _MathAddNP<N1, N2>
      : _MathAddNN<N1, N2>;

export type MathSub<N1 extends number, N2 extends number> = MathAdd<N1, MathToOpposite<N2>>;

type _MathTimePP<N1 extends number, N2 extends number, Count extends number = 0, Sum extends number = 0> =
  Count extends N2
    ? Sum
    : _MathTimePP<N1, N2, MathAdd<Count, 1>, MathAdd<Sum, N1>>;
type _MathTimeNN<N1 extends number, N2 extends number> = _MathTimePP<MathAbsolute<N1>, MathAbsolute<N2>>;
type _MathTimeNP<N1 extends number, N2 extends number> = MathToOpposite<_MathTimePP<MathAbsolute<N1>, N2>>;
type _MathTimePN<N1 extends number, N2 extends number> = _MathTimeNP<N2, N1>;
export type MathTime<N1 extends number, N2 extends number> =
  MathIsPositive<N1> extends true
    ? MathIsPositive<N2> extends true
      ? _MathTimePP<N1, N2>
      : _MathTimePN<N1, N2>
    : MathIsPositive<N2> extends true
      ? _MathTimeNP<N1, N2>
      : _MathTimeNN<N1, N2>;

type _MathDivPP<N1 extends number, N2 extends number, Count extends number = 0, Remain extends number = N1> =
  MathIsGreaterThanOrEqual<Remain, N2> extends true
    ? _MathDivPP<N1, N2, MathAdd<Count, 1>, MathSub<Remain, N2>>
    : Count;
type _MathDivNN<N1 extends number, N2 extends number> = _MathDivPP<MathAbsolute<N1>, MathAbsolute<N2>>;
type _MathDivNP<N1 extends number, N2 extends number> = MathToOpposite<_MathDivPP<MathAbsolute<N1>, N2>>;
type _MathDivPN<N1 extends number, N2 extends number> = _MathDivNP<N2, N1>;
export type MathDiv<N1 extends number, N2 extends number> =
  MathIsPositive<N1> extends true
    ? MathIsPositive<N2> extends true
      ? _MathDivPP<N1, N2>
      : _MathDivPN<N1, N2>
    : MathIsPositive<N2> extends true
      ? _MathDivNP<N1, N2>
      : _MathDivNN<N1, N2>;

export type MathMod<N1 extends number, N2 extends number> = MathSub<N1, MathTime<MathDiv<N1, N2>, N2>>;
