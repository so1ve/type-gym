import type { Add } from "../../dist";
import type { Equal } from ".";

export type Generate<Start extends number, End extends number> = Equal<Start, End> extends true ? Start : Start | Generate<Add<Start, 1>, End>;
