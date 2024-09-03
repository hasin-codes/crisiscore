export function formatNumber(value: number, decimals: number): string {
  return value.toFixed(decimals)
}

export function convertToKnots(speed: number): number {
  return speed * 1.94384 // Convert m/s to knots
}

export function convertPrecipitationToPercentage(precipitation: number): number {
  // This is a simple conversion assuming 0-10mm is 0-100%
  // You may need to adjust this based on your specific requirements
  const percentage = (precipitation / 10) * 100;
  return Math.min(Math.round(percentage), 100); // Cap at 100% and round to nearest integer
}