export type StringToNumber<T> = T extends `${infer V extends number}` ? V : never;
