

export function makeUuid(sections = 4) {
  return (
    new Array(sections)
      .fill()
      .map(() => Math.random().toString(16).slice(2))
      .join('-')
  );
}
