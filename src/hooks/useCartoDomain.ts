import { useEffect, useState } from 'react';
import { fetchDomain } from '@/api/domains';
import { continuousQuery, categoriesQuery, binsQuery } from '@/api/queries';
import { storesSource } from '@/data/sources';
import type { DomainModeType } from '@/api/domains';

interface UseCartoDomainParams {
  attr: string;
  mode: DomainModeType;
  bins?: number;
  limit?: number;
}

export type DomainsType = Array<number | string>;

export default function useCartoDomain({
  attr,
  mode,
  bins = 6,
  limit = 20,
}: UseCartoDomainParams): DomainsType {
  const [domain, setDomain] = useState<DomainsType>([]);

  useEffect(() => {
    const fetchDomainData = async () => {
      let query = '';

      try {
        if (mode === 'continuous') {
          query = continuousQuery(attr, storesSource.tableName);
        }
        if (mode === 'bins') {
          query = binsQuery(attr, storesSource.tableName, bins);
        }
        if (mode === 'categories') {
          query = categoriesQuery(attr, storesSource.tableName, limit);
        }

        const rows = await fetchDomain({ query });
        if (Array.isArray(rows) && rows.length > 0) {
          if (mode === 'continuous') {
            setDomain([rows[0].min, rows[0].max]);
          }
          if (mode === 'bins') {
            setDomain(rows[0].bins);
          }
          if (mode === 'categories') {
            setDomain(rows[0].domain);
          }
        }
      } catch (error) {
        // TODO: Handle error appropriately
        console.error(error); // eslint-disable-line no-console
      }
    };

    fetchDomainData();
  }, [attr, mode, bins, limit]);

  return domain;
}
