import { useEffect, useState } from 'react';
import { fetchDomain } from '@/api/domains';
import { continuousQuery, binsQuery } from '@/api/queries';
import { storesSource } from '@/data/sources';
import type { DomainModeType } from '@/api/domains';

export default function useCartoDomain({
  attr,
  mode,
  bins = 5,
}: {
  attr: string;
  mode: DomainModeType
  bins?: number;
}) {
  const [domain, setDomain] = useState<Array<number>>([]);

  useEffect(() => {
    const fetchDomainData = async () => {
      if (!attr || attr === 'solid_color') {
        return;
      }

      const query =
        mode === 'continuous'
          ? continuousQuery(attr, storesSource.tableName)
          : binsQuery(attr, storesSource.tableName, bins);

      try {
        const rows = await fetchDomain({ query });
        if (Array.isArray(rows) && rows.length > 0) {
          if (mode === 'continuous') {
            setDomain([rows[0].min, rows[0].max]);
          } else {
            setDomain(rows[0].bins);
          }
        }
      } catch (error) {
        // TODO: Handle error appropriately
        console.error(error); // eslint-disable-line no-console
      }
    };

    fetchDomainData();
  }, [attr, mode, bins]);

  return domain;
}
