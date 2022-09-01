type UnionToIntersection<T> =
  (T extends unknown
    ? (x: T) => unknown
    : never) extends (x: infer R) => unknown
    ? R
    : never;

type ConcatString<RootKey, Key> =
    RootKey extends string
      ? Key extends string
        ? `${RootKey}.${Key}`
        : never
      : never;

type DistributiveKeys<Root, RootKeys extends keyof Root = keyof Root> =
    RootKeys extends never
      ? never
      : Root[RootKeys] extends Record<string, unknown>
        ? TransformKey<DistributiveKeys<Root[RootKeys], keyof Root[RootKeys]>, RootKeys> & Root
        : Root;

type TransformKey<Object, RootKey> = {
  [Key in keyof Object as ConcatString<RootKey, Key>]: Object[Key]
};

type UnionKeys<Root> = UnionToIntersection<DistributiveKeys<Root>>;

export type ObjectGetKeys<Object> = keyof UnionKeys<Object>;

export type ObjectGet<Object, Keys extends keyof UnionKeys<Object>> = UnionKeys<Object>[Keys];
