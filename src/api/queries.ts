export const continuousQuery = (attribute: string, tableName: string) => `
  SELECT
    MIN(\`${attribute}\`) as min,
    MAX(\`${attribute}\`) as max
  FROM \`${tableName}\`
  WHERE \`${attribute}\` IS NOT NULL
`;

export const categoriesQuery = (attribute: string, tableName: string, limit: number = 10) => `
  SELECT
    ARRAY_AGG(\`${attribute}\` ORDER BY cnt DESC LIMIT ${limit}) AS categories
  FROM (
    SELECT
      \`${attribute}\`,
      COUNT(*) AS cnt
    FROM \`${tableName}\`
    WHERE \`${attribute}\` IS NOT NULL
    GROUP BY \`${attribute}\`
  ) AS categories
`;
