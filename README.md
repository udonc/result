# @udon/result

## Overview

`@udon/result` is a simple Result type for TypeScript.

## Install

### Deno

```sh
deno add @udon/result
```

### npm

```sh
npx jsr add @udon/result
```

## Usage


```typescript
import { type Result, ok, err } from '@udon/result';

const divide = (a: number, b: number): Result<number> {
  if (b === 0) {
    return err(new Error('division by zero'));
  }
  return ok(a / b);
}

const result = divide(10, 2);

if (!result.success) {
  console.error(result.error.message);
} else {
  console.log(result.value);
}
```

## LICENSE

MIT
