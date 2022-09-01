export type ArrayGetLength<Arr extends any[]> = Arr extends { length: infer V extends number } ? V : never;
