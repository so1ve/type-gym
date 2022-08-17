import type { Equal, Expect } from "@type-challenges/utils";

import type { ObjectAllKeys } from "./all-keys";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Cases = [
  Expect<Equal<ObjectAllKeys<{
    a: number
  }>, ["a"]>>,
  Expect<Equal<ObjectAllKeys<"">, []>>,
  Expect<Equal<ObjectAllKeys<[]>, ["length"]>>,
  Expect<Equal<ObjectAllKeys<[1, 2, 3]>, ["length"] | [number] | ["0"] | ["1"] | ["2"]>>,
  Expect<Equal<ObjectAllKeys<{
    a: number
    b: {
      c: string
    }
  }>, ["a"] | ["b", "c"]>>,
  Expect<Equal<ObjectAllKeys<{}>, never>>,
];
