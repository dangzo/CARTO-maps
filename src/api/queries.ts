export const continuousQuery = (attribute: string, tableName: string) => `
  SELECT
    MIN(${attribute}) as min,
    MAX(${attribute}) as max
  FROM ${tableName}
  WHERE ${attribute} IS NOT NULL
`;

export const binsQuery = (attribute: string, tableName: string, numBins: number) => `
  SELECT
    APPROX_QUANTILES(${attribute}, ${numBins}) as bins
  FROM ${tableName}
  WHERE ${attribute} IS NOT NULL
`;
