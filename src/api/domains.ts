import { executeSQL } from '@carto/react-api';
import { API_VERSIONS } from '@carto/react-api';
import type { CredentialsCarto3 } from '@carto/react-api/src/types';

const {
  VITE_API_BASE_URL: apiBaseUrl,
  VITE_API_ACCESS_TOKEN: accessToken
} = import.meta.env;

export type DomainModeType = 'continuous' | 'bins' | 'categories';

export type ContinuousDomainType = {
  min: number;
  max: number;
}
export type BinsDomainsType = {
  bins: number[];
}
export type CategoriesDomainType = {
  categories: string[];
}

export type FetchDomainResponse = (ContinuousDomainType | BinsDomainsType | CategoriesDomainType);

export const fetchDomain = async ({ query }: { query: string }): Promise<FetchDomainResponse> => {
  const credentials: CredentialsCarto3 = {
    apiVersion: API_VERSIONS.V3,
    apiBaseUrl,
    accessToken,
  };

  let rows: FetchDomainResponse;

  try {
    rows = await executeSQL({
      connection: 'carto_dw',
      credentials,
      query,
    });
  } catch (error) {
    // Expected to be logged in console
    console.error('Error fetching domain data:', error); // eslint-disable-line no-console
    throw error;
  }

  return rows;
};
