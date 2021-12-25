// Source: https://stackoverflow.com/a/14627826
export function round(number, increment, offset) {
  return Math.ceil((number - offset) / increment) * increment + offset;
}
export function cordToDeg(A, B) {
  let rad = Math.atan2(A.y - B.y, A.x - B.x);
  rad = rad < 0 ? rad + 2 * Math.PI : rad;
  return rad * (180 / Math.PI);
}
