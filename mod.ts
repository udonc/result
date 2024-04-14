/**
 * Returns the {@link Ok} or {@link Err}.
 */
export type Result<T> = Ok<T> | Err;

/**
 * Represents a successful result.
 * @template T The type of the value.
 */
export type Ok<T> = Readonly<{
  ok: true;
  value: T;
}>;

/**
 * Represents a failed result.
 */
export type Err = Readonly<{
  ok: false;
  error: Error;
}>;

/**
 * Creates an {@link Ok} result.
 * @param value The value to wrap.
 */
export const ok = <T>(value: T): Ok<T> => {
  return {
    ok: true,
    value,
  };
};

/**
 * Creates an {@link Err} result.
 * @param error The error to wrap.
 */
export const err = (error: Error): Err => {
  return {
    ok: false,
    error,
  };
};

/**
 * Return the {@link Result} from throwable function.
 * @remarks This is an async version. Use {@link safeTrySync} for synchronous functions.
 * @param fn The function to execute.
 * @returns The result of the function.
 */
export const safeTry = async <T>(fn: () => Promise<T>): Promise<Result<T>> => {
  try {
    const value = await fn();
    return ok(value);
  } catch (error) {
    return error instanceof Error
      ? err(error)
      : err(new Error("Unknown error", { cause: error }));
  }
};

/**
 * Return the {@link Result} from throwable function.
 * @remarks This is a synchronous version. Use {@link safeTry} for async functions.
 * @param fn The function to execute.
 * @returns The result of the function.
 */
export const safeTrySync = <T>(fn: () => T): Result<T> => {
  try {
    const value = fn();
    return ok(value);
  } catch (error) {
    return error instanceof Error
      ? err(error)
      : err(new Error("Unknown error", { cause: error }));
  }
};

/**
 * Unwraps the value from the {@link Result}.
 * @param result The result to unwrap.
 * @throws The error if the result is an {@link Err}.
 */
export const unwrap = <T>(result: Result<T>): T => {
  if (result.ok) {
    return result.value;
  }
  throw result.error;
};
