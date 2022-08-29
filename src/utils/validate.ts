import type { Equal } from ".";

export type IfNotStringLiteral<K extends string> = Equal<K, string> extends true ? never : any;
