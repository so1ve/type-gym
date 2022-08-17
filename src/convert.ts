export type ConvertStringToNumber<T> = T extends `${infer V extends number}` ? V : never;
