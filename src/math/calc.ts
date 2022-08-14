import type { StringToNumber } from "../convert";
import type { ToTuple } from "../utils/to-tuple";
import type { Limit } from "../_cast";
import type { IsEqual, IsGreaterThanOrEqual, IsPositive } from "./comparations";
import type { StringNumber } from "./definitions";

type _StringAbsolute<T> = T extends StringNumber ? T extends `-${infer V extends number}` ? V : StringToNumber<T> : never;
export type Absolute<T extends Limit> = _StringAbsolute<`${T}`>;

type _StringToNegative<T> = T extends StringNumber ? T extends `-${infer V extends number}` ? V : StringToNumber<`-${T}`> : never;
export type ToOpposite<T extends Limit> = T extends 0 ? 0 : _StringToNegative<`${T}`>;

/**
 * P - Positive
 * N - Negative
 */
type _AddPP<N1 extends number, N2 extends number> = [...ToTuple<N1>, ...ToTuple<N2>] extends { length: infer V extends number } ? V : never;
type _AddNN<N1 extends number, N2 extends number> = StringToNumber<`-${_AddPP<Absolute<N1>, Absolute<N2>>}`>;
type _AddNP<N1 extends number, N2 extends number> =
  IsEqual<Absolute<N1>, N2> extends true
    ? 0
    : ToTuple<Absolute<N1>> extends [...ToTuple<N2>, ...infer Rest]
      ? StringToNumber<`-${Rest["length"]}`>
      : ToTuple<N2> extends [...ToTuple<Absolute<N1>>, ...infer Rest]
        ? Rest["length"]
        : never;
type _AddPN<N1 extends number, N2 extends number> = _AddNP<N2, N1>;
export type Add<N1 extends number, N2 extends number> =
  IsPositive<N1> extends true
    ? IsPositive<N2> extends true
      ? _AddPP<N1, N2>
      : _AddPN<N1, N2>
    : IsPositive<N2> extends true
      ? _AddNP<N1, N2>
      : _AddNN<N1, N2>;

export type Sub<N1 extends number, N2 extends number> = Add<N1, ToOpposite<N2>>;

type _TimePP<N1 extends number, N2 extends number, Count extends number = 0, Sum extends number = 0> =
  Count extends N2
    ? Sum
    : _TimePP<N1, N2, Add<Count, 1>, Add<Sum, N1>>;
type _TimeNN<N1 extends number, N2 extends number> = _TimePP<Absolute<N1>, Absolute<N2>>;
type _TimeNP<N1 extends number, N2 extends number> = ToOpposite<_TimePP<Absolute<N1>, N2>>;
type _TimePN<N1 extends number, N2 extends number> = _TimeNP<N2, N1>;
export type Time<N1 extends number, N2 extends number> =
  IsPositive<N1> extends true
    ? IsPositive<N2> extends true
      ? _TimePP<N1, N2>
      : _TimePN<N1, N2>
    : IsPositive<N2> extends true
      ? _TimeNP<N1, N2>
      : _TimeNN<N1, N2>;

type _DivPP<N1 extends number, N2 extends number, Count extends number = 0, Remain extends number = N1> =
  IsGreaterThanOrEqual<Remain, N2> extends true
    ? _DivPP<N1, N2, Add<Count, 1>, Sub<Remain, N2>>
    : Count;
type _DivNN<N1 extends number, N2 extends number> = _DivPP<Absolute<N1>, Absolute<N2>>;
type _DivNP<N1 extends number, N2 extends number> = ToOpposite<_DivPP<Absolute<N1>, N2>>;
type _DivPN<N1 extends number, N2 extends number> = _DivNP<N2, N1>;
export type Div<N1 extends number, N2 extends number> =
  IsPositive<N1> extends true
    ? IsPositive<N2> extends true
      ? _DivPP<N1, N2>
      : _DivPN<N1, N2>
    : IsPositive<N2> extends true
      ? _DivNP<N1, N2>
      : _DivNN<N1, N2>;

export type Mod<N1 extends number, N2 extends number> = Sub<N1, Time<Div<N1, N2>, N2>>;
