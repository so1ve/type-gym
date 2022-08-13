import type { Equal, Expect } from "@type-challenges/utils";

import type { AllKeys } from "./all-keys";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Cases = [
  Expect<Equal<AllKeys<{
    a: number
  }>, ["a"]>>,
  Expect<Equal<AllKeys<"">, []>>,
  Expect<Equal<AllKeys<[]>, ["length"]>>,
  Expect<Equal<AllKeys<[1, 2, 3]>, ["length"] | [number] | ["0"] | ["1"] | ["2"]>>,
  Expect<Equal<AllKeys<{
    a: number
    b: {
      c: string
    }
  }>, ["a"] | ["b", "c"]>>,
  Expect<Equal<AllKeys<{}>, never>>,
];
