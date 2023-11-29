// eslint-disable-next-line
export function exhaustiveCheck(_never: never): never {
  throw new Error("Exhaustive check failed");
}
