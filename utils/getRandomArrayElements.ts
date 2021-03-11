export function getNRandomArrayElements<T>(arr: T[], n: number) {
  const out: T[] = [];
  const arrCopy = [...arr];
  while (out.length < n && arrCopy.length > 0) {
    const randomInd = Math.floor(Math.random() * arrCopy.length);
    const randomEl = arrCopy.splice(randomInd, 1)[0];
    out.push(randomEl);
  }
  return out;
}
