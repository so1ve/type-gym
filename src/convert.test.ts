import type { Equal, Expect } from "@type-challenges/utils";

import type { StringToNumber } from "./convert";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Cases = [
  Expect<Equal<StringToNumber<"1">, 1>>,
  Expect<Equal<StringToNumber<1>, never>>,
];
