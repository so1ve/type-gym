import type { Equal, Expect } from "@type-challenges/utils";

import type { ToArray, ToArraySeperated } from "./to-array";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Cases = [
  Expect<Equal<ToArray<string>, string[]>>,
  Expect<Equal<ToArray<string[]>, string[]>>,

  Expect<Equal<ToArraySeperated<string>, string[]>>,
  Expect<Equal<ToArraySeperated<string | number>, string[] | number[]>>,
];
