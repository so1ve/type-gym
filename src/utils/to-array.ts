export type ToArray<T> = T extends unknown[] ? T : T[];

export type ToArraySeperated<T> = T extends unknown ? T[] : T[];
