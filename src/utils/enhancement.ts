export type DeepPartial<T> = T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T;

export type DeepRequired<T> = T extends object ? { [K in keyof T]-?: DeepRequired<T[K]> } : T;

export type DeepReadonly<T> = T extends object ? { readonly [K in keyof T]: DeepReadonly<T[K]> } : T;

export type DeepWritable<T> = T extends object ? { -readonly [K in keyof T]: DeepWritable<T[K]> } : T;

export type DeepNonNullable<T> = T extends object ? { [K in keyof T]: NonNullable<DeepNonNullable<T[K]>> } : T;

export type Exclusive<T, U> = Exclude<T | U, T & U>;
