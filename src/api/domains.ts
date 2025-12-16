import { executeSQL } from '@carto/react-api';

const {
  VITE_API_BASE_URL: apiBaseUrl,
  VITE_API_ACCESS_TOKEN: accessToken
} = import.meta.env;

const CONTINUOUS_QUERY = (attribute: string, tableName: string) => `
  SELECT
    MIN(${attribute}) as min_value,
    MAX(${attribute}) as max_value
  FROM ${tableName}
  WHERE ${attribute} IS NOT NULL
`;

const BINS_QUERY = (attribute: string, tableName: string, numBins: number) => `
  WITH quantiles AS (
    SELECT
      APPROX_QUANTILES(${attribute}, ${numBins}) as breaks
    FROM ${tableName}
    WHERE ${attribute} IS NOT NULL
  )
  SELECT breaks
  FROM quantiles
`;

export const fetchDomain = async ({ query }: {
  query: string;
}) => {
  const credentials = {
    apiBaseUrl,
    accessToken,
  };
  const result = await executeSQL({
    credentials,
    query,
  });

  return result;
};

export { CONTINUOUS_QUERY, BINS_QUERY };
