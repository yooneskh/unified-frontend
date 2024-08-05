

export function makeUuid(size = 2) {
  return new Array(size)
    .fill()
    .map(() => Math.random().toString(16).slice(2))
    .join('-')
}
