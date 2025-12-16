import { useEffect, useState } from 'react';
import { fetchDomain } from '@/api/domains';
import { continuousQuery, categoriesQuery } from '@/api/queries';
import type { DomainModeType } from '@/api/domains';

interface UseCartoDomainParams {
  attr: string;
  mode: DomainModeType;
  limit?: number;
  tableName: string;
}

export type DomainsType = Array<number | string>;

export default function useQueryDomain({
  attr,
  mode,
  limit = 20, // for categories
  tableName,
}: UseCartoDomainParams): DomainsType {
  const [domain, setDomain] = useState<DomainsType>([]);

  useEffect(() => {
    const fetchDomainData = async () => {
      if (!attr || attr === 'solid_color') {
        return;
      }

      let query = '';

      try {
        if (mode === 'continuous') {
          query = continuousQuery(attr, tableName);
        } else {
          query = categoriesQuery(attr, tableName, limit);
        }

        const rows = await fetchDomain({ query });

        if (Array.isArray(rows) && rows.length > 0) {
          if (mode === 'continuous') {
            setDomain([rows[0].min, rows[0].max]);
          } else {
            setDomain(rows[0].categories);
          }
        }
      } catch (error) {
        // TODO: Handle error appropriately
        console.error(error); // eslint-disable-line no-console
      }
    };

    fetchDomainData();
  }, [attr, mode, limit, tableName]);

  return domain;
}
