export type ToTuple<N extends number, Arr extends unknown[] = []> = Arr extends { length: N } ? Arr : ToTuple<N, [unknown, ...Arr]>;
