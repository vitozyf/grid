export function valueIsEqual(val1, val2) {
  if (!isNaN(val1) && !isNaN(val2)) {
    return Number(val1) === Number(val2);
  }
  if (!val1 && !val2) {
    return true;
  }
  return val1 === val2;
}
