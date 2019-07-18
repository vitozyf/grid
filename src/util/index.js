export function valueIsEqual(val1, val2) {
  if (!val1 && !val2) {
    return true;
  }
  const value1 = typeof val1 === 'undefined' || val1 === null ? '' : val1;
  const value2 = typeof val2 === 'undefined' || val2 === null ? '' : val2;
  return value1.toString() === value2.toString();
}
