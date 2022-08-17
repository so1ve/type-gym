import type { Equal, Expect } from "@type-challenges/utils";

import type { ConvertStringToNumber } from "./convert";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Cases = [
  Expect<Equal<ConvertStringToNumber<"1">, 1>>,
  Expect<Equal<ConvertStringToNumber<1>, never>>,
];
