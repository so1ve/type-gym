export type AllKeys<T, K extends keyof T = keyof T> = T extends object
  ? K extends unknown
    ? [K, ...AllKeys<T[K]>]
    : [K, ...AllKeys<T[K]>]
  : [];
