export type ObjectAllKeys<T, K extends keyof T = keyof T> = T extends object
  ? K extends unknown
    ? [K, ...ObjectAllKeys<T[K]>]
    : [K, ...ObjectAllKeys<T[K]>]
  : [];
