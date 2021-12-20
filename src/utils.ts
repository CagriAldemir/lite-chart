export function normalizeArrayByMinMax(
  data: number[],
  minValue = 0,
  maxValue = 100
) {
  const minOfData = Math.min(...data);
  const maxOfData = Math.max(...data);

  const ratio = (maxValue - minValue) / (maxOfData - minOfData);

  return data.map((value) => (value - minOfData) * ratio + minValue);
}
