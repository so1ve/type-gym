import type { MathAdd } from "../math";
import type { Equal } from ".";

export type Generate<Start extends number, End extends number> = Equal<Start, End> extends true ? Start : Start | Generate<MathAdd<Start, 1>, End>;
