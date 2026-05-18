/**
 * Format numbers using European standard:
 * - Space as thousands separator
 * - Comma as decimal separator
 * - € symbol after the number
 */
export const formatEuropeanNumber = (value: number | string, includeEuro = true): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(num)) return '0';
  
  // Format with 2 decimal places
  const parts = num.toFixed(2).split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1];
  
  // Add space as thousands separator
  const withThousandsSeparator = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  
  // Combine with comma as decimal separator
  const formatted = `${withThousandsSeparator},${decimalPart}`;
  
  return includeEuro ? `${formatted} €` : formatted;
};

/**
 * Format percentage using European standard
 * - Comma as decimal separator
 */
export const formatEuropeanPercent = (value: number | string, decimals = 1): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(num)) return '0%';
  
  return num.toFixed(decimals).replace('.', ',') + '%';
};
