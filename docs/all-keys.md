# AllKeys

Get all keys of a type.

## Usage

```ts
import type { AllKeys } from "type-gym";

interface Foo {
  a: string
  b: {
    c: number
    d: boolean
    e: {
      f: string
    }
  }
}

// type Bar = ["a"] | ["b", "c"] | ["b", "d"] | ["b", "e", "f"]
type Bar = AllKeys<Foo>;
```
